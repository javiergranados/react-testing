import { randomBetween } from '.'

const mathRandomSpy = jest.spyOn(Math, 'random')

describe('randomBetween', () => {
  describe('when Math.random() returns 0', () => {
    it('called with min=3 and max=5 returns 3', () => {
      mathRandomSpy.mockClear().mockReturnValue(0)

      expect(randomBetween(3, 5)).toBe(3)
      expect(Math.random).toHaveBeenCalledTimes(1)
    })
  })

  describe('when Math.random() returns 0.5', () => {
    it('called with min=3 and max=5 returns 4', () => {
      mathRandomSpy.mockClear().mockReturnValue(0.5)

      expect(randomBetween(3, 5)).toBe(4)
      expect(Math.random).toHaveBeenCalledTimes(1)
    })
  })

  describe('when Math.random() returns 0.999999', () => {
    it('called with min=3 and max=5 returns 5', () => {
      mathRandomSpy.mockClear().mockReturnValue(0.999999)

      expect(randomBetween(3, 5)).toBe(5)
      expect(Math.random).toHaveBeenCalledTimes(1)
    })
  })
})
