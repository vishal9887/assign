import { computeAvailableOptions, applyFilters } from '../utils/filtering'
import type { Row } from '../utils/loadCsv'

const rows: Row[] = [
  { id: 1, value: 1, mod3: 1, mod4: 1, mod5: 1, mod6: 1 },
  { id: 2, value: 2, mod3: 2, mod4: 2, mod5: 2, mod6: 2 },
  { id: 3, value: 3, mod3: 0, mod4: 3, mod5: 3, mod6: 3 },
  { id: 4, value: 4, mod3: 1, mod4: 0, mod5: 4, mod6: 4 },
]

test('applyFilters basic', () => {
  const filtered = applyFilters(rows, { mod3: [1] })
  expect(filtered.length).toBe(2)
})

test('computeAvailableOptions excludes own filter', () => {
  const options = computeAvailableOptions(rows, { mod3: [1] }, ['mod3', 'mod4'])
  // For mod4, we applied mod3 filter and expect values present among rows with mod3==1 -> rows 1 and 4 => mod4 values 1 and 0
  expect(options['mod4'].sort()).toEqual([0, 1])
  // For mod3, computeAvailableOptions should consider other filters (none) so should list unique mod3 values
  expect(options['mod3'].sort()).toEqual([0, 1, 2])
})
