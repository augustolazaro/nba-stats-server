import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

import TeamType from '../team/TeamType';
import * as TeamLoader from '../team/TeamLoader'

type IScore = {
  gameDateEst: string,
  gameSequence: number,
  gameId: string,
  teamId: number,
  teamAbbreviation: string,
  teamCityName: string,
  teamWinsLosses: string,
  ptsQtr1: number,
  ptsQtr2: number,
  ptsQtr3: number,
  ptsQtr4: number,
  ptsOt1:number,
  ptsOt2:number,
  ptsOt3:number,
  ptsOt4:number,
  ptsOt5:number,
  ptsOt6:number,
  ptsOt7:number,
  ptsOt8:number,
  ptsOt9:number,
  ptsOt10:number,
  pts: number,
  fgPct: number,
  ftPct: number,
  fg3Pct: number,
  ast: number,
  reb: number,
  tov: number,
}

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
  lineScore: Array<IScore>,
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
    homeTeamScore: {
      type: GraphQLInt,
      resolve: ({ lineScore }: IGameFromApi) => lineScore[1].pts,
    },
    visitorTeamScore: {
      type: GraphQLInt,
      resolve: ({ lineScore }: IGameFromApi) => lineScore[0].pts,
    },
    status: {
      type: GraphQLString,
      resolve: ({ gameStatusText }: IGameFromApi): string => gameStatusText,
    },
  }),
})

export default GameType