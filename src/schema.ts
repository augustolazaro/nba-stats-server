import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'
import NBA from 'nba'

import TeamType, { ITeamFromApi } from './types/TeamType'

import PlayerType from './types/PlayerType'
import * as PlayerLoader from './types/PlayerLoader'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    players: {
      type: new GraphQLList(PlayerType),
      args: {
        search: {
          type: GraphQLString,
        },
        team: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args) => await PlayerLoader.loadAll(args),
    },
    player: {
      type: PlayerType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { id }) => await PlayerLoader.loadById(id),
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve: async () => await NBA.teams,
    },
    team: {
      type: TeamType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { id }) => {
        const teams = await NBA.teams
        
        return teams.find((t: ITeamFromApi) => t.teamId.toString() === id)
      },
    },
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
})
