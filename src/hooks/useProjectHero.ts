import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { ProjectHero } from "@/types/interface";

const FALLBACK_HERO: ProjectHero = {
  id: 0,
  badge_label: "Research Delivery",
  title: "Co-creating impactful digital infrastructure with partners",
  description:
    "From cross-sector consortia to agile proof-of-concepts, each project is grounded in responsible innovation and measurable outcomes that strengthen digital trust.",
};

const useProjectHero = () => {
  const [hero, setHero] = useState<ProjectHero>(FALLBACK_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<ProjectHero[]>("project-hero/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setHero(response.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching project hero:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load project hero";
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

export default useProjectHero;
