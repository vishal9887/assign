import React, { useEffect, useMemo, useState } from 'react'
import { loadCSV, Row } from './utils/loadCsv'
import { computeAvailableOptions, applyFilters } from './utils/filtering'
import MultiFilter from './components/MultiFilter'
import DataTable from './components/DataTable'

type FilterState = {
  [col: string]: number[]; // selected values for each filter
}

const FILTER_COLS = ['mod3', 'mod4', 'mod5', 'mod6']

export default function App() {
  const [data, setData] = useState<Row[]>([])
  const [filters, setFilters] = useState<FilterState>({})
  const [availableOptions, setAvailableOptions] = useState<{[k:string]: number[]}>({})
  const [page, setPage] = useState(1)
  const pageSize = 100

  useEffect(() => {
    loadCSV('/src/data/dataset_small.csv').then(rows => {
      setData(rows)
      // initialize available options
      const initial = computeAvailableOptions(rows, {}, FILTER_COLS)
      setAvailableOptions(initial)
    })
  }, [])

  // when filters change, recompute available options and filtered data
  useEffect(() => {
    const avail = computeAvailableOptions(data, filters, FILTER_COLS)
    setAvailableOptions(avail)
    setPage(1)
  }, [filters, data])

  const filtered = useMemo(() => applyFilters(data, filters), [data, filters])

  return (
    <div className="app">
      <div className="header">
        <h2>Filter Dashboard — demo</h2>
        <div className="small-muted">Rows: {filtered.length} (total {data.length})</div>
      </div>

      <div className="filters" role="region" aria-label="filters">
        {FILTER_COLS.map(col => (
          <div className="filter" key={col}>
            <MultiFilter
              column={col}
              options={availableOptions[col] || []}
              selected={filters[col] || []}
              onChange={(vals) => setFilters(prev => ({...prev, [col]: vals}))}
            />
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <DataTable
          data={filtered}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
