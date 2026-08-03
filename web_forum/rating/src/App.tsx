import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Agent = {
  id: number;
  created_at: string;
  agents: string;
};

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState("");
  const [newAgent, setNewAgent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAgents = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setAgents(data ?? []);
      }

      setIsLoading(false);
    };

    getAgents();
  }, []);

  const addAgent = async () => {
    const value = newAgent.trim();

    if (!value) return;

    setIsAdding(true);
    setError(null);

    const { data, error } = await supabase
      .from("agents")
      .insert({
        agents: value,
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else if (data) {
      setAgents((current) => [data, ...current]);
      setNewAgent("");
    }

    setIsAdding(false);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.agents.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-6 shadow-sm">
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
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              placeholder="Enter agent name..."
              value={newAgent}
              onChange={(e) => setNewAgent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addAgent();
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <button
              onClick={addAgent}
              disabled={isAdding || !newAgent.trim()}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add"}
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Loading */}
          {isLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">
              Loading agents...
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">
              <p className="text-sm text-gray-500">
                {search ? "No agents found." : "No agents yet."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 rounded-lg border border-gray-200">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {agent.agents}
                    </p>

                    <p className="text-xs text-gray-400">
                      Added{" "}
                      {new Date(agent.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    #{agent.id}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Count */}
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