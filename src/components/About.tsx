import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Award,
  Globe,
  Mail,
  Users,
  Microscope,
  Lightbulb,
  Shield,
  type LucideIcon,
} from "lucide-react";

import type { AboutHighlight, AboutNarrative, AboutProfile } from "@/types/interface";

type AboutProps = {
  showBackground?: boolean;
  className?: string;
  title?: string;
  description?: string;
  profile?: AboutProfile | null;
  highlights?: AboutHighlight[];
  narratives?: AboutNarrative[];
};

const iconMap: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  award: Award,
  globe: Globe,
  mail: Mail,
  users: Users,
  microscope: Microscope,
  lightbulb: Lightbulb,
  shield: Shield,
};

type HighlightCard = {
  key: string;
  title: string;
  description: string;
  icon: string;
};

const fallbackHighlights: HighlightCard[] = [
  {
    key: "education",
    title: "Education",
    description: "PhD in Computer Science with specialization in distributed systems and security",
    icon: "graduation-cap",
  },
  {
    key: "recognition",
    title: "Recognition",
    description: "Multiple peer-reviewed publications in top-tier journals and conferences",
    icon: "award",
  },
  {
    key: "collaborations",
    title: "Collaborations",
    description: "International research partnerships with leading institutions and industry",
    icon: "globe",
  },
  {
    key: "service",
    title: "Professional Service",
    description: "Reviewer for international journals and conference program committees",
    icon: "mail",
  },
];

const fallbackNarratives: Array<{ key: string; heading?: string; body: string }> = [
  {
    key: "lead",
    body:
      "I hold the position of Assistant Professor in the Department of Computer Science at the City University of London. My professional focus encompasses both teaching and research, with a dedicated commitment to contributing to the academic pursuits of the School of Science and Technology.",
  },
  {
    key: "research",
    body:
      "My research interests span multiple domains including cybersecurity, blockchain technology, FinTech, IoT security, and machine learning applications. I am particularly interested in developing innovative security solutions for next-generation networks and distributed systems.",
  },
];

const About = ({
  showBackground = true,
  className,
  title,
  description,
  profile,
  highlights = [],
  narratives = [],
}: AboutProps) => {
  const resolvedTitle = title ?? profile?.title ?? "About Me";
  const resolvedDescription = description ?? profile?.subtitle ?? "Academic background and professional journey";

  const narrativeSections = (() => {
    const sections: Array<{ key: string; heading?: string; body: string }> = [];

    const summary = profile?.summary;

    if (summary?.lead_paragraph) {
      sections.push({ key: "lead", body: summary.lead_paragraph });
    }

    if (summary?.secondary_paragraph) {
      sections.push({ key: "secondary", body: summary.secondary_paragraph });
    }

    if (narratives.length > 0) {
      narratives
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .forEach((item) => {
          sections.push({
            key: `narrative-${item.id}`,
            heading: item.heading,
            body: item.body,
          });
        });
    }

    if (sections.length > 0) {
      return sections;
    }

    return fallbackNarratives;
  })();

  const highlightCards: HighlightCard[] = (() => {
    if (highlights.length === 0) {
      return fallbackHighlights;
    }

    return highlights
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        key: `highlight-${item.id}`,
        title: item.title,
        description: item.description,
        icon: item.icon,
      }));
  })();

  return (
    <section
      id="about"
      className={cn(showBackground ? "bg-secondary/30" : "bg-transparent", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">{resolvedTitle}</h2>
          <p className="text-lg text-muted-foreground">{resolvedDescription}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {narrativeSections.map((section) => (
                  <div key={section.key} className="mb-6 last:mb-0">
                    {section.heading ? (
                      <h3 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h3>
                    ) : null}
                    <p className="text-lg leading-relaxed text-foreground/90">{section.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlightCards.map((item) => {
              const Icon = iconMap[item.icon] ?? GraduationCap;
              return (
                <Card key={item.key} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
