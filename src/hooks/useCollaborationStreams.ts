import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { CollaborationStreamItem } from "@/types/interface";

const FALLBACK_STREAMS: CollaborationStreamItem[] = [
  {
    id: 0,
    title: "Transnational Research Clusters",
    detail:
      "Leading working groups that bridge European and Asian institutions on digital trust and smart city innovations.",
    order: 1,
    is_active: true,
  },
  {
    id: 1,
    title: "Industry Advisory Boards",
    detail:
      "Advising cybersecurity scale-ups on secure-by-design product development and regulatory compliance readiness.",
    order: 2,
    is_active: true,
  },
  {
    id: 2,
    title: "Policy Engagement",
    detail:
      "Contributing evidence-based insights to government taskforces on fintech resilience and critical infrastructure.",
    order: 3,
    is_active: true,
  },
];

const useCollaborationStreams = () => {
  const [streams, setStreams] = useState<CollaborationStreamItem[]>(FALLBACK_STREAMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchStreams = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<CollaborationStreamItem[]>("collaboration-streams/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setStreams(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching collaboration streams:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load collaboration streams";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStreams();

    return () => {
      mounted = false;
    };
  }, []);

  return { streams, loading, error };
};

export default useCollaborationStreams;
