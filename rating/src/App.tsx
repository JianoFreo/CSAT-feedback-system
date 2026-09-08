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

    return sortDirection === "asc" ? sorted : sorted.reverse();
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
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">

              {/* Search */}
              <div className="mb-4">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                />
              </div>

              {/* Sorting */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                {/* Sort By */}
                <label className="flex-1 text-sm text-gray-600">
                  <span className="mb-1.5 block font-medium">
                    Sort by
                  </span>

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as SortBy)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="name">
                      Name
                    </option>

                    <option value="created_at">
                      Date added
                    </option>
                  </select>
                </label>

                {/* Order */}
                <label className="flex-1 text-sm text-gray-600 sm:max-w-[220px]">
                  <span className="mb-1.5 block font-medium">
                    Order
                  </span>

                  <select
                    value={sortDirection}
                    onChange={(e) =>
                      setSortDirection(
                        e.target.value as SortDirection
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="asc">
                      Ascending
                    </option>

                    <option value="desc">
                      Descending
                    </option>
                  </select>
                </label>

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
