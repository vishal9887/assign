# Filter Dashboard (React + TypeScript)

This project implements the "Front End Filter Optimization" demo:
- Multi-select searchable filters (custom simple implementation)
- Inter-dependent filters: each filter's available options are computed from the dataset filtered by *other* filters (exact requirement)
- Paginated data table and a scroll container that shows ~20 rows at a time
- Strict TypeScript, unit test for filtering util, and Vite-based dev server

## How to run

1. Install dependencies:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
```

3. Build:
```bash
npm run build
```

4. Tests:
```bash
npm run test
```

## Notes

- The sample dataset is `src/data/dataset_small.csv`. For final performance testing, replace it with the provided `dataset_large.csv` in the same folder.
- This repo is scaffolded to be easy to extend: the filtering logic lives in `src/utils/filtering.ts` (and is covered by a unit test).
