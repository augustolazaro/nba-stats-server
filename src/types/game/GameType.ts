import NBA from 'nba'
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import TeamType from '../team/TeamType';
import * as TeamLoader from '../team/TeamLoader'

type IGameFromApi = {
  gameDateEst: string,
  gameSequence: number,
  gameId: string,
  gameStatusId: number,
  gameStatusText: string,
  gamecode: string, // 20190213/BKNCLE'
  homeTeamId: number,
  visitorTeamId: number,
  season: string,
  livePeriod: number,
  livePcTime: string,
  natlTvBroadcasterAbbreviation: string | null,
  livePeriodTimeBcast: string,
  whStatus: number,
}

const GameType: any = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ gameId }: IGameFromApi): string => gameId,
    },
    date: {
      type: GraphQLString,
      resolve: ({ gameDateEst }: IGameFromApi): string => gameDateEst,
    },
    homeTeam: {
      type: TeamType,
      resolve: async ({ homeTeamId }: IGameFromApi) => await TeamLoader.loadById(homeTeamId),
    },
    visitorTeam: {
      type: TeamType,
      resolve: async ({ visitorTeamId }: IGameFromApi) => await TeamLoader.loadById(visitorTeamId),
    },
    status: {
      type: GraphQLString,
      resolve: ({ gameStatusText }: IGameFromApi): string => gameStatusText,
    },
  }),
})

export default GameType