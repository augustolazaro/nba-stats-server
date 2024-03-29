// @ts-ignore
import NBA from 'nba'

import { IPlayerFromApi, PlayersArgs } from './PlayerType'

export const filtersMapping = (key: string, value: any, player: IPlayerFromApi) => {
  if (key === 'search' && value) {
    const firstName = player.firstName ? player.firstName.toLocaleLowerCase() : ''
    const lastName = player.lastName ? player.lastName.toLocaleLowerCase() : ''
    const searchRegex = new RegExp(value.toLowerCase())
    return searchRegex.test(`${firstName} ${lastName}`)
  }

  if (key === 'team') {
    return player.teamId.toString() === value
  }

  if (key === 'ids') {
    const id = player.playerId ? player.playerId.toString() : ''
    return value.includes(id)
  }

  return true
}

export const loadAll = async (args: PlayersArgs) => {
  const players = await NBA.stats.playersInfo()

  return Object.keys(args).reduce((acc: any, key: string) => {
    // @ts-ignore
    return acc.filter((player: IPlayerFromApi) => filtersMapping(key, args[key], player))
  }, players)
}

export const loadById = async (id: string) => {
  const player = await NBA.stats.playerInfo({ PlayerID: id })

  if (!player) return null

  return {
    ...player.commonPlayerInfo[0],
    stats: player.playerHeadlineStats[0],
  }
}