import NBA from 'nba'

import { ITeamFromApi } from './TeamType'

export const loadById = async (id: number) => {
  return await NBA.teams.find((team: ITeamFromApi) => team.teamId.toString() === id.toString())
}

export const loadAll = async () => {
  return await NBA.teams
}