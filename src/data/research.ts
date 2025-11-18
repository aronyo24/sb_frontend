import type { LucideIcon } from "lucide-react";
import { Shield, TrendingUp, Network, Lock, Cpu, Globe } from "lucide-react";

export interface ResearchArea {
  icon: LucideIcon;
  title: string;
  description: string;
  focus?: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Advanced security mechanisms for modern networks, focusing on threat detection and resilience strategies.",
    focus: ["Zero-trust architectures", "Privacy-preserving analytics", "AI-enabled monitoring"],
  },
  {
    icon: TrendingUp,
    title: "FinTech",
    description:
      "Digital innovation in finance, exploring decentralized finance, digital payments, and regulatory frameworks.",
    focus: ["DeFi governance", "Central bank digital currencies", "RegTech automation"],
  },
  {
    icon: Network,
    title: "Blockchain Technology",
    description:
      "Distributed ledger systems, consensus mechanisms, and interoperability solutions for secure data sharing.",
    focus: ["Cross-chain interoperability", "Smart contract auditing", "Sustainable consensus models"],
  },
  {
    icon: Lock,
    title: "IoT Security",
    description:
      "Lightweight security protocols and frameworks for resource-constrained IoT devices and networks.",
    focus: ["Edge authentication", "Secure firmware updates", "Context-aware policy design"],
  },
  {
    icon: Cpu,
    title: "Machine Learning Applications",
    description:
      "AI-driven approaches for security, fraud detection, and intelligent system optimization.",
    focus: ["Explainable AI", "Adversarial robustness", "Predictive maintenance"],
  },
  {
    icon: Globe,
    title: "6G Network Security",
    description:
      "Next-generation network security, SLA management, and smart contract integration for 6G ecosystems.",
    focus: ["Autonomous SLA orchestration", "Slicing security", "Trusted spectrum sharing"],
  },
];

export const researchMetrics = [
  {
    label: "Publications",
    value: "45+",
    description: "Peer-reviewed outputs across journals, conferences, and magazines.",
  },
  {
    label: "Active Grants",
    value: "£2.4M",
    description: "Research funding secured in cybersecurity and FinTech initiatives.",
  },
  {
    label: "Collaborations",
    value: "18",
    description: "Global academic and industry partners engaged in ongoing projects.",
  },
  {
    label: "Supervisions",
    value: "12",
    description: "PhD and MSc researchers mentored across core thematic areas.",
  },
];

export const researchHighlights = [
  {
    title: "Autonomous SLA Orchestration",
    description:
      "Designing intelligent control loops for adaptive service-level assurance in 6G networks using multi-agent learning.",
  },
  {
    title: "Responsible Blockchain Governance",
    description:
      "Building auditable smart contracts and cross-chain bridges for healthcare and public sector interoperability.",
  },
  {
    title: "Human-Centric Cyber Defence",
    description:
      "Integrating socio-technical modeling with machine learning to pre-empt organizational security threats.",
  },
];

export const collaborationStreams = [
  {
    title: "Transnational Research Clusters",
    detail:
      "Leading working groups that bridge European and Asian institutions on digital trust and smart city innovations.",
  },
  {
    title: "Industry Advisory Boards",
    detail:
      "Advising cybersecurity scale-ups on secure-by-design product development and regulatory compliance readiness.",
  },
  {
    title: "Policy Engagement",
    detail:
      "Contributing evidence-based insights to government taskforces on fintech resilience and critical infrastructure.",
  },
];
