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

export const getPatternOptions = () => PATTERNS;

export const applyPatternAt = ({ patternId, origin, rows, cols }) => {
  const pattern = PATTERN_MAP[patternId];
  if (!pattern) {
    return [];
  }

  return pattern.cells
    .map((cell) => ({
      r: clamp(origin.r + cell.r, 0, rows - 1),
      c: clamp(origin.c + cell.c, 0, cols - 1)
    }));
};
