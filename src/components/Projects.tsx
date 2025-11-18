import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Award, Target } from "lucide-react";
// import { cn } from "@/lib/utils";

import { useProjects } from "@/hooks/useProjects";
// type ProjectsProps = {
//   showBackground?: boolean;
//   className?: string;
//   title?: string;
//   description?: string;
// };

const Projectslist = () => {
  const { projectsData, loading } = useProjects();
 
  return (
    <section
      id="projects"
      className= "bg-secondary/30" 
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">Projects & Initiatives</h2>
          <p className="text-lg text-muted-foreground">Collaborative efforts driving innovation in digital infrastructure and cybersecurity.</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{project.project_title}</CardTitle>
                  <Badge variant={project.status === "Ongoing" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{project.project_description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Duration:</span>
                  <span className="text-muted-foreground">{project.durations}</span>
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="font-medium">Collaborators:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.collaborators}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="font-medium">Key Outcomes:</span>
                    <ul className="mt-1 space-y-1">
                      {project.outcomes}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <span className="text-xs font-medium text-muted-foreground">Funded by: </span>
                  <span className="text-xs text-primary font-medium">{project.funded_by}</span>
                </div>
                {project.impact && (
                  <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                    <Target className="h-4 w-4 text-primary/80" />
                    <span>{project.impact}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projectslist;