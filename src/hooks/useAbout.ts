import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import {
  CareerTimeline,
  AboutProfile,
  AboutHighlight,
  AboutNarrative,
  AboutHero,
  ProfessionalService,
} from "@/types/interface";

type UseAboutState = {
  profile: AboutProfile | null;
  highlights: AboutHighlight[];
  narratives: AboutNarrative[];
  careerTimelineData: CareerTimeline[];
  hero: AboutHero | null;
  professionalServices: ProfessionalService[];
  loading: boolean;
};

type PaginatedPayload<T> = {
  results?: T;
};

const coerceArray = <T>(payload: T[] | PaginatedPayload<T[]> | undefined | null): T[] => {
  if (!payload) {
    return [];
  }
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }
  return [];
};

const useAbout = (): UseAboutState => {
  const [profile, setProfile] = useState<AboutProfile | null>(null);
  const [highlights, setHighlights] = useState<AboutHighlight[]>([]);
  const [narratives, setNarratives] = useState<AboutNarrative[]>([]);
  const [careerTimelineData, setCareerTimelineData] = useState<CareerTimeline[]>([]);
  const [hero, setHero] = useState<AboutHero | null>(null);
  const [professionalServices, setProfessionalServices] = useState<ProfessionalService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      apiClient.get<AboutHero[]>("about-hero/"),
      apiClient.get<AboutProfile[]>("about-profiles/"),
      apiClient.get<CareerTimeline[]>("career-timeline/"),
      apiClient.get<ProfessionalService[]>("professional-services/"),
    ])
      .then(([heroResponse, profileResponse, timelineResponse, serviceResponse]) => {
        if (!mounted) return;

        const heroEntries = coerceArray<AboutHero>(heroResponse.data);
        setHero(heroEntries[0] ?? null);

        const profiles = coerceArray<AboutProfile>(profileResponse.data);
        const firstProfile = profiles[0] ?? null;

        setProfile(firstProfile);
        setHighlights(firstProfile?.highlights ?? []);
        setNarratives(firstProfile?.narratives ?? []);

        const timelines = coerceArray<CareerTimeline>(timelineResponse.data);
        setCareerTimelineData(timelines);

        const services = coerceArray<ProfessionalService>(serviceResponse.data);
        setProfessionalServices(services);
      })
      .catch((error) => {
        if (mounted) {
          console.error("Error fetching about page data:", error);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { profile, highlights, narratives, careerTimelineData, hero, professionalServices, loading };
};

export default useAbout;