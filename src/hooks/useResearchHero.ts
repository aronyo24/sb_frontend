import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { ResearchHero } from "@/types/interface";

const FALLBACK_HERO: ResearchHero = {
  id: 0,
  badge_label: "Research Portfolio",
  title: "Building trusted digital ecosystems through socio-technical research",
  description:
    "The research programme combines rigorous theoretical inquiry with translational experimentation. From future network orchestration to responsible blockchain governance, each project advances human-centred, secure digital infrastructure.",
};

const useResearchHero = () => {
  const [hero, setHero] = useState<ResearchHero>(FALLBACK_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<ResearchHero[]>("research-hero/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setHero(response.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching research hero:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load research hero";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchHero();

    return () => {
      mounted = false;
    };
  }, []);

  return { hero, loading, error };
};

export default useResearchHero;
