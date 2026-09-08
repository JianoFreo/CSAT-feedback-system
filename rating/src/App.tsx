import { useMemo, useState } from "react";

import { useAgents } from "./hooks/useAgents";
import { AddAgentForm } from "./components/AddAgentForm";
import { SearchBar } from "./components/SearchBar";
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
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [sortOpen, setSortOpen] = useState(false);

  const filteredAgents = useMemo(
    () =>
      agents.filter((agent) =>
        agent.name.toLowerCase().includes(search.toLowerCase())
      ),
    [agents, search]
  );

  const sortedAgents = useMemo(() => {
    const sorted = [...filteredAgents];

    sorted.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();

      return aTime - bTime;
    });

    return sortDirection === "asc"
      ? sorted
      : sorted.reverse();
  }, [filteredAgents, sortBy, sortDirection]);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">

          {/* Main content */}
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

            {/* Search and Sorting */}
            <div className="mb-6 flex items-center gap-3">

              {/* Search */}
              <div className="min-w-0 flex-1">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                />
              </div>

              {/* Sort */}
              <div className="relative shrink-0">

                {/* Sort Button */}
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen((prev) => !prev)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  aria-label="Sort agents"
                  aria-expanded={sortOpen}
                >
                  <span className="text-lg leading-none">
                    ⇅
                  </span>
                </button>

                {/* Dropdown */}
                {sortOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">

                    {/* Sort By */}
                    <div>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Sort by
                      </p>

                      {/* Name */}
                      <button
                        type="button"
                        onClick={() => setSortBy("name")}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <span>Name</span>

                        {sortBy === "name" && (
                          <span className="text-blue-500">
                            ✓
                          </span>
                        )}
                      </button>

                      {/* Date added */}
                      <button
                        type="button"
                        onClick={() =>
                          setSortBy("created_at")
                        }
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <span>Date added</span>

                        {sortBy === "created_at" && (
                          <span className="text-blue-500">
                            ✓
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="my-3 border-t border-gray-100" />

                    {/* Order */}
                    <div>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Order
                      </p>

                      {/* Ascending */}
                      <button
                        type="button"
                        onClick={() =>
                          setSortDirection("asc")
                        }
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            ↑
                          </span>

                          <span>
                            Ascending
                          </span>
                        </div>

                        {sortDirection === "asc" && (
                          <span className="text-blue-500">
                            ✓
                          </span>
                        )}
                      </button>

                      {/* Descending */}
                      <button
                        type="button"
                        onClick={() =>
                          setSortDirection("desc")
                        }
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            ↓
                          </span>

                          <span>
                            Descending
                          </span>
                        </div>

                        {sortDirection === "desc" && (
                          <span className="text-blue-500">
                            ✓
                          </span>
                        )}
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4">
                <ErrorBanner message={error} />
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