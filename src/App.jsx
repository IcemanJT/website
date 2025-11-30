// src/App.jsx

import { useEffect, useState } from "react";
import { checkHealth, listTools, runTool } from "./apiClient";
import "./index.css"; // global styles

function App() {
  const [health, setHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(false);

  const [tools, setTools] = useState([]);
  const [toolsLoading, setToolsLoading] = useState(false);

  const [runResult, setRunResult] = useState(null);
  const [runLoading, setRunLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Load health + tools when the app mounts
  useEffect(() => {
    handleCheckHealth();
    handleLoadTools();
  }, []);

  async function handleCheckHealth() {
    setHealthLoading(true);
    try {
      const data = await checkHealth();
      setHealth(data);
    } catch (err) {
      console.error(err);
      setHealth({ status: "error", error: "Failed to check health" });
    } finally {
      setHealthLoading(false);
    }
  }

  async function handleLoadTools() {
    setToolsLoading(true);
    try {
      const data = await listTools();
      setTools(data);
    } catch (err) {
      console.error(err);
      setTools([]);
    } finally {
      setToolsLoading(false);
    }
  }

  async function handleRunTool(toolId) {
    if (!toolId) return;

    setRunLoading(true);
    setRunResult(null);
    try {
      const payload = { input: inputValue || null };
      const result = await runTool(toolId, payload);
      setRunResult(result);
    } catch (err) {
      console.error(err);
      setRunResult({ error: "Failed to run tool" });
    } finally {
      setRunLoading(false);
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">My Website</h1>
          <p className="page-subtitle">
            Frontend ready. Backend wiring coming soon.
          </p>
        </div>
      </header>

      <section className="grid">
        {/* Status card */}
        <article className="card">
          <h2 className="card-title">Backend status</h2>
          <p className="card-text">
            These values are coming from mock functions that will later call
            your FastAPI backend.
          </p>

          <button
            className="btn"
            onClick={handleCheckHealth}
            disabled={healthLoading}
          >
            {healthLoading ? "Checking..." : "Re-check status"}
          </button>

          <pre className="card-pre">
            {health
              ? JSON.stringify(health, null, 2)
              : "No status yet — checking on load..."}
          </pre>
        </article>

        {/* Tools card */}
        <article className="card">
          <h2 className="card-title">Available tools</h2>
          <p className="card-text">
            This list comes from a stubbed <code>listTools()</code> function.
          </p>

          <button
            className="btn btn-outline"
            onClick={handleLoadTools}
            disabled={toolsLoading}
          >
            {toolsLoading ? "Loading..." : "Reload tools"}
          </button>

          <ul className="tools-list">
            {tools.length === 0 && !toolsLoading && (
              <li className="tools-empty">No tools yet.</li>
            )}
            {tools.map((tool) => (
              <li key={tool.id} className="tool-item">
                <div className="tool-header">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-status">{tool.status}</span>
                </div>
                <p className="tool-description">{tool.description}</p>
                <button
                  className="btn btn-small"
                  onClick={() => handleRunTool(tool.id)}
                  disabled={runLoading}
                >
                  {runLoading ? "Running..." : "Run tool"}
                </button>
              </li>
            ))}
          </ul>
        </article>

        {/* Run tool card */}
        <article className="card card-full">
          <h2 className="card-title">Tool runner</h2>
          <p className="card-text">
            Enter some input and click “Run tool” on any tool above. Right now
            it uses mock data, later it will call your real API.
          </p>

          <label className="field">
            <span className="field-label">Input</span>
            <input
              className="field-input"
              type="text"
              placeholder="Type something to send to the tool..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>

          <pre className="card-pre">
            {runResult
              ? JSON.stringify(runResult, null, 2)
              : "Tool result will appear here."}
          </pre>
        </article>
      </section>
    </main>
  );
}

export default App;
