export type Row = {
  id: number;
  value: number;
  mod3: number | null;
  mod4: number | null;
  mod5: number | null;
  mod6: number | null;
};

export async function loadCSV(path: string): Promise<Row[]> {
  const res = await fetch(path);
  const txt = await res.text();
  const lines = txt.trim().split("\n");
  lines.shift(); // remove header row

  return lines.map((line, i) => {
    const cols = line.split(",");
    const id = Number(cols[0]);
    const val = Number(cols[1]);

    // compute mods dynamically
    return {
      id: isNaN(id) ? i : id,
      value: isNaN(val) ? 0 : val,
      mod3: isNaN(val) ? null : val % 3,
      mod4: isNaN(val) ? null : val % 4,
      mod5: isNaN(val) ? null : val % 5,
      mod6: isNaN(val) ? null : val % 6,
    };
  });
}
