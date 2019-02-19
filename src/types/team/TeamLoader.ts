// @ts-ignore
import NBA from 'nba'

import { ITeamFromApi } from './TeamType'

export const loadById = async (id: number | string) => {
  return await NBA.teams.find((team: ITeamFromApi) => team.teamId.toString() === id.toString())
}

export const loadInfosById = async (id: number | string) => {
  const team = await NBA.stats.teamInfoCommon({ TeamID: id })

  return {
    ...team.teamInfoCommon[0],
    stats: team.teamSeasonRanks[0],
  }
}

export const loadAll = async () => {
  return await NBA.teams
}