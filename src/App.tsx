import React, { useEffect, useMemo, useState } from "react";
import { loadCSV, Row } from "./utils/loadCsv";
import { computeAvailableOptions, applyFilters } from "./utils/filtering";
import MultiFilter from "./components/MultiFilter";
import DataTable from "./components/DataTable";

type FilterState = {
  [col: string]: number[];
};

function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [filters, setFilters] = useState<FilterState>({});

  useEffect(() => {
    // ✅ now loadCSV accepts a file path
    loadCSV("/data.csv").then(setRows);
  }, []);

  const filteredRows = useMemo(
    () => applyFilters(rows, filters),
    [rows, filters]
  );

  const availableOptions = useMemo(
    () => computeAvailableOptions(rows, filters),
    [rows, filters]
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Filter Dashboard</h1>
      <MultiFilter
        filters={filters}
        setFilters={setFilters}
        availableOptions={availableOptions}
      />
      <DataTable rows={filteredRows} />
    </div>
  );
}

export default App;
