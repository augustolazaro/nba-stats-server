import { GraphQLObjectType, GraphQLFloat } from 'graphql'

export type IStat = {
  playerId: number,
  playerName: string,
  timeFrame: string,
  pts: number,
  ast: number,
  reb: number,
  pie: number,
}

export type ITeamStat = {
  leagueId: string,
  seasonId: string,
  teamId: number,
  ptsRank: number,
  ptsPg: number,
  rebRank: number,
  rebPg: number,
  astRank: number,
  astPg: number,
  oppPtsRank: number,
  oppPtsPg: number,
}

const StatType: any = new GraphQLObjectType({
  name: 'Stat',
  fields: () => ({
    pts: {
      type: GraphQLFloat,
      resolve: ({ pts, ptsPg }: IStat & ITeamStat): number => pts || ptsPg,
    }, 
    ast: {
      type: GraphQLFloat,
      resolve: ({ ast, astPg }: IStat & ITeamStat): number => ast || astPg,
    }, 
    reb: {
      type: GraphQLFloat,
      resolve: ({ reb, rebPg }: IStat & ITeamStat): number => reb || rebPg,
    }, 
    pie: {
      type: GraphQLFloat,
    }, 
  }),
})

export default StatType