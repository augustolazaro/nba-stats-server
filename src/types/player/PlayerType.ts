import { GraphQLObjectType, GraphQLString } from 'graphql'

import TeamType from '../team/TeamType'
import * as TeamLoader from '../team/TeamLoader'
import StatType, { IStat } from '../stat/StatType';

export type IPlayerFromApi = {
  firstName: string,
  lastName: string,
  playerId?: string,
  teamId: string,
  personId?: string,
  displayFirstLast: string,
  displayLastCommaFirst: string,
  displayFiLast: string,
  birthdate: string,
  school: string | null,
  country: string,
  lastAffiliation: string,
  height: string | null,
  weight: string | null,
  seasonExp: number,
  jersey: string | null,
  position: string | null,
  rosterstatus: string,
  teamName: string,
  teamAbbreviation: string,
  teamCode: string,
  teamCity: string,
  playercode: string,
  fromYear: number,
  toYear: number,
  dleagueFlag: string,
  nbaFlag: string,
  gamesPlayedFlag: string,
  draftYear: string,
  draftRound: string,
  draftNumber: string,
  stats: IStat,
}

export type PlayerArgs = {
  id: string,
}

export type PlayersArgs = {
  search?: string,
  team?: string | null,
}

const PlayerType: any = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ playerId, personId }: IPlayerFromApi): string | undefined => playerId || personId,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
      resolve: ({ personId, teamId, playerId }: IPlayerFromApi) => {
        if (!!personId) return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${teamId}/2018/260x190/${personId}.png`
        if (!!playerId) return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${teamId}/2018/260x190/${playerId}.png`
      },
    },
    birthdate: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLString,
    },
    position: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    jersey: {
      type: GraphQLString,
    },
    team: {
      type: TeamType,
      resolve: async ({ teamId }: IPlayerFromApi) => await TeamLoader.loadById(teamId),
    },
    stats: {
      type: StatType,
    },
  }),
})

export default PlayerType