import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { DeliveryApproachItem } from "@/types/interface";

const FALLBACK_APPROACH: DeliveryApproachItem[] = [
  {
    id: 0,
    phase: "Discovery",
    summary: "Co-create research problems with stakeholders and map systemic requirements.",
    order: 1,
    is_active: true,
  },
  {
    id: 1,
    phase: "Design",
    summary: "Prototype resilient architectures with verifiable security and compliance guarantees.",
    order: 2,
    is_active: true,
  },
  {
    id: 2,
    phase: "Deployment",
    summary: "Translate outcomes into community artefacts, open-source tooling, and policy impact.",
    order: 3,
    is_active: true,
  },
];

const useDeliveryApproach = () => {
  const [approach, setApproach] = useState<DeliveryApproachItem[]>(FALLBACK_APPROACH);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchApproach = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<DeliveryApproachItem[]>("delivery-approach/");
        if (!mounted) return;

        if (Array.isArray(response.data) && response.data.length > 0) {
          setApproach(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching delivery approach:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load delivery approach";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchApproach();

    return () => {
      mounted = false;
    };
  }, []);

  return { approach, loading, error };
};

export default useDeliveryApproach;
