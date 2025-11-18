import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import { CareerTimeline} from "@/types/interface";

const useAbout = () => {
  const [careerTimelineData, setCareerTimelineData] = useState<CareerTimeline[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      let mounted = true;
      setLoading(true);
  
      apiClient
        .get<CareerTimeline[]>("/career-timeline/")
        .then((response) => {
          if (mounted && Array.isArray(response.data)) {
            setCareerTimelineData(response.data);
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
    return { careerTimelineData, loading, };
}

export default useAbout;