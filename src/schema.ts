// const graphql = require('graphql')
// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLSchema,
//   GraphQLList,
// } = graphql

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'
import NBA from 'nba'

const Player = new GraphQLObjectType({
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
      type: Team,
      resolve: async ({ teamId }) => await NBA.teams.find(team => team.teamId === teamId),
    },
  }),
})

const Team = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: ({ teamName }) => teamName,
    },
    simpleName: {
      type: GraphQLString,
      resolve: ({ simpleName }) => simpleName,
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    players: {
      type: new GraphQLList(Player),
      resolve: async () => await NBA.stats.playersInfo(),
    },
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
})
