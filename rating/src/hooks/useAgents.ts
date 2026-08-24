import { useEffect, useState } from "react";
import { api } from "../lib/api";

export type Agent = {
  id: number;
  created_at: string;
  name: string;
};

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAgents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await api.get<{ agents: Agent[] }>("/api/agents");
        setAgents(data.agents);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    getAgents();
  }, []);

  const addAgent = async (name: string) => {
    const value = name.trim();
    if (!value) return;

    setIsAdding(true);
    setError(null);

    try {
      const { data } = await api.post<{ agent: Agent }>("/api/agents", { name: value });
      setAgents((current) => [data.agent, ...current]);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsAdding(false);
    }
  };

  const deleteAgent = async (id: number) => {
    setIsDeleting(true);
    setError(null);

    try {
      await api.delete(`/api/agents/${id}`);
      setAgents((current) => current.filter((agent) => agent.id !== id));
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    agents,
    isLoading,
    isAdding,
    isDeleting,
    error,
    addAgent,
    deleteAgent,
  };
}

function extractErrorMessage(err: unknown): string {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { data?: { error?: string } } }).response?.data?.error === "string"
  ) {
    return (err as { response: { data: { error: string } } }).response.data.error;
  }
  return "An unexpected error occurred.";
}
