import NBA from 'nba'

export const loadAll = async () => {
  const day = new Date()
  day.setDate(day.getDate() - 2)
  const games = await NBA.stats.scoreboard({ gameDate: day.toISOString() })

  const data = games.gameHeader.map((game: object, index: number) => {
    const baseLineScoreIdx = index * 2
    return {
      ...game,
      lineScore: games.lineScore.slice(baseLineScoreIdx, baseLineScoreIdx+2),
    }
  })

  return data
}