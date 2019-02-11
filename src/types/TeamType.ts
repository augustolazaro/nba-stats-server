import NBA from 'nba'
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import PlayerType, { IPlayerFromApi } from './PlayerType'

export type ITeamFromApi = {
  teamId: string,
  simpleName: string,
  teamName: string,
  abbreviation: string,
  location: string,
}

const TeamType: any = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ teamId }: ITeamFromApi): string => teamId,
    },
    name: {
      type: GraphQLString,
      resolve: ({ teamName }: ITeamFromApi): string => teamName,
    },
    simpleName: {
      type: GraphQLString,
      resolve: ({ simpleName }: ITeamFromApi): string => simpleName,
    },
    abbreviation: {
      type: GraphQLString,
      resolve: ({ abbreviation }: ITeamFromApi): string => abbreviation,
    },
    logo: {
      type: GraphQLString,
      resolve: ({ abbreviation }: ITeamFromApi): string => `http://stats.nba.com/media/img/teams/logos/${abbreviation}_logo.svg`,
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: async ({ teamId }: ITeamFromApi) => {
        const players: IPlayerFromApi[] = await NBA.stats.playersInfo()
        
        return players.filter(player => player.teamId === teamId)
      },
    },
  }),
})

export default TeamType