import { useState, useEffect } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Projectslist from "@/components/Projects";
import { Card, CardContent, CardHeader ,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { deliveryApproach } from "@/data/projects"; 
import { apiClient } from "@/api/apiClient";
import { Project } from "@/types/interface";

const ProjectsPage = () => {
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

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="uppercase tracking-wide text-xs">
                Research Delivery
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Co-creating impactful digital infrastructure with partners
              </h1>
              <p className="text-lg text-muted-foreground">
                From cross-sector consortia to agile proof-of-concepts, each project is grounded in responsible innovation
                and measurable outcomes that strengthen digital trust.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">Delivery Approach</h2>
              <p className="text-muted-foreground text-lg">
                Projects advance through collaborative cycles that align research excellence with real-world adoption.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliveryApproach.map((item) => (
                <Card key={item.phase} className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.phase}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Initiatives */}
       <section className="bg-emerald-50 border-y">
          <Projectslist />  
        </section>

        {/* Project Timeline */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">Project Timeline</h2>
              <p className="text-muted-foreground text-lg">
                A continuous pipeline of knowledge transfer, from experimental prototypes to scaled deployments.
              </p>
            </div>
            <div className="space-y-6">
              {projectsData.map((project) => (
                <Card key={project.project_title} className="border-l-4 border-l-sky-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{project.project_title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{project.project_description}</p>
                        </div>
                        <Badge variant={project.status === "Ongoing" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <Badge variant="outline" className="uppercase tracking-wide">
                          {project.durations}
                        </Badge>
                        <span>Collaborators: {project.collaborators}</span>
                        <span>Funding: {project.funding_amount}</span>
                      </div>
                      {project.impact && (
                        <div className="rounded-md bg-secondary/40 px-3 py-2 text-sm text-muted-foreground">
                          Impact: {project.impact}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;