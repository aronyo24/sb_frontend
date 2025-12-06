export interface Publication {
  id: number;
  title: string;
  // backend has `author` (string) but frontend expects `authors`
  author?: string;
  authors: string;
  pages?: string;
  journal?: string;
  // backend stores `cited_by` as string, frontend prefers numeric `citations`
 
  citations?: number;
  year: number;
  // backend uses `link`; frontend uses `url` in some places
  link?: string;
  url?: string;
  // optional frontend-only fields used for filtering/labels
  type?: string;
  area?: string;
}
export interface Project {
  id: number;
  project_title: string;
  project_description: string;
  status: string;
  durations: string;
  collaborators: string;
  funded_by: string;
  funding_amount: string;
  outcomes: string;
  impact?: string;
  category?: string;
}

export interface ResearchArea {
  area_name: string;
  description: string;
  focus_points: string | string[];
}


export interface Course {
  course_code: string;
  course_title: string;
  description: string;
  level: string;
  semester: string;
  year: number;
  enrollment: number;
}

export interface Message {
  name: string;
  email: string;
  subject: string;
  message: string;
  
}
export interface Homepage {
  position: string;
  name: string;
  heading: string;
  description: string;
  cv_url: string;
}

export interface CareerTimeline {
  id?: number;
  period: string;
  title: string;
  institution: string;
  description: string;
  order?: number;
}

export interface ResearchMetrics {
  metric_name: string;
  metric_value: string;
  description: string;
}

export interface ResearchHero {
  id: number;
  badge_label?: string;
  title: string;
  description: string;
  updated_at?: string;
}

export interface ResearchHighlightItem {
  id: number;
  title: string;
  description: string;
  order: number;
  is_active: boolean;
}

export interface CollaborationStreamItem {
  id: number;
  title: string;
  detail: string;
  order: number;
  is_active: boolean;
}

export interface ProjectHero {
  id: number;
  badge_label?: string;
  title: string;
  description: string;
  updated_at?: string;
}

export interface DeliveryApproachItem {
  id: number;
  phase: string;
  summary: string;
  order: number;
  is_active: boolean;
}

export interface StudentHero {
  id: number;
  badge_label?: string;
  title: string;
  description: string;
  updated_at?: string;
}

export interface TeachingHero {
  id: number;
  badge_label?: string;
  title: string;
  description: string;
  updated_at?: string;
}

export interface TeachingFocusItem {
  id: number;
  title: string;
  detail: string;
  order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface AboutHighlight {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface AboutNarrative {
  id: number;
  heading?: string;
  body: string;
  order: number;
}

export interface AboutHero {
  id: number;
  hero_title: string;
  description: string;
}

export interface AboutSummary {
  lead_paragraph: string;
  secondary_paragraph?: string;
}

export interface AboutProfile {
  id: number;
  title: string;
  subtitle?: string;
  contact_email?: string;
  updated_at: string;
  summary?: AboutSummary | null;
  highlights: AboutHighlight[];
  narratives: AboutNarrative[];
}

export interface ProfessionalService {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface Student {
  id: number;
  name: string;
  program: "PhD" | "MSc";
  status: "Active" | "Completed";
  startYear: number;
  endYear?: number;
  researchTitle: string;
  researchFocus?: string;
  institution?: string;
  email?: string;
  website?: string;
  notes?: string;
}