import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { StudentHero } from "@/types/interface";

const FALLBACK_HERO: StudentHero = {
  id: 0,
  badge_label: "PhD & MSc Mentorship",
  title: "Guiding researchers advancing digital trust",
  description:
    "Explore the postgraduate researchers I supervise across cybersecurity, distributed ledgers, and resilient digital services.",
};

const useStudentHero = () => {
  const [hero, setHero] = useState<StudentHero>(FALLBACK_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<StudentHero[]>("student-hero/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setHero(response.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching student hero:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load student hero";
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

export default useStudentHero;
