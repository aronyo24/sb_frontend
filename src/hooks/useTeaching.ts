import React, { memo } from 'react'
import { Course } from "@/types/interface";
import { apiClient } from "@/api/apiClient";
import { useState, useEffect } from "react";

const useTeaching = (() => {
  
  const [coursesData, setCoursesData] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      let mounted = true;
      setLoading(true);
  
      apiClient
        .get<Course[]>("/courses/")
        .then((response) => {
          if (mounted && Array.isArray(response.data)) {
            setCoursesData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
  
      return () => {
        mounted = false;
      };
    }, []);



  return {
    coursesData,
    loading,
  }
})

export default useTeaching