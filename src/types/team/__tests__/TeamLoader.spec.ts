import * as TeamLoader from '../TeamLoader'

describe('team loader', () => {
  it('should retrieve teams from api', async () => {
    const teams = await TeamLoader.loadAll({})

    expect(teams).not.toBe(null)
  })

  it('should filter teams by id', async () => {
    const teams = await TeamLoader.loadAll({ ids: ['1610612744', '1610612756'] })

    expect(teams.length).toBe(2)
  })
})