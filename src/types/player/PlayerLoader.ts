import NBA from 'nba'

import { IPlayerFromApi, PlayersArgs } from './PlayerType'

export const filtersMapping = (key: string, value: string, player: IPlayerFromApi) => {
  if (key === 'search' && value) {
    const searchRegex = new RegExp(value)
    return searchRegex.test(`${player.firstName} ${player.lastName}`)
  }

  if (key === 'team') {
    return player.teamId.toString() === value
  }

  return true
}

export const loadAll = async (args: PlayersArgs) => {
  const players = await NBA.stats.playersInfo()

  return Object.keys(args).reduce((acc: any, key: string) => {
    return acc.filter((player: IPlayerFromApi) => filtersMapping(key, args[key], player))
  }, players)
}

export const loadById = async (id: string) => {
  const player = await NBA.stats.playerInfo({ PlayerID: id })

  if (!player) return null

  return player.commonPlayerInfo[0]
}