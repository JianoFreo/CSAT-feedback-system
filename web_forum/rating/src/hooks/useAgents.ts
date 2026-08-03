import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Agent = {
  id: number;
  created_at: string;
  agents: string;
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

  const addAgent = async (name: string) => {
    const value = name.trim();
    if (!value) return;

    setIsAdding(true);
    setError(null);

    const { data, error } = await supabase
      .from("agents")
      .insert({ agents: value })
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else if (data) {
      setAgents((current) => [data, ...current]);
    }

    setIsAdding(false);
  };

  const deleteAgent = async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);

      const { error } = await supabase.from("agents").delete().eq("id", id);

      if (error) {
        setError(error.message);
      } else {
        setAgents((current) => current.filter((agent) => agent.id !== id));
      }
    } catch {
      setError("An unexpected error occurred while deleting the agent.");
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