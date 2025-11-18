import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import { Publication } from "@/types/interface";

const usePublications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("year-desc");
  const [resultsPerPage, setResultsPerPage] = useState<string>("20");

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Derived filters
  const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
  const types = Array.from(new Set(publications.map((p) => p.type).filter(Boolean)));
  const areas = Array.from(new Set(publications.map((p) => p.area).filter(Boolean)));

  // Fetch publications on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    apiClient
      .get("publications/")
      .then((res) => {
        if (!mounted) return;

        const data = Array.isArray(res.data) ? res.data : [];

        const mapped: Publication[] = data.map((p: any) => ({
          id: p.id,
          title: p.title ?? p.name ?? "",
          authors: p.author ?? p.authors ?? "",
          author: p.author ?? p.authors ?? "",
          journal: p.journal ?? "",
          year: p.year ? Number(p.year) : 0,
          citations:
            p.cited_by !== undefined && p.cited_by !== null && p.cited_by !== ""
              ? Number(p.cited_by)
              : undefined,
          cited_by: p.cited_by,
          url: p.link ?? p.url ?? "",
          link: p.link ?? p.url ?? "",
          pages: p.pages,
          type: p.type ?? "Article",
          area: p.area ?? "Other",
        }));

        setPublications(mapped);
        setError(null);
      })
      .catch((err) => setError(err?.message || "Failed to load publications"))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedYear,
    setSelectedYear,
    selectedType,
    setSelectedType,
    selectedArea,
    setSelectedArea,
    sortBy,
    setSortBy,
    resultsPerPage,
    setResultsPerPage,
    publications,
    loading,
    error,
    years,
    types,
    areas,
  };
};

export default usePublications;
