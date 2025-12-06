import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PublicationsPreview from "@/components/PublicationsPreview";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import useTeaching  from "@/hooks/useTeaching";
import { useProjects } from "@/hooks/useProjects";
import { ResearchMetrics } from "@/types/interface";
import useResearchMetrics from "@/hooks/Research_metrics";
import useResearchHighlights from "@/hooks/useResearchHighlights";
const Index = () => {
  const { projectsData, loading } = useProjects();
  const { highlights: researchHighlightData, loading: highlightsLoading, error: highlightsError } = useResearchHighlights();
  // const projectsData = featuredProjects;
  const featuredResearch = researchHighlightData.slice(0, 3);
  const featuredProjects = projectsData.slice(0, 2); 
  const { coursesData, loading: coursesLoading } = useTeaching();
  const featuredCourses = coursesData.slice(0, 2);
  const { researchMetricsData, loading: metricsLoading } = useResearchMetrics();
  const researchMetrics: ResearchMetrics[] = researchMetricsData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <main className="flex-1">
        <section className="bg-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-3 text-3xl font-semibold tracking-tight">Snapshot of the Portfolio</h2>
              <p className="text-muted-foreground text-lg">
                Explore the key strands of research, innovation, and teaching in a single view. Dive deeper into each area to discover collaborative opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <Card className="card-hover lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center gap-3 text-sky-600">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Research Focus</span>
                  </div>
                  <CardTitle className="text-2xl">Strategic Domains</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {featuredResearch.map((area) => (
                      <Badge key={area.title} variant="secondary" className="text-sm">
                        {area.title}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Translating fundamental research into secure, human-centric systems spanning fintech, distributed ledgers, and next-generation networks.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-2 border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
                  >
                    <Link to="/research">
                      Explore research agenda
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-3 text-sky-600">
                    <User className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">About</span>
                  </div>
                  <CardTitle className="text-2xl">Academic Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Assistant Professor at City, University of London, leading cross-disciplinary research programmes and supervising emerging scholars.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Link to="/about">
                      Read full bio
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-3 text-sky-600">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Active Projects</span>
                  </div>
                  <CardTitle className="text-xl">Innovation Pipeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {projectsData.map((project) => (
                      <div key={project.project_title} className="rounded-lg border border-border/60 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-foreground">{project.project_title}</h3>
                          <Badge variant={project.status === "Ongoing" ? "default" : "secondary"}>{project.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {project.project_description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="justify-start px-0 text-emerald-700 hover:text-emerald-800"
                  >
                    <Link to="/projects">
                      View research projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-3 text-sky-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Teaching & Mentoring</span>
                  </div>
                  <CardTitle className="text-xl">Classroom Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {featuredCourses.map((course) => (
                      <li key={course.course_code} className="flex flex-col gap-1 rounded-lg border border-border/60 p-3">
                        <div className="flex items-center gap-2">
                          <Badge className="font-mono text-xs">{course.course_code}</Badge>
                          <span className="text-xs text-muted-foreground uppercase">{course.level}</span>
                        </div>
                        <span className="font-semibold text-sm text-foreground">{course.course_title}</span>
                        <span className="text-xs text-muted-foreground">
                          {course.semester} {course.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="ghost"
                    className="justify-start px-0 text-emerald-700 hover:text-emerald-800"
                  >
                    <Link to="/teaching">
                      Teaching portfolio
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="card-hover bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Research Highlights</span>
                </div>
                <CardTitle className="text-xl">Current Explorations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {researchHighlightData.map((item) => (
                    <div key={item.title} className="rounded-lg border border-border/60 bg-background p-4">
                      <h3 className="text-sm font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <PublicationsPreview />

        <section className="bg-sky-50 py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Let&apos;s Collaborate</h2>
              <p className="text-lg text-muted-foreground">
                Whether you are exploring joint research, seeking supervision, or planning industry knowledge exchange, I would love to hear from you.
              </p>
              <Button
                asChild
                size="lg"
                variant="default"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Link to="/contact">
                  Reach out
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
