import React, { useMemo, useState } from 'react'

type Props = {
  column: string
  options: number[]
  selected: number[]
  onChange: (vals: number[]) => void
}

export default function MultiFilter({ column, options, selected, onChange }: Props) {
  const [search, setSearch] = useState('')
  const visible = useMemo(() => {
    if (!search) return options
    return options.filter(v => String(v).includes(search))
  }, [options, search])

  const toggle = (v: number) => {
    if (selected.includes(v)) onChange(selected.filter(x=>x!==v))
    else onChange([...selected, v])
  }

  return (
    <div style={{minWidth:200}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>{column}</strong>
        <div className="small-muted" style={{fontSize:12}}>{options.length}</div>
      </div>
      <input
        aria-label={`search-${column}`}
        className="search-input"
        placeholder="search..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />
      <div className="checkbox-list" role="list">
        {visible.map(v => (
          <label key={v} style={{display:'flex', gap:8, alignItems:'center'}}>
            <input
              type="checkbox"
              checked={selected.includes(v)}
              onChange={()=>toggle(v)}
            />
            <span>{String(v)}</span>
          </label>
        ))}
        {visible.length===0 && <div className="small-muted">No options</div>}
      </div>
      <div style={{marginTop:8, display:'flex', gap:8}}>
        <button className="btn" onClick={()=>onChange([])}>Clear</button>
        <button className="btn" onClick={()=>onChange(options)}>Select All</button>
      </div>
    </div>
  )
}
