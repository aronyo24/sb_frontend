
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import useTeaching  from "@/hooks/useTeaching";


type TeachingProps = {
  showBackground?: boolean;
  className?: string;
  title?: string;
  description?: string;
};

const Teaching = ({
  showBackground = true,
  className,
  title = "Teaching",
  description = "Courses taught at City, University of London, fostering the next generation of computer scientists.",
}: TeachingProps) => {

  const { coursesData, loading } = useTeaching();

  


  return (
    <section
      id="teaching"
      className={cn(showBackground ? "bg-background" : "bg-transparent", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-6">
          {coursesData.map((course, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="font-mono text-xs">{course.course_code}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{course.course_title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{course.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {course.semester} {course.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {course.enrollment} students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {course.level} Level
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-secondary/50 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">For Students</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I welcome motivated students interested in research opportunities, project supervision, 
                or academic guidance in cybersecurity, blockchain, and related fields. 
                Please reach out via email with your CV and research interests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium">PhD Supervision:</span>
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium">MSc Projects:</span>
                  <span className="text-muted-foreground">Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Teaching;
