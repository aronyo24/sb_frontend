import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { ResearchHighlightItem } from "@/types/interface";

const FALLBACK_HIGHLIGHTS: ResearchHighlightItem[] = [
  {
    id: 0,
    title: "Autonomous SLA Orchestration",
    description:
      "Designing intelligent control loops for adaptive service-level assurance in 6G networks using multi-agent learning.",
    order: 1,
    is_active: true,
  },
  {
    id: 1,
    title: "Responsible Blockchain Governance",
    description:
      "Building auditable smart contracts and cross-chain bridges for healthcare and public sector interoperability.",
    order: 2,
    is_active: true,
  },
  {
    id: 2,
    title: "Human-Centric Cyber Defence",
    description:
      "Integrating socio-technical modeling with machine learning to pre-empt organizational security threats.",
    order: 3,
    is_active: true,
  },
];

const useResearchHighlights = () => {
  const [highlights, setHighlights] = useState<ResearchHighlightItem[]>(FALLBACK_HIGHLIGHTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHighlights = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<ResearchHighlightItem[]>("research-highlights/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setHighlights(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching research highlights:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load research highlights";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchHighlights();

    return () => {
      mounted = false;
    };
  }, []);

  return { highlights, loading, error };
};

export default useResearchHighlights;
