export interface Course {
  code: string;
  title: string;
  description: string;
  level: "Undergraduate" | "Postgraduate";
  semester: string;
  year: number;
  enrollment: number;
}

export const courses: Course[] = [
  {
    code: "INM448",
    title: "Cybersecurity, Resilience, and Fraud",
    description:
      "Advanced cybersecurity principles, organizational resilience strategies, and fraud analytics with hands-on labs.",
    level: "Postgraduate",
    semester: "Spring",
    year: 2024,
    enrollment: 45,
  },
  {
    code: "CSC321",
    title: "Blockchain and Distributed Systems",
    description:
      "Fundamentals of blockchain technology, consensus mechanisms, and distributed system architectures.",
    level: "Undergraduate",
    semester: "Fall",
    year: 2023,
    enrollment: 38,
  },
  {
    code: "INM363",
    title: "FinTech and Digital Innovation",
    description:
      "Explores digital payments, decentralised finance, and regulatory frameworks shaping global fintech ecosystems.",
    level: "Postgraduate",
    semester: "Spring",
    year: 2023,
    enrollment: 52,
  },
];

export const teachingFocus = [
  {
    title: "Studio-Based Learning",
    detail: "Students prototype secure digital services while receiving iterative feedback on architecture decisions.",
  },
  {
    title: "Industry Partnerships",
    detail: "Live briefs from financial institutions and cybersecurity scale-ups anchor applied learning.",
  },
  {
    title: "Inclusive Mentorship",
    detail: "Structured guidance for first-generation scholars and international learners entering computing disciplines.",
  },
];
