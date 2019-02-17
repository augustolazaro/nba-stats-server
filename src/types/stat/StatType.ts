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

const StatType: any = new GraphQLObjectType({
  name: 'Stat',
  fields: () => ({
    pts: {
      type: GraphQLFloat,
    }, 
    ast: {
      type: GraphQLFloat,
    }, 
    reb: {
      type: GraphQLFloat,
    }, 
    pie: {
      type: GraphQLFloat,
    }, 
  }),
})

export default StatType