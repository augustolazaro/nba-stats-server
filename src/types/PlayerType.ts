import NBA from 'nba'
import { GraphQLObjectType, GraphQLString } from 'graphql'

import TeamType, { ITeamFromApi } from './TeamType'

export type IPlayerFromApi = {
  firstName: string,
  lastName: string,
  playerId: string,
  teamId: string,
}

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    team: {
      type: TeamType,
      resolve: async ({ teamId }: IPlayerFromApi) => await NBA.teams.find(team => team.teamId === teamId),
    },
  }),
})

export default PlayerType