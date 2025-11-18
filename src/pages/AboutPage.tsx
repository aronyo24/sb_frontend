import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {CareerTimeline} from '@/types/interface'
import useAbout from "@/hooks/useAbout";


const professionalService = [
  {
    title: "Program Committees",
    description: "IEEE Blockchain, ACM SAC, and multiple international cybersecurity symposia.",
  },
  {
    title: "Journal Reviewer",
    description: "IEEE Transactions on Services Computing, IEEE IoT Journal, Elsevier Future Generation Computer Systems.",
  },
  {
    title: "Industry Advisory",
    description: "FinTech scale-ups and public-sector taskforces on digital trust and regulatory readiness.",
  },
];

const AboutPage = () => {
  
  const { careerTimelineData, loading } = useAbout();
  const academicTimeline: CareerTimeline[] = careerTimelineData;
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 ">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="uppercase tracking-wide text-xs">
                About
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Championing resilient, equitable digital transformation
              </h1>
              <p className="text-lg text-muted-foreground">
                An academic career dedicated to bridging rigorous scholarship with applied impact, mentoring diverse
                cohorts of emerging researchers, and shaping global conversations on cybersecurity and financial technology.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <About
            showBackground={false}
            className="py-12"
            title="Academic Journey"
            description="Key milestones and areas of expertise that underpin current research directions."
          />
        </section>

        <section className="py-12 bg-sky-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">Career Timeline</h2>
              <p className="text-muted-foreground text-lg">
                A snapshot of academic and professional roles shaping today&apos;s research and teaching philosophy.
              </p>
            </div>
            <div className="space-y-6">
              {academicTimeline.map((item) => (
                <Card key={item.title} className="border-l-4 border-l-sky-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-2">
                      <Badge variant="secondary" className="self-start uppercase tracking-wide text-xs">
                        {item.period}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground">{item.title},{item.institution}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">Professional Service</h2>
              <p className="text-muted-foreground text-lg">
                Active engagements that extend research insights into global communities of practice.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professionalService.map((item) => (
                <Card key={item.title} className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
