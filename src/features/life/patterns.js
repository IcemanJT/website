const PATTERNS = [
  {
    id: "glider",
    name: "Glider",
    cells: [
      { r: 0, c: 1 },
      { r: 1, c: 2 },
      { r: 2, c: 0 },
      { r: 2, c: 1 },
      { r: 2, c: 2 }
    ]
  },
  {
    id: "blinker",
    name: "Blinker",
    cells: [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 0, c: 2 }
    ]
  },
  {
    id: "block",
    name: "Block",
    cells: [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 1, c: 1 }
    ]
  },
  {
    id: "beehive",
    name: "Beehive",
    cells: [
      { r: 0, c: 1 },
      { r: 0, c: 2 },
      { r: 1, c: 0 },
      { r: 1, c: 3 },
      { r: 2, c: 1 },
      { r: 2, c: 2 }
    ]
  },
  {
    id: "loaf",
    name: "Loaf",
    cells: [
      { r: 0, c: 1 },
      { r: 0, c: 2 },
      { r: 1, c: 0 },
      { r: 1, c: 3 },
      { r: 2, c: 1 },
      { r: 2, c: 3 },
      { r: 3, c: 2 }
    ]
  },
  {
    id: "boat",
    name: "Boat",
    cells: [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 1, c: 2 },
      { r: 2, c: 1 }
    ]
  },
  {
    id: "tub",
    name: "Tub",
    cells: [
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 1, c: 2 },
      { r: 2, c: 1 }
    ]
  },
  {
    id: "toad",
    name: "Toad",
    cells: [
      { r: 0, c: 1 },
      { r: 0, c: 2 },
      { r: 0, c: 3 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 1, c: 2 }
    ]
  },
  {
    id: "lwss",
    name: "Lightweight Spaceship",
    cells: [
      { r: 0, c: 1 },
      { r: 0, c: 4 },
      { r: 1, c: 0 },
      { r: 2, c: 0 },
      { r: 2, c: 4 },
      { r: 3, c: 0 },
      { r: 3, c: 1 },
      { r: 3, c: 2 },
      { r: 3, c: 3 }
    ]
  },
  {
    id: "rpentomino",
    name: "R-pentomino",
    cells: [
      { r: 0, c: 1 },
      { r: 0, c: 2 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 2, c: 1 }
    ]
  },
  {
    id: "pentadecathlon",
    name: "Pentadecathlon",
    cells: [
      { r: 0, c: 2 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 1, c: 2 },
      { r: 1, c: 3 },
      { r: 1, c: 4 },
      { r: 2, c: 2 },
      { r: 3, c: 2 },
      { r: 4, c: 0 },
      { r: 4, c: 1 },
      { r: 4, c: 2 },
      { r: 4, c: 3 },
      { r: 4, c: 4 },
      { r: 5, c: 2 }
    ]
  },
  {
    id: "pulsar",
    name: "Pulsar",
    cells: [
      { r: 0, c: 2 },
      { r: 0, c: 3 },
      { r: 0, c: 4 },
      { r: 0, c: 8 },
      { r: 0, c: 9 },
      { r: 0, c: 10 },
      { r: 2, c: 0 },
      { r: 2, c: 5 },
      { r: 2, c: 7 },
      { r: 2, c: 12 },
      { r: 3, c: 0 },
      { r: 3, c: 5 },
      { r: 3, c: 7 },
      { r: 3, c: 12 },
      { r: 4, c: 0 },
      { r: 4, c: 5 },
      { r: 4, c: 7 },
      { r: 4, c: 12 },
      { r: 5, c: 2 },
      { r: 5, c: 3 },
      { r: 5, c: 4 },
      { r: 5, c: 8 },
      { r: 5, c: 9 },
      { r: 5, c: 10 },
      { r: 7, c: 2 },
      { r: 7, c: 3 },
      { r: 7, c: 4 },
      { r: 7, c: 8 },
      { r: 7, c: 9 },
      { r: 7, c: 10 },
      { r: 8, c: 0 },
      { r: 8, c: 5 },
      { r: 8, c: 7 },
      { r: 8, c: 12 },
      { r: 9, c: 0 },
      { r: 9, c: 5 },
      { r: 9, c: 7 },
      { r: 9, c: 12 },
      { r: 10, c: 0 },
      { r: 10, c: 5 },
      { r: 10, c: 7 },
      { r: 10, c: 12 },
      { r: 12, c: 2 },
      { r: 12, c: 3 },
      { r: 12, c: 4 },
      { r: 12, c: 8 },
      { r: 12, c: 9 },
      { r: 12, c: 10 }
    ]
  },
  {
    id: "gosper-gun",
    name: "Gosper Glider Gun",
    cells: [
      { r: 0, c: 24 },
      { r: 1, c: 22 },
      { r: 1, c: 24 },
      { r: 2, c: 12 },
      { r: 2, c: 13 },
      { r: 2, c: 20 },
      { r: 2, c: 21 },
      { r: 2, c: 34 },
      { r: 2, c: 35 },
      { r: 3, c: 11 },
      { r: 3, c: 15 },
      { r: 3, c: 20 },
      { r: 3, c: 21 },
      { r: 3, c: 34 },
      { r: 3, c: 35 },
      { r: 4, c: 0 },
      { r: 4, c: 1 },
      { r: 4, c: 10 },
      { r: 4, c: 16 },
      { r: 4, c: 20 },
      { r: 4, c: 21 },
      { r: 5, c: 0 },
      { r: 5, c: 1 },
      { r: 5, c: 10 },
      { r: 5, c: 14 },
      { r: 5, c: 16 },
      { r: 5, c: 17 },
      { r: 5, c: 22 },
      { r: 5, c: 24 },
      { r: 6, c: 10 },
      { r: 6, c: 16 },
      { r: 6, c: 24 },
      { r: 7, c: 11 },
      { r: 7, c: 15 },
      { r: 8, c: 12 },
      { r: 8, c: 13 }
    ]
  }
];

const PATTERN_MAP = PATTERNS.reduce((acc, pattern) => {
  acc[pattern.id] = pattern;
  return acc;
}, {});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getBounds = (cells) => {
  let minRow = Infinity;
  let maxRow = -Infinity;
  let minCol = Infinity;
  let maxCol = -Infinity;

  cells.forEach(({ r, c }) => {
    minRow = Math.min(minRow, r);
    maxRow = Math.max(maxRow, r);
    minCol = Math.min(minCol, c);
    maxCol = Math.max(maxCol, c);
  });

  return { minRow, maxRow, minCol, maxCol };
};

const normalizeCells = (cells) => {
  const { minRow, minCol } = getBounds(cells);
  return cells.map((cell) => ({
    r: cell.r - minRow,
    c: cell.c - minCol
  }));
};

const rotateCells = (cells, rotation) => {
  const normalized = normalizeCells(cells);
  if (rotation === 0) {
    return normalized;
  }

  const { minRow, maxRow, minCol, maxCol } = getBounds(normalized);
  const centerR = (minRow + maxRow) / 2;
  const centerC = (minCol + maxCol) / 2;

  const rotated = normalized.map(({ r, c }) => {
    const relR = r - centerR;
    const relC = c - centerC;
    let nextR = relR;
    let nextC = relC;

    if (rotation === 90) {
      nextR = -relC;
      nextC = relR;
    } else if (rotation === 180) {
      nextR = -relR;
      nextC = -relC;
    } else if (rotation === 270) {
      nextR = relC;
      nextC = -relR;
    }

    return {
      r: Math.round(nextR + centerR),
      c: Math.round(nextC + centerC)
    };
  });

  return normalizeCells(rotated);
};

export const getPatternOptions = () => PATTERNS;

export const applyPatternAt = ({ patternId, origin, rows, cols, rotation = 0 }) => {
  const pattern = PATTERN_MAP[patternId];
  if (!pattern) {
    return [];
  }

  const cells = rotateCells(pattern.cells, rotation);

  return cells
    .map((cell) => ({
      r: clamp(origin.r + cell.r, 0, rows - 1),
      c: clamp(origin.c + cell.c, 0, cols - 1)
    }));
};
