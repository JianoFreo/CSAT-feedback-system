import { useMemo, useState } from "react";

import { useAgents } from "./hooks/useAgents";
import { AddAgentForm } from "./components/AddAgentForm";
import { SearchBar } from "./components/SearchBar";
import { SortDropdown } from "./components/SortDropdown";
import { ErrorBanner } from "./components/ui/ErrorBanner";
import { AgentList } from "./components/AgentList";
import NoAgent from "./components/NoAgent";

type SortBy = "name" | "created_at";
type SortDirection = "asc" | "desc";

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

  const [sortBy, setSortBy] =
    useState<SortBy>("name");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  /*
   * Filter agents by search
   */
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) =>
      agent.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [agents, search]);

  /*
   * Sort agents
   */
  const sortedAgents = useMemo(() => {
    const sorted = [...filteredAgents];

    sorted.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      const aTime = new Date(
        a.created_at
      ).getTime();

      const bTime = new Date(
        b.created_at
      ).getTime();

      return aTime - bTime;
    });

    if (sortDirection === "desc") {
      sorted.reverse();
    }

    return sorted;
  }, [
    filteredAgents,
    sortBy,
    sortDirection,
  ]);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">

          {/* Main Content */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Agents
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your agents
              </p>
            </div>

            {/* Add Agent */}
            <div className="mb-6">
              <AddAgentForm
                onAdd={addAgent}
                isAdding={isAdding}
              />
            </div>

            {/* Search + Sort */}
            <div className="mb-6 flex items-center gap-3">

              {/* Search */}
              <div className="min-w-0 flex-1">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                />
              </div>

              {/* Sort Dropdown */}
              <SortDropdown
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortByChange={setSortBy}
                onSortDirectionChange={
                  setSortDirection
                }
              />

            </div>

            {/* Error */}
            {error && (
              <div className="mb-4">
                <ErrorBanner
                  message={error}
                />
              </div>
            )}

            {/* Agent List */}
            <AgentList
              agents={sortedAgents}
              search={search}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDelete={deleteAgent}
            />

            {/* Agent Count */}
            {!isLoading && (
              <p className="mt-4 text-xs text-gray-400">
                {sortedAgents.length}{" "}
                {sortedAgents.length === 1
                  ? "agent"
                  : "agents"}
              </p>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-10 lg:self-start">
            <NoAgent />
          </div>

        </div>

      </div>
    </main>
  );
}

export default App;