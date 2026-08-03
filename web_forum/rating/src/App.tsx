import { useState } from "react";
import { useAgents } from "./hooks/useAgents";
import { AddAgentForm } from "./components/AddAgentForm";
import { SearchBar } from "./components/SearchBar";
import { ErrorBanner } from "./components/ui/ErrorBanner";
import { AgentList } from "./components/AgentList";

function App() {
  const {
    agents,
    isLoading,
    isAdding,
    isDeleting,
    error,
    addAgent,
    deleteAgent,
  } = useAgents();

  const [search, setSearch] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.agents.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your agents</p>
          </div>

          <AddAgentForm onAdd={addAgent} isAdding={isAdding} />
          <SearchBar value={search} onChange={setSearch} />

          {error && <ErrorBanner message={error} />}

          <AgentList
            agents={filteredAgents}
            search={search}
            isLoading={isLoading}
            isDeleting={isDeleting}
            onDelete={deleteAgent}
          />

          {!isLoading && (
            <p className="mt-4 text-xs text-gray-400">
              {filteredAgents.length}{" "}
              {filteredAgents.length === 1 ? "agent" : "agents"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;