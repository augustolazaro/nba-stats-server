import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'
import NBA from 'nba'

import TeamType from './types/TeamType'
import PlayerType, { PlayerArgs } from './types/PlayerType'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    players: {
      type: new GraphQLList(PlayerType),
      resolve: async () => await NBA.stats.playersInfo(),
    },
    player: {
      type: PlayerType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { id }: PlayerArgs) => {
        const player = await NBA.stats.playerInfo({ PlayerID: id })
        if (!player) return {}
        return player.commonPlayerInfo[0]
      },
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve: async () => await NBA.teams,
    },
  }),
})

export const schema = new GraphQLSchema({
  query: RootQuery,
})
