import { useMemo, useState } from "react";
import { GraduationCap, Clock, Mail, Globe2, Users, LineChart, Building2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStudents from "@/hooks/useStudents";
import { cn } from "@/lib/utils";
import { Student } from "@/types/interface";

const statusBadgeStyles: Record<Student["status"], string> = {
  Active: "bg-emerald-50 border-emerald-200 text-emerald-700",
  Completed: "bg-slate-100 border-slate-200 text-slate-600",
};

const formatDuration = (student: Student) => {
  const endYearLabel = typeof student.endYear === "number" ? student.endYear : "Present";
  return `${student.startYear} – ${endYearLabel}`;
};

type StudentsDirectoryProps = {
  showBackground?: boolean;
  className?: string;
};

const StudentsDirectory = ({ showBackground = true, className }: StudentsDirectoryProps) => {
  const { studentsData, loading, error } = useStudents();

  const [programFilter, setProgramFilter] = useState<"all" | "PhD" | "MSc">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Completed">("all");
  const [cohortFilter, setCohortFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "name">("recent");

  const cohortOptions = useMemo(
    () =>
      Array.from(new Set(studentsData.map((student) => student.startYear)))
        .sort((a, b) => b - a)
        .map((year) => year.toString()),
    [studentsData]
  );

  const stats = useMemo(() => {
    const now = new Date().getFullYear();
    const activePhd = studentsData.filter((student) => student.program === "PhD" && student.status === "Active").length;
    const activeMsc = studentsData.filter((student) => student.program === "MSc" && student.status === "Active").length;
    const alumni = studentsData.filter((student) => student.status === "Completed").length;

    const durations = studentsData.map((student) => {
      const endYear = student.endYear ?? now;
      return Math.max(1, endYear - student.startYear + 1);
    });

    const averageDuration = durations.length
      ? (durations.reduce((total, current) => total + current, 0) / durations.length).toFixed(1)
      : null;

    return [
      {
        label: "Active PhD Researchers",
        value: activePhd,
        helper: "currently under supervision",
        icon: GraduationCap,
      },
      {
        label: "Active MSc Projects",
        value: activeMsc,
        helper: "guided industry collaborations",
        icon: Users,
      },
      {
        label: "Average Supervision Duration",
        value: averageDuration ? `${averageDuration} years` : "—",
        helper: "across current and alumni cohorts",
        icon: LineChart,
      },
    ];
  }, [studentsData]);

  const filteredStudents = useMemo(() => {
    const base = studentsData.filter((student) => {
      const matchesProgram = programFilter === "all" || student.program === programFilter;
      const matchesStatus = statusFilter === "all" || student.status === statusFilter;
      const matchesCohort = cohortFilter === "all" || student.startYear.toString() === cohortFilter;
      return matchesProgram && matchesStatus && matchesCohort;
    });

    const sorted = [...base];

    if (sortBy === "recent") {
      sorted.sort((a, b) => b.startYear - a.startYear);
    } else {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [studentsData, programFilter, statusFilter, cohortFilter, sortBy]);

  const filtersActive =
    programFilter !== "all" || statusFilter !== "all" || cohortFilter !== "all" || sortBy !== "recent";

  const handleResetFilters = () => {
    setProgramFilter("all");
    setStatusFilter("all");
    setCohortFilter("all");
    setSortBy("recent");
  };

  return (
    <section className={cn(showBackground ? "bg-muted/40" : "bg-transparent", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border border-emerald-100/60 bg-white shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <span className="rounded-full bg-emerald-100 text-emerald-700 p-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/80 mt-2">
                      {stat.helper}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {error && (
          <Card className="border border-amber-200 bg-amber-50/80">
            <CardContent className="p-4 text-sm text-amber-900">
              Live student data is temporarily unavailable. Showing the curated directory instead.
            </CardContent>
          </Card>
        )}

        <Card className="border border-emerald-100/70 bg-white shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Programme</p>
                <Select value={programFilter} onValueChange={(value) => setProgramFilter(value as "all" | "PhD" | "MSc")}>
                  <SelectTrigger className="border-emerald-100">
                    <SelectValue placeholder="All programmes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All programmes</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="MSc">MSc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Status</p>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | "Active" | "Completed")}>
                  <SelectTrigger className="border-emerald-100">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Active">In progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Cohort (Start Year)</p>
                <Select value={cohortFilter} onValueChange={(value) => setCohortFilter(value)}>
                  <SelectTrigger className="border-emerald-100">
                    <SelectValue placeholder="All cohorts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All cohorts</SelectItem>
                    {cohortOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Sort by</p>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as "recent" | "name")}>
                  <SelectTrigger className="border-emerald-100">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Newest cohort</SelectItem>
                    <SelectItem value="name">A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredStudents.length}</span> of
                <span className="font-medium text-foreground"> {studentsData.length}</span> students
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                disabled={!filtersActive}
                className="self-start sm:self-auto"
              >
                Reset filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <Card className="border border-emerald-100 bg-white shadow-sm">
            <CardContent className="p-8 text-center text-muted-foreground">Loading student directory…</CardContent>
          </Card>
        ) : filteredStudents.length === 0 ? (
          <Card className="border border-emerald-100 bg-white shadow-sm">
            <CardContent className="p-8 text-center text-muted-foreground">
              No students match the current filters. Adjust the filters to explore the full directory.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map((student) => (
              <Card
                key={`${student.id}-${student.name}`}
                className="border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl text-foreground">{student.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="uppercase tracking-wide text-[11px]">
                        {student.program}
                      </Badge>
                      <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border", statusBadgeStyles[student.status])}>
                        {student.status === "Active" ? "In progress" : "Completed"}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary/70" />
                      <span>{student.researchTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary/70" />
                      <span>{formatDuration(student)}</span>
                    </div>
                    {student.institution && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary/70" />
                        <span>{student.institution}</span>
                      </div>
                    )}
                  </div>
                  {student.researchFocus && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{student.researchFocus}</p>
                  )}
                  {student.notes && (
                    <div className="rounded-md bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
                      {student.notes}
                    </div>
                  )}
                </CardContent>

                {(student.email || student.website) && (
                  <CardFooter className="flex flex-wrap gap-3 pt-0">
                    {student.email && (
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <a href={`mailto:${student.email}`}>
                          <Mail className="h-4 w-4" /> Email
                        </a>
                      </Button>
                    )}
                    {student.website && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        <a href={student.website} target="_blank" rel="noopener noreferrer">
                          <Globe2 className="h-4 w-4" /> Portfolio
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentsDirectory;
