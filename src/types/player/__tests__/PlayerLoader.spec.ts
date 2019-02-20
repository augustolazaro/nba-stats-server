import * as PlayerLoader from '../PlayerLoader'

// @ts-ignore
import playersMock from '../../../../data/players.json'

describe('player loader', () => {
  // beforeEach(() => {
  //   jest.setTimeout(100000);
  // });

  // it('should retrieve all players from api', async () => {
  //   const args = {}
  //   const players = await PlayerLoader.loadAll(args)
  
  //   expect(players.length).not.toBe(0)
  // });

  // it('should load user by id', async () => {
  //   const player = await PlayerLoader.loadById('203507')

  //   expect(player).not.toBe(null)
  // })

  it('should filter users by search', () => {
    const players = playersMock.filter((player: any) => PlayerLoader.filtersMapping('search', 'curry', player))

    expect(players.length).toBe(1)
  })

  it('should filter users by ids', () => {
    const ids = ['201939', '203076']
    const players = playersMock.filter((player: any) => PlayerLoader.filtersMapping('ids', ids, player))

    expect(players.length).toBe(2)
  })

  it('should filter users by team', () => {
    const players = playersMock.filter((player: any) => PlayerLoader.filtersMapping('team', '1610612744', player))

    expect(players.length).toBe(15)
  })
})
