// utils/loadCsv.ts
export type Row = {
  id: number;
  value: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
};

// Allow passing a path argument
export async function loadCSV(path: string): Promise<Row[]> {
  const res = await fetch(path);
  const text = await res.text();

  const rows: Row[] = text
    .trim()
    .split("\n")
    .slice(1) // skip header
    .map((line, idx) => {
      const [value] = line.split(",").map(Number);
      return {
        id: idx + 1,
        value,
        mod3: value % 3,
        mod4: value % 4,
        mod5: value % 5,
        mod6: value % 6,
      };
    });

  return rows;
}
