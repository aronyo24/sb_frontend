import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ResearchArea } from "@/types/interface";
import { apiClient } from "@/api/apiClient";
import { useState, useEffect } from "react";

// Static icon (you said you don't want dynamic icons)
import { FiCpu } from "react-icons/fi";

type ResearchAreasProps = {
  showBackground?: boolean;
  className?: string;
  title?: string;
  description?: string;
};

// Helper: always return an array of strings
const getFocusPoints = (focus_points: unknown): string[] => {
  if (Array.isArray(focus_points)) {
    return focus_points.filter((item): item is string => typeof item === "string");
  }

  if (typeof focus_points === "string") {
    // e.g. "AI, Machine Learning, Security"
    return focus_points
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
};

const ResearchAreas = ({
  showBackground = true,
  className,
  title = "Research Areas",
  description = "Exploring cutting-edge topics at the intersection of cybersecurity, financial technology, and distributed systems.",
}: ResearchAreasProps) => {
  const [researchAreasData, setResearchAreasData] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    apiClient
      .get<ResearchArea[]>("/research-areas/")
      .then((response) => {
        if (mounted && Array.isArray(response.data)) {
          setResearchAreasData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching research areas:", error);
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
      id="research"
      className={cn(showBackground ? "bg-secondary/30" : "bg-transparent", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {researchAreasData.map((area, index) => {
            const focusPoints = getFocusPoints((area as any).focus_points);

            return (
              <Card key={index} className="card-hover border-0 shadow-md">
                <CardContent className="p-6">
                  {/* Static icon */}
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FiCpu className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{area.area_name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>

                  {/* Safe map – ALWAYS uses an array */}
                  {focusPoints.length > 0 && (
                    <ul className="mt-4 space-y-1 text-sm text-muted-foreground/80">
                      {focusPoints.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <span
                            className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary/50"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreas;
