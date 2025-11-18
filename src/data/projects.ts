export interface Project {
  title: string;
  description: string;
  status: "Ongoing" | "Completed";
  duration: string;
  collaborators: string[];
  funding: string;
  outcomes: string[];
  impact?: string;
}

export const projects: Project[] = [
  {
    title: "6G Network Security",
    description:
      "Security mechanisms for 6G networks including SLA management, smart contracts, and machine learning-based threat detection.",
    status: "Ongoing",
    duration: "2023 - 2026",
    collaborators: ["City, University of London", "Industry Partners"],
    funding: "EPSRC Grant",
    outcomes: ["Published papers", "Open-source tools", "Industry collaboration"],
    impact: "Shaping standards for resilient 6G services across telecom consortia.",
  },
  {
    title: "Healthcare Blockchain Systems",
    description:
      "Interoperable blockchain solutions for secure healthcare data sharing with focus on privacy and regulatory compliance.",
    status: "Ongoing",
    duration: "2022 - 2025",
    collaborators: ["NHS Trust", "UCL"],
    funding: "Research Council Grant",
    outcomes: ["Globechain platform", "Multiple publications", "Patents pending"],
    impact: "Piloted by healthcare providers to streamline cross-border patient data exchange.",
  },
  {
    title: "IoT Security Framework",
    description:
      "Lightweight security protocols and consensus mechanisms for resource-constrained IoT devices.",
    status: "Completed",
    duration: "2020 - 2022",
    collaborators: ["Northumbria University"],
    funding: "Industry Sponsored",
    outcomes: ["PoBT consensus algorithm", "IEEE publications", "Commercial deployment"],
    impact: "Adopted in smart city deployments supporting 120k+ connected sensors.",
  },
];

export const deliveryApproach = [
  {
    phase: "Discovery",
    summary: "Co-create research problems with stakeholders and map systemic requirements.",
  },
  {
    phase: "Design",
    summary: "Prototype resilient architectures with verifiable security and compliance guarantees.",
  },
  {
    phase: "Deployment",
    summary: "Translate outcomes into community artefacts, open-source tooling, and policy impact.",
  },
];
