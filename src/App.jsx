// src/App.jsx

import "./index.css"; // global styles

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Github Website Sandbox</h1>
          <p className="page-subtitle">
            Minimal frontpage for this repo. Backend endpoints coming soon.
          </p>
        </div>

        <div className="page-header-actions">
          <a
            href="https://github.com/IcemanJT/website"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            View repository
          </a>
        </div>
      </header>

      <section className="grid">
        {/* Intro / project description */}
        <article className="card">
          <h2 className="card-title">Welcome</h2>
          <p className="card-text">
            This is a clean landing page for the project. The cards below are
            placeholders for your future FastAPI (or any backend) endpoints.
          </p>

          <ul className="card-list">
            <li>✅ Simple layout, no mock logic</li>
            <li>🧱 Ready spots for status, tools & API testing</li>
            <li>🚀 Can be turned into a full API playground later</li>
          </ul>

          <p className="card-text">
            As you expose endpoints, you can wire them directly into these
            sections without changing the overall layout.
          </p>
        </article>

        {/* Backend status placeholder */}
        <article className="card">
          <h2 className="card-title">Backend status (placeholder)</h2>
          <p className="card-text">
            This card will eventually call your{" "}
            <code>/api/health</code> or similar endpoint to display the current
            status of the backend.
          </p>

          <button className="btn" disabled>
            Check status (coming soon)
          </button>

          <pre className="card-pre">
{`// Example future response:
{
  "status": "ok",
  "version": "0.1.0"
}`}
          </pre>
        </article>

        {/* Tools / API showcase placeholder */}
        <article className="card card-full">
          <h2 className="card-title">API playground (placeholder)</h2>
          <p className="card-text">
            This section is reserved for a simple API tester or tools list. For
            now, it only documents what will be here later.
          </p>

          <div className="card-text">
            <p>Planned ideas:</p>
            <ul className="card-list">
              <li>
                🔧 <strong>Tools list</strong> from <code>/api/tools</code>
              </li>
              <li>
                ▶️ <strong>Run tool</strong> via <code>/api/tools/run</code>
              </li>
              <li>
                📜 Show raw JSON responses for quick debugging
              </li>
            </ul>
          </div>

          <div className="placeholder-box">
            <p className="placeholder-title">API tester UI (future)</p>
            <p className="placeholder-text">
              When the backend is ready, this box can turn into:
            </p>
            <ul className="placeholder-list">
              <li>Method selector (GET / POST / ...)</li>
              <li>Endpoint input (e.g. /api/health)</li>
              <li>Request body editor (JSON)</li>
              <li>Pretty-printed response output</li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
