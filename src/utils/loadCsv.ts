// src/utils/loadCsv.ts

export type Row = {
  id: number;
  value: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
};

export async function loadCSV(): Promise<Row[]> {
  // Import CSV as raw text using Vite/CRA
  const res = await fetch("/src/data/dataset_small.csv"); // ✅ Correct path
  const txt = await res.text();
  const lines = txt.trim().split("\n");
  const header = lines.shift()!.split(",");

  return lines.map(line => {
    const cols = line.split(",");
    return {
      id: Number(cols[0]),
      value: Number(cols[1]),
      mod3: Number(cols[2]),
      mod4: Number(cols[3]),
      mod5: Number(cols[4]),
      mod6: Number(cols[5]),
    };
  });
}
