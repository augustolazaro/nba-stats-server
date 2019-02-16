import NBA from 'nba'
import { GraphQLObjectType, GraphQLString } from 'graphql'

import TeamType, { ITeamFromApi } from '../team/TeamType'

export type IPlayerFromApi = {
  firstName: string,
  lastName: string,
  playerId: string,
  teamId: string,
  personId: string,
}

export type PlayerArgs = {
  id: string,
}

export type PlayersArgs = {
  search?: string,
  team?: string | null,
}

const PlayerType: any = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ playerId }: IPlayerFromApi): string => playerId,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
      resolve: ({ personId, teamId, playerId }: IPlayerFromApi) => {
        if (!!personId) return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${teamId}/2018/260x190/${personId}.png`
        if (!!playerId) return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${teamId}/2018/260x190/${playerId}.png`
      },
    },
    team: {
      type: TeamType,
      resolve: async ({ teamId }: IPlayerFromApi) => await NBA.teams.find((team: any) => team.teamId === teamId),
    },
  }),
})

export default PlayerType