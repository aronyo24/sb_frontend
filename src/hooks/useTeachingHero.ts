import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { TeachingHero } from "@/types/interface";

const FALLBACK_HERO: TeachingHero = {
  id: 0,
  badge_label: "Teaching & Mentorship",
  title: "Designing inclusive learning journeys for future-ready practitioners",
  description:
    "Teaching spans postgraduate and undergraduate cohorts with an emphasis on applied labs, reflective practice, and direct engagement with industry stakeholders.",
};

const useTeachingHero = () => {
  const [hero, setHero] = useState<TeachingHero>(FALLBACK_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<TeachingHero[]>("teaching-hero/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setHero(response.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching teaching hero:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load teaching hero";
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

export default useTeachingHero;
