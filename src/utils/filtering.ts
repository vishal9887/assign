import type { Row } from './loadCsv'

export type Filters = { [col:string]: number[] }

/**
 * applyFilters: return rows that match all selected filters (if a filter has empty selection -> ignore)
 */
export function applyFilters(rows: Row[], filters: Filters): Row[] {
  if (!rows || rows.length === 0) return []
  return rows.filter(r => {
    for (const k of Object.keys(filters)) {
      const sel = filters[k]
      if (sel && sel.length > 0) {
        // @ts-ignore
        if (!sel.includes((r as any)[k])) return false
      }
    }
    return true
  })
}

/**
 * computeAvailableOptions:
 * For each column X in cols:
 *  - Consider all filters other than X, apply them to rows
 *  - Find unique values of column X in the filtered rows
 */
export function computeAvailableOptions(rows: Row[], filters: Filters, cols: string[]): {[k:string]: number[]} {
  const out: {[k:string]: number[]} = {}
  for (const col of cols) {
    // build filters excluding this column
    const otherFilters: Filters = {}
    for (const k of Object.keys(filters)) {
      if (k === col) continue
      otherFilters[k] = filters[k]
    }
    const filtered = applyFilters(rows, otherFilters)
    const set = new Set<number>()
    for (const r of filtered) {
      // @ts-ignore
      set.add((r as any)[col])
    }
    out[col] = Array.from(set).sort((a,b)=>a-b)
  }
  return out
}
