import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'

import TeamType from './types/team/TeamType'
import * as TeamLoader from './types/team/TeamLoader'

import PlayerType from './types/player/PlayerType'
import * as PlayerLoader from './types/player/PlayerLoader'

import GameType from './types/game/GameType';
import * as GameLoader from './types/game/GameLoader'

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
        ids: {
          type: new GraphQLList(GraphQLString),
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
      args: {
        ids: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: async (_, args) => await TeamLoader.loadAll(args),
    },
    team: {
      type: TeamType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { id }) => await TeamLoader.loadInfosById(id),
    },
    games: {
      type: new GraphQLList(GameType),
      args: {
        date: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args) => await GameLoader.loadAll(args),
    },
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
})
