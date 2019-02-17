import NBA from 'nba'

type Args = {
  [key: string]: string | number | undefined,
}

export const loadAll = async (args: Args) => {
  const { date } = args
  const day = date ? new Date(date) : new Date()
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