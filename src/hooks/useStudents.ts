import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { Student } from "@/types/interface";

const inferProgram = (input?: string): "PhD" | "MSc" => {
  const value = (input ?? "").toLowerCase();
  if (value.includes("ph")) {
    return "PhD";
  }
  if (value.includes("ms")) {
    return "MSc";
  }
  return "PhD";
};

const inferStatus = (input?: string): "Active" | "Completed" => {
  const value = (input ?? "").toLowerCase();
  if (value.includes("complet") || value.includes("graduat") || value.includes("finish")) {
    return "Completed";
  }
  return "Active";
};

const parseYear = (input: unknown): number | undefined => {
  const numeric = Number.parseInt(String(input ?? ""), 10);
  return Number.isFinite(numeric) ? numeric : undefined;
};

const fallbackStudent = (fallbackId: number): Student => ({
  id: fallbackId,
  name: "Student",
  program: "PhD",
  status: "Active",
  startYear: new Date().getFullYear(),
  researchTitle: "Research project",
});

const pickString = (record: Record<string, unknown>, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }
  return undefined;
};

const pickNumber = (record: Record<string, unknown>, keys: string[]): number | undefined => {
  for (const key of keys) {
    const value = parseYear(record[key]);
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
};

const normaliseStudent = (raw: unknown, fallbackId: number): Student => {
  if (typeof raw !== "object" || raw === null) {
    return fallbackStudent(fallbackId);
  }

  const record = raw as Record<string, unknown>;

  const program = inferProgram(pickString(record, ["program", "student_type"]));
  const status = inferStatus(pickString(record, ["status", "student_status", "student_type"]));
  const startYear = pickNumber(record, ["start_year", "startYear", "start"]);
  const endYear = pickNumber(record, ["end_year", "endYear", "end"]);

  const researchTitle =
    pickString(record, ["research_title", "project_title", "course_name", "thesis_title", "title"]) ??
    "Research project";

  const researchFocus =
    pickString(record, ["research_focus", "description", "summary", "notes"]) ?? undefined;

  const email = pickString(record, ["email", "contact_email"]);
  const website = pickString(record, ["website", "profile_url", "link"]);
  const notes = pickString(record, ["notes"]);
  const institution = pickString(record, ["institution", "university", "affiliation", "school"]);
  const idValue = record.id;

  return {
    id: typeof idValue === "number" ? idValue : fallbackId,
    name: pickString(record, ["name", "full_name", "student_name"]) ?? "Student",
    program,
    status,
    startYear: startYear ?? new Date().getFullYear(),
    endYear,
    researchTitle,
    researchFocus,
    institution,
    email,
    website,
    notes,
  };
};

const useStudents = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchStudents = async () => {
      try {
        const response = await apiClient.get<Student[]>("students/");

        if (!mounted) return;

        const parsed = Array.isArray(response.data)
          ? response.data.map((item, index) => normaliseStudent(item, index))
          : [];
        setStudentsData(parsed);
        setError(null);
      } catch (err) {
        console.error("Error fetching students:", err);
        if (mounted) {
          const message = err instanceof Error ? err.message : "Unable to load students";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStudents();

    return () => {
      mounted = false;
    };
  }, []);

  return { studentsData, loading, error };
};

export default useStudents;
