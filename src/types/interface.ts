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
  focus_points: string[];
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
  period: string;
  title: string;
  institution: string;
  description: string;
}

export interface ResearchMetrics {
  metric_name: string;
  metric_value: string;
  description: string;
}