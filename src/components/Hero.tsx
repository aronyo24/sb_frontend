import { Button } from "@/components/ui/button";
import { Mail, Download, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { researchMetrics } from "@/data/research";

import { apiClient } from "@/api/apiClient";
import { Homepage } from "@/types/interface";
import { useState, useEffect } from "react";
import useResearchMetrics from "@/hooks/Research_metrics";
const Hero = () => {
  const navigate = useNavigate();
  const [homepageData, setHomepageData] = useState<Homepage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { researchMetricsData, loading: metricsLoading } = useResearchMetrics();

  // take 3 metrics for hero section
  const heroMetrics = researchMetricsData ? researchMetricsData.slice(0, 3) : [];

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    apiClient
      .get<Homepage[]>("/homepage/")
      .then((response) => {
        if (mounted && Array.isArray(response.data) && response.data.length > 0) {
          setHomepageData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching homepage data:", error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="home"
      className="overflow-hidden lg:min-h-[85vh] bg-gradient-to-br from-sky-50 via-white to-emerald-50 "
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 opacity-[0.08] pb-24" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">

          {/* Render only if homepage data loaded */}
          {homepageData && (
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

              {/* LEFT CONTENT */}
              <div className="space-y-8">

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-700">
                    {homepageData.position}
                  </span>
                </div>

                <div className="space-y-4">
                  <h1
                    id="hero-heading"
                    className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] text-slate-900"
                  >
                    {homepageData.name}
                  </h1>

                  <p className="text-lg text-slate-700 sm:text-xl">
                    {homepageData.heading}
                  </p>

                  <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
                    {homepageData.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-emerald-500 text-slate-900 shadow-lg hover:bg-emerald-400"
                    onClick={() => navigate("/contact")}
                  >
                    <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                    Contact Me
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-200 text-slate-800 hover:bg-emerald-100 hover:text-slate-900"
                    asChild
                  >
                    <a href={homepageData.cv_url} download>
                      <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                      Download CV
                    </a>
                  </Button>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {heroMetrics.map((metric) => (
                    <div
                      key={metric.metric_name}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <p className="text-2xl font-semibold text-slate-900">{metric.metric_value}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-600">{metric.metric_name}</p>
                      <p className="mt-2 text-xs text-slate-600">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">
                <div className="absolute -bottom-10 -right-6 hidden h-32 w-32 rounded-full bg-secondary/50 blur-3xl lg:block" />

                <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md">
                  <img
                    src="/Profile.jpeg"
                    alt="Portrait of Dr. Sujit Biswas"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-black/10 bg-black/50 p-4 text-sm text-white/90 backdrop-blur">
                    <p className="font-medium text-white">Digital Trust Research Lead</p>
                    <p className="mt-1 text-xs">
                      Cybersecurity · Blockchain Governance · FinTech Resilience
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
