import NBA from 'nba'

export const loadAll = async () => {
  const day = new Date()
  const games = await NBA.stats.scoreboard({ gameDate: day.toISOString() })

  // console.log('--- games:', games)

  return games.gameHeader
}