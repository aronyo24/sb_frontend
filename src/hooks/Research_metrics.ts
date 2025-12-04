import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import { ResearchMetrics} from "@/types/interface";

const useResearchMetrics = () => {
  const [researchMetricsData, setResearchMetricsData] = useState<ResearchMetrics[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      let mounted = true;
      setLoading(true);
  
      apiClient
        .get<ResearchMetrics[]>("research-metrics/")
        .then((response) => {
          if (mounted && Array.isArray(response.data)) {
            setResearchMetricsData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching career timeline:", error);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
  
      return () => {
        mounted = false;
      };
    }, []);
    return { researchMetricsData, loading, };
}

export default useResearchMetrics;