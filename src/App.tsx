import { useEffect, useState } from "react";
import Papa from "papaparse";
import { computeAvailableOptions, applyFilters } from "./utils/filtering";
import type { Row } from "./utils/loadCsv";

function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [availableOptions, setAvailableOptions] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    async function loadData() {
      // ✅ Import CSV directly (placed in src/data/data.csv)
      const response = await fetch("/src/data/data.csv");
      const text = await response.text();

      Papa.parse<Row>(text, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const parsedRows = result.data.filter((row) => row.id !== undefined);
          setRows(parsedRows);
          setAvailableOptions(computeAvailableOptions(parsedRows, {}));
        },
      });
    }
    loadData();
  }, []);

  const handleFilterChange = (column: string, value: string) => {
    const newFilters = { ...filters, [column]: value };
    setFilters(newFilters);
    const filteredRows = applyFilters(rows, newFilters);
    setAvailableOptions(computeAvailableOptions(filteredRows, newFilters));
  };

  const filteredRows = applyFilters(rows, filters);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Filter Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {Object.keys(availableOptions).map((column) => (
          <div key={column}>
            <label className="block text-sm font-medium mb-1">{column}</label>
            <select
              className="border p-1"
              value={filters[column] || ""}
              onChange={(e) => handleFilterChange(column, e.target.value)}
            >
              <option value="">All</option>
              {availableOptions[column].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            {rows.length > 0 &&
              Object.keys(rows[0]).map((key) => (
                <th key={key} className="border border-gray-400 px-2 py-1">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i} className="border border-gray-400 px-2 py-1">
                  {String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
