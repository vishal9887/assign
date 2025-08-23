import React from 'react'
import type { Row } from '../utils/loadCsv'

type Props = {
  data: Row[]
  page: number
  pageSize: number
  onPageChange: (n:number) => void
}

export default function DataTable({ data, page, pageSize, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const start = (page-1) * pageSize
  const pageData = data.slice(start, start + pageSize)

  return (
    <div>
      <div className="table-scroller">
        <table className="data-table" role="table" aria-label="data-table">
          <thead>
            <tr>
              <th>id</th>
              <th>value</th>
              <th>mod3</th>
              <th>mod4</th>
              <th>mod5</th>
              <th>mod6</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.value}</td>
                <td>{r.mod3}</td>
                <td>{r.mod4}</td>
                <td>{r.mod5}</td>
                <td>{r.mod6}</td>
              </tr>
            ))}
            {pageData.length===0 && (
              <tr><td colSpan={6} className="small-muted">No rows</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination" role="navigation" aria-label="pagination">
        <button className="btn" disabled={page<=1} onClick={()=>onPageChange(page-1)}>Prev</button>
        <div className="small-muted">Page {page} / {totalPages}</div>
        <button className="btn" disabled={page>=totalPages} onClick={()=>onPageChange(page+1)}>Next</button>
      </div>
    </div>
  )
}
