import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'
import NBA from 'nba'

import TeamType from './types/TeamType'
import PlayerType from './types/PlayerType'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    players: {
      type: new GraphQLList(PlayerType),
      resolve: async () => await NBA.stats.playersInfo(),
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve: async () => await NBA.teams,
    }
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
})
