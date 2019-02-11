import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql'
import NBA from 'nba'

import TeamType, { ITeamArgs, ITeamFromApi } from './types/TeamType'
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
      resolve: async (_, { id }) => {
        const player = await NBA.stats.playerInfo({ PlayerID: id })
        if (!player) return {}
        return player.commonPlayerInfo[0]
      },
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
