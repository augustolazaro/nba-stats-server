// @ts-ignore
import NBA from 'nba'
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'

import PlayerType, { IPlayerFromApi } from '../player/PlayerType'

// @ts-ignore
import teams from '../../../data/teams.json'
import StatType, { ITeamStat } from '../stat/StatType';

export type ITeamFromApi = {
  teamId: string,
  simpleName: string,
  teamName: string,
  abbreviation: string,
  location: string,
}

export type ITeamInfoFromApi = {
  teamId: number,
  seasonYear: string,
  teamCity: string,
  teamName: string,
  teamAbbreviation: string,
  teamConference: string,
  teamDivision: string,
  teamCode: string,
  w: number,
  l: number,
  pct: number,
  confRank: number,
  divRank: number,
  minYear: string,
  maxYear: string,
  stats: ITeamStat,
}

export type ITeamArgs = {
  id: string,
}

const TeamType: any = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ teamId }: ITeamFromApi & ITeamInfoFromApi): string => teamId,
    },
    name: {
      type: GraphQLString,
      resolve: ({ teamName }: ITeamFromApi & ITeamInfoFromApi): string => teamName,
    },
    simpleName: {
      type: GraphQLString,
      resolve: ({ simpleName, teamName }: ITeamFromApi & ITeamInfoFromApi): string => simpleName || teamName,
    },
    abbreviation: {
      type: GraphQLString,
      resolve: ({ abbreviation, teamAbbreviation }: ITeamFromApi & ITeamInfoFromApi): string => abbreviation || teamAbbreviation,
    },
    logo: {
      type: GraphQLString,
      resolve: ({ abbreviation, teamAbbreviation }: ITeamFromApi & ITeamInfoFromApi): string | undefined => {
        if (abbreviation) return `http://stats.nba.com/media/img/teams/logos/${abbreviation}_logo.svg`
        if (teamAbbreviation) return `http://stats.nba.com/media/img/teams/logos/${teamAbbreviation}_logo.svg`
      },
    },
    city: {
      type: GraphQLString,
      resolve: ({ teamCity }: ITeamFromApi & ITeamInfoFromApi): string => teamCity,
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: async ({ teamId }: ITeamFromApi) => {
        const players: IPlayerFromApi[] = await NBA.stats.playersInfo()
        
        return players.filter(player => player.teamId === teamId)
      },
    },
    stats: {
      type: StatType,
    },
    colors: {
      type: new GraphQLList(GraphQLString),
      resolve: ({ teamId }: ITeamFromApi): string[] => {
        const currTeam = teams.find((t: any) => t.teamId === teamId)
        if (!currTeam) return []
        return currTeam.colors
      },
    },
    conference: {
      type: GraphQLString,
      resolve: ({ teamConference }: ITeamFromApi & ITeamInfoFromApi) => teamConference,
    },
    division: {
      type: GraphQLString,
      resolve: ({ teamDivision }: ITeamFromApi & ITeamInfoFromApi) => teamDivision,
    },
    confRank: {
      type: GraphQLInt,
    },
    divRank: {
      type: GraphQLInt,
    },
    wins: {
      type: GraphQLInt,
      resolve: ({ w }: ITeamInfoFromApi) => w,
    },
    losses: {
      type: GraphQLInt,
      resolve: ({ l }: ITeamInfoFromApi) => l,
    },
  }),
})

export default TeamType