// src/App.jsx

import { useState } from "react";
import "./index.css";

const PROJECTS = [
  {
    id: "backend",
    name: "Backend APIs",
    tagline: "Endpoints, health checks & tools",
    description:
      "This view will focus on the backend API surface: health checks, tools, and any other exposed routes.",
    planned: [
      "Call /health and show live status",
      "List available tools/actions",
      "Visualize response time and basic metrics",
    ],
  },
  {
    id: "playground",
    name: "API Playground",
    tagline: "Interactive request/response tester",
    description:
      "A lightweight Postman-style area for sending test requests to your backend directly from this page.",
    planned: [
      "Method selector (GET / POST / ...)",
      "Endpoint input (e.g. /api/health)",
      "JSON body editor with validation",
      "Pretty-printed JSON response viewer",
    ],
  },
  {
    id: "docs",
    name: "Project docs",
    tagline: "High-level overview & links",
    description:
      "Summary of what this repo does, how the backend is structured, and where to find docs and examples.",
    planned: [
      "Link to README and API docs",
      "Architecture sketch / description",
      "Setup instructions & environment info",
    ],
  },
];

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const selectedProject =
    PROJECTS.find((p) => p.id === selectedProjectId) ?? PROJECTS[0];

  return (
    <div className="app-root">
      {/* Sidebar */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <div>
            <h1 className="sidebar-title">Github Website Sandbox</h1>
            <p className="sidebar-subtitle"></p>
          </div>

          <a
            href="https://github.com/IcemanJT/website"
            target="_blank"
            rel="noreferrer"
            className="sidebar-link"
          >
            View repository
          </a>
        </header>

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">Welcome</h2>

          <h3 className="sidebar-section-subtitle">What you get now</h3>
          <ul className="sidebar-list">
            <li>Clean UI, no fake network calls</li>
            <li>Clear placeholders for future endpoints</li>
            <li>Simple structure that is easy to extend</li>
          </ul>

          <h3 className="sidebar-section-subtitle">What&apos;s next</h3>
          <ul className="sidebar-list">
            <li>Turn this into a public API playground</li>
          </ul>
        </section>

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">Choose what to display</h2>
          <p className="sidebar-section-text">
            Pick a project area below. The main panel on the right will update
            based on your selection. For now this is all placeholder content.
          </p>

          <ul className="project-list">
            {PROJECTS.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  className={
                    "project-item" +
                    (project.id === selectedProjectId
                      ? " project-item-active"
                      : "")
                  }
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <span className="project-name">{project.name}</span>
                  <span className="project-tagline">{project.tagline}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* Main content */}
      <main className="main">
        <article className="card main-card">
          <h2 className="card-title">{selectedProject.name}</h2>
          <p className="card-text">{selectedProject.description}</p>

          <div className="placeholder-box">
            <p className="placeholder-title">Planned features for this view</p>
            <ul className="placeholder-list">
              {selectedProject.planned.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card-text main-footer">
            <p>
              Once your backend is ready, this panel can query real endpoints
              and render live data here instead of static text.
            </p>
            <p>
              For now, it simply reflects your selection from{" "}
              <strong>&quot;Choose what to display&quot;</strong> in the
              sidebar.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

export default App;
