
import { useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar, GraduationCap, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
import useTeaching  from "@/hooks/useTeaching";
import useStudents from "@/hooks/useStudents";


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
  const { studentsData, loading: loadingStudents, error: studentError } = useStudents();

  const studentSummary = useMemo(() => {
    if (!studentsData?.length) {
      return {
        activePhd: 0,
        activeMsc: 0,
        alumni: 0,
      };
    }

    const activePhd = studentsData.filter(
      (student) => student.program === "PhD" && student.status === "Active"
    ).length;
    const activeMsc = studentsData.filter(
      (student) => student.program === "MSc" && student.status === "Active"
    ).length;
    const alumni = studentsData.filter((student) => student.status === "Completed").length;

    return { activePhd, activeMsc, alumni };
  }, [studentsData]);

  


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
          <Card className="bg-secondary/40 border border-primary/10">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">For Prospective Students</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I work closely with postgraduate researchers tackling challenges across cybersecurity, distributed ledgers,
                  and responsible fintech. Share your CV, research interests, and availability to explore supervision options.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg bg-background/80 border border-primary/10 p-4 flex flex-col items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    <GraduationCap className="h-4 w-4" /> PhD Researchers
                  </span>
                  <span className="text-2xl font-semibold text-foreground">
                    {loadingStudents ? "—" : studentSummary.activePhd}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Currently supervised</span>
                </div>
                <div className="rounded-lg bg-background/80 border border-primary/10 p-4 flex flex-col items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    <UserCheck className="h-4 w-4" /> MSc Projects
                  </span>
                  <span className="text-2xl font-semibold text-foreground">
                    {loadingStudents ? "—" : studentSummary.activeMsc}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Active collaborations</span>
                </div>
                <div className="rounded-lg bg-background/80 border border-primary/10 p-4 flex flex-col items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    <Users className="h-4 w-4" /> Alumni Network
                  </span>
                  <span className="text-2xl font-semibold text-foreground">
                    {loadingStudents ? "—" : studentSummary.alumni}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Completed researchers</span>
                </div>
              </div>

              {studentError && (
                <p className="text-xs text-amber-600 bg-amber-100/60 rounded-md px-3 py-2">
                  Live student data is unavailable at the moment; figures reflect the latest snapshot.
                </p>
              )}
            </CardContent>
            <CardFooter className="pb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">PhD Supervision:</span>
                <span>Open for 2025 intake</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">MSc Projects:</span>
                <span>Discuss bespoke briefs</span>
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-4 sm:mt-0">
                <Link to="/students">Explore student directory</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Teaching;
