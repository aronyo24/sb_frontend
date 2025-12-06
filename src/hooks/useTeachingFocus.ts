import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { teachingFocus as fallbackFocus } from "@/data/courses";
import { TeachingFocusItem } from "@/types/interface";

const mapFallbackFocus = (): TeachingFocusItem[] =>
  fallbackFocus.map((item, index) => ({
    id: index,
    title: item.title,
    detail: item.detail,
    order: index + 1,
    is_active: true,
  }));

const useTeachingFocus = () => {
  const [focusAreas, setFocusAreas] = useState<TeachingFocusItem[]>(mapFallbackFocus());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchFocus = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<TeachingFocusItem[]>("teaching-focus/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          const sorted = [...response.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setFocusAreas(sorted);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching teaching focus:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load focus areas";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchFocus();

    return () => {
      mounted = false;
    };
  }, []);

  return { focusAreas, loading, error };
};

export default useTeachingFocus;
