import { sum } from './sum'

it('suming 5 and 2 will return 7', () => {
  const a = 5
  const b = 2
  expect(sum(a, b)).toBe(7)
})
