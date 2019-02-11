import NBA from 'nba'
import { GraphQLObjectType, GraphQLString } from 'graphql'

import TeamType, { ITeamFromApi } from './TeamType'

export type IPlayerFromApi = {
  firstName: string,
  lastName: string,
  playerId: string,
  teamId: string,
}

export type PlayerArgs = {
  id: string,
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
    team: {
      type: TeamType,
      resolve: async ({ teamId }: IPlayerFromApi) => await NBA.teams.find((team: any) => team.teamId === teamId),
    },
  }),
})

export default PlayerType