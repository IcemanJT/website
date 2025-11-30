// src/apiClient.js

// Later you’ll use this:
// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Small helper to simulate network delay
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check backend health / status.
 * TODO: Replace mock implementation with real fetch call.
 */
export async function checkHealth() {
  await wait(400);
  // Example shape of real data:
  // const res = await fetch(`${API_BASE}/api/health`);
  // return await res.json();

  return { status: "ok", source: "mock" };
}

/**
 * List available tools / services.
 * TODO: Replace mock implementation with real fetch call.
 */
export async function listTools() {
  await wait(500);

  return [
    {
      id: "tool-1",
      name: "Example Tool",
      description: "Runs an example operation on the backend.",
      status: "coming soon",
    },
    {
      id: "tool-2",
      name: "Data Processor",
      description: "Will process data via a FastAPI endpoint.",
      status: "planned",
    },
  ];
}

/**
 * Run a tool with a given payload.
 * TODO: Replace mock implementation with real POST to backend.
 */
export async function runTool(toolId, payload) {
  await wait(700);

  // Example outline of future implementation:
  // const res = await fetch(`${API_BASE}/api/tools/${toolId}`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // return await res.json();

  return {
    toolId,
    payload,
    result: "This is a mock result. Wire me to FastAPI later.",
  };
}
