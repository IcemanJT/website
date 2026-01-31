import { useEffect, useMemo, useRef, useState } from "react";
import { applyPatternAt, getPatternOptions } from "./patterns";

const DEFAULT_ROWS = 37;
const DEFAULT_COLS = 94;
const MIN_SIZE = 10;
const MAX_SIZE = 200;
const CELL_SIZE = 10;
const DEFAULT_STEPS_PER_SECOND = 10;
const MIN_STEPS_PER_SECOND = 1;
const MAX_STEPS_PER_SECOND = 60;

const TOOL_OPTIONS = [
  { id: "draw", label: "Draw" },
  { id: "pattern", label: "Place pattern" }
];

const buildKey = (r, c) => `${r},${c}`;

const parseKey = (key) => key.split(",").map(Number);

const buildEmptySet = () => new Set();

const getNeighborKeys = (row, col, rows, cols) => {
  const keys = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) {
        continue;
      }
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
        continue;
      }
      keys.push(buildKey(nextRow, nextCol));
    }
  }
  return keys;
};

const computeNextAlive = (aliveSet, rows, cols) => {
  const neighborCounts = new Map();

  aliveSet.forEach((key) => {
    const [row, col] = parseKey(key);
    getNeighborKeys(row, col, rows, cols).forEach((neighborKey) => {
      neighborCounts.set(neighborKey, (neighborCounts.get(neighborKey) ?? 0) + 1);
    });
  });

  const nextAlive = new Set();
  neighborCounts.forEach((count, key) => {
    if (count === 3 || (count === 2 && aliveSet.has(key))) {
      nextAlive.add(key);
    }
  });

  return nextAlive;
};

const getRandomAlive = (rows, cols, density = 0.18) => {
  const set = new Set();
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (Math.random() < density) {
        set.add(buildKey(r, c));
      }
    }
  }
  return set;
};

const exportAlive = (aliveSet) =>
  Array.from(aliveSet).map((key) => {
    const [r, c] = parseKey(key);
    return { r, c };
  });

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function LifeSetup() {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [alive, setAlive] = useState(() => buildEmptySet());
  const [isRunning, setIsRunning] = useState(false);
  const [tool, setTool] = useState(TOOL_OPTIONS[0].id);
  const [patternId, setPatternId] = useState("glider");
  const [paintMode, setPaintMode] = useState("alive");
  const [patternRotation, setPatternRotation] = useState(0);
  const [stepsPerSecond, setStepsPerSecond] = useState(DEFAULT_STEPS_PER_SECOND);
  const [generation, setGeneration] = useState(0);
  const isDraggingRef = useRef(false);
  const dragPaintRef = useRef("alive");
  const aliveRef = useRef(alive);
  const stepsPerSecondRef = useRef(stepsPerSecond);
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(0);
  const accumulatorRef = useRef(0);

  const patternOptions = useMemo(() => getPatternOptions(), []);
  const aliveCoords = useMemo(() => exportAlive(alive), [alive]);

  const gridTemplateColumns = useMemo(
    () => `repeat(${cols}, ${CELL_SIZE}px)`,
    [cols]
  );

  useEffect(() => {
    aliveRef.current = alive;
  }, [alive]);

  useEffect(() => {
    stepsPerSecondRef.current = stepsPerSecond;
  }, [stepsPerSecond]);

  useEffect(() => {
    if (!isRunning) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = 0;
      accumulatorRef.current = 0;
      return;
    }

    const tick = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      accumulatorRef.current += delta;

      const interval = 1000 / stepsPerSecondRef.current;
      let steps = 0;

      while (accumulatorRef.current >= interval) {
        accumulatorRef.current -= interval;
        aliveRef.current = computeNextAlive(aliveRef.current, rows, cols);
        steps += 1;
      }

      if (steps > 0) {
        setAlive(aliveRef.current);
        setGeneration((prev) => prev + steps);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isRunning, rows, cols]);

  const applyAliveChange = (updates) => {
    setAlive((prev) => {
      const next = new Set(prev);
      updates.forEach((key) => {
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
      });
      return next;
    });
  };

  const paintCell = (row, col, mode) => {
    if (mode === "toggle") {
      toggleCell(row, col);
      return;
    }

    const key = buildKey(row, col);
    setAlive((prev) => {
      const next = new Set(prev);
      if (mode === "alive") {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

  const toggleCell = (row, col) => {
    applyAliveChange([buildKey(row, col)]);
  };

  const handleCellAction = (row, col) => {
    if (isRunning) {
      setIsRunning(false);
    }

    if (tool === "pattern") {
      const placements = applyPatternAt({
        patternId,
        origin: { r: row, c: col },
        rows,
        cols,
        rotation: patternRotation
      });
      const keys = placements.map((cell) => buildKey(cell.r, cell.c));
      setAlive((prev) => {
        const next = new Set(prev);
        keys.forEach((key) => next.add(key));
        return next;
      });
      return;
    }

    if (isDraggingRef.current) {
      paintCell(row, col, dragPaintRef.current);
    } else {
      paintCell(row, col, paintMode);
    }
  };

  const handleMouseDown = (row, col, event) => {
    event.preventDefault();
    if (tool === "pattern") {
      handleCellAction(row, col);
      return;
    }

    const mode = event.button === 2 ? "dead" : paintMode;
    isDraggingRef.current = true;
    dragPaintRef.current = mode;
    paintCell(row, col, mode);
  };

  const handleMouseEnter = (row, col) => {
    if (!isDraggingRef.current || tool === "pattern") {
      return;
    }
    paintCell(row, col, dragPaintRef.current);
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  const handleResize = (nextRows, nextCols) => {
    setRows(nextRows);
    setCols(nextCols);
    setGeneration(0);
    setAlive((prev) => {
      const next = new Set();
      prev.forEach((key) => {
        const [r, c] = parseKey(key);
        if (r < nextRows && c < nextCols) {
          next.add(key);
        }
      });
      return next;
    });
  };

  const handleRowsChange = (event) => {
    const value = clamp(Number(event.target.value || DEFAULT_ROWS), MIN_SIZE, MAX_SIZE);
    handleResize(value, cols);
  };

  const handleColsChange = (event) => {
    const value = clamp(Number(event.target.value || DEFAULT_COLS), MIN_SIZE, MAX_SIZE);
    handleResize(rows, value);
  };

  const handleClear = () => {
    setAlive(buildEmptySet());
    setGeneration(0);
  };

  const handleRandom = () => {
    setAlive(getRandomAlive(rows, cols));
    setGeneration(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2));
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  };

  const playStatus = isRunning ? "Running" : "Stopped";
  const gridSummary = `${rows} × ${cols}`;
  const totalCells = rows * cols;
  const exportPayload = useMemo(
    () => ({
      rows,
      cols,
      stepsPerSecond,
      generation,
      alive: aliveCoords
    }),
    [rows, cols, stepsPerSecond, generation, aliveCoords]
  );

  return (
    <article className="card life-card">
      <header className="life-header">
        <div>
          <h2 className="card-title">Game of Life Setup</h2>
          <p className="card-text">
            Build the initial state and run a client-side simulation with adjustable
            speed.
          </p>
        </div>
        <div className="life-status">
          <span className={"life-badge " + (isRunning ? "life-badge-running" : "life-badge-stopped")}>
            {playStatus}
          </span>
          <button
            type="button"
            className="life-button life-button-primary"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "Stop" : "Play"}
          </button>
        </div>
      </header>

      <section className="life-meta">
        <div className="life-meta-item">
          <span className="life-meta-label">Grid size</span>
          <span className="life-meta-value">{gridSummary}</span>
        </div>
        <div className="life-meta-item">
          <span className="life-meta-label">Total cells</span>
          <span className="life-meta-value">{totalCells.toLocaleString()}</span>
        </div>
        <div className="life-meta-item">
          <span className="life-meta-label">Generation</span>
          <span className="life-meta-value">{generation}</span>
        </div>
      </section>

      <section className="life-controls">
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-rows">
            Rows
          </label>
          <input
            id="life-rows"
            type="number"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={rows}
            disabled={isRunning}
            onChange={handleRowsChange}
          />
        </div>
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-cols">
            Columns
          </label>
          <input
            id="life-cols"
            type="number"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={cols}
            disabled={isRunning}
            onChange={handleColsChange}
          />
        </div>
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-tool">
            Tool
          </label>
          <select
            id="life-tool"
            value={tool}
            disabled={isRunning}
            onChange={(event) => setTool(event.target.value)}
          >
            {TOOL_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-pattern">
            Pattern
          </label>
          <select
            id="life-pattern"
            value={patternId}
            disabled={isRunning || tool !== "pattern"}
            onChange={(event) => setPatternId(event.target.value)}
          >
            {patternOptions.map((pattern) => (
              <option key={pattern.id} value={pattern.id}>
                {pattern.name}
              </option>
            ))}
          </select>
        </div>
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-rotation">
            Rotation
          </label>
          <select
            id="life-rotation"
            value={patternRotation}
            disabled={isRunning || tool !== "pattern"}
            onChange={(event) => setPatternRotation(Number(event.target.value))}
          >
            <option value={0}>0°</option>
            <option value={90}>90°</option>
            <option value={180}>180°</option>
            <option value={270}>270°</option>
          </select>
        </div>
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-paint">
            Paint mode
          </label>
          <select
            id="life-paint"
            value={paintMode}
            disabled={isRunning || tool !== "draw"}
            onChange={(event) => setPaintMode(event.target.value)}
          >
            <option value="alive">Paint alive</option>
            <option value="dead">Erase</option>
            <option value="toggle">Toggle</option>
          </select>
        </div>
        <div className="life-control-group life-actions">
          <button
            type="button"
            className="life-button"
            disabled={isRunning}
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="life-button"
            disabled={isRunning}
            onClick={handleRandom}
          >
            Random
          </button>
        </div>
        <div className="life-control-group">
          <label className="life-label" htmlFor="life-fps">
            Steps/sec
          </label>
          <input
            id="life-fps"
            type="number"
            min={MIN_STEPS_PER_SECOND}
            max={MAX_STEPS_PER_SECOND}
            value={stepsPerSecond}
            onChange={(event) =>
              setStepsPerSecond(
                clamp(
                  Number(event.target.value || DEFAULT_STEPS_PER_SECOND),
                  MIN_STEPS_PER_SECOND,
                  MAX_STEPS_PER_SECOND
                )
              )
            }
          />
        </div>
      </section>

      <section className="life-grid-wrapper">
        <div className="life-grid-tools">
          <p className="life-grid-hint">
            {isRunning
              ? "Simulation running locally. Pause to edit cells."
              : "Left click paints, right click erases. Drag to paint."}
          </p>
        </div>
        <div
          className={"life-grid" + (isRunning ? " life-grid-locked" : "")}
          style={{ gridTemplateColumns }}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onContextMenu={(event) => event.preventDefault()}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const key = buildKey(row, col);
            const isAlive = alive.has(key);
            return (
              <button
                key={key}
                type="button"
                aria-label={`cell-${row}-${col}`}
                className={"life-cell" + (isAlive ? " life-cell-alive" : "")}
                onMouseDown={(event) => handleMouseDown(row, col, event)}
                onMouseEnter={() => handleMouseEnter(row, col)}
                disabled={isRunning}
              />
            );
          })}
        </div>
      </section>

      <section className="life-export">
        <div>
          <h3 className="life-export-title">Alive cells export</h3>
          <p className="card-text">
            Export includes grid size, speed, generation, and alive coordinates.
          </p>
        </div>
        <button type="button" className="life-button" onClick={handleCopy}>
          Copy JSON
        </button>
      </section>
      <pre className="life-export-json">
        {JSON.stringify(exportPayload, null, 2)}
      </pre>
    </article>
  );
}

export default LifeSetup;
