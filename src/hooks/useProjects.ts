import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import { Project } from "@/types/interface";

export const useProjects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    apiClient
      .get<Project[]>("/projects/")
      .then((response) => {
        if (mounted && Array.isArray(response.data)) {
          setProjectsData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return { projectsData, loading };
};
