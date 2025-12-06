import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerTimeline, ProfessionalService } from "@/types/interface";
import useAbout from "@/hooks/useAbout";

const AboutPage = () => {
  const { profile, highlights, narratives, careerTimelineData, hero, professionalServices, loading } = useAbout();
  const academicTimeline: CareerTimeline[] = careerTimelineData
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const heroTitle = hero?.hero_title ?? "Championing resilient, equitable digital transformation";
  const heroDescription = hero?.description ??
    "An academic career dedicated to bridging rigorous scholarship with applied impact, mentoring diverse cohorts of emerging researchers, and shaping global conversations on cybersecurity and financial technology.";
  const sortedServices = professionalServices
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
              <h1 className="text-4xl font-bold tracking-tight text-foreground">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground">{heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <About
            showBackground={false}
            className="py-12"
            title={profile?.title ?? "Academic Journey"}
            description={
              profile?.subtitle ??
              "Key milestones and areas of expertise that underpin current research directions."
            }
            profile={profile}
            highlights={highlights}
            narratives={narratives}
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
              {loading && academicTimeline.length === 0 ? (
                <p className="text-center text-muted-foreground">Loading career timeline…</p>
              ) : academicTimeline.length === 0 ? (
                <p className="text-center text-muted-foreground">No timeline entries available yet.</p>
              ) : (
                academicTimeline.map((item) => (
                  <Card key={item.id ?? `${item.title}-${item.period}`} className="border-l-4 border-l-sky-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary" className="self-start uppercase tracking-wide text-xs">
                          {item.period}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.title}
                          {item.institution ? `, ${item.institution}` : ""}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
              {loading && sortedServices.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">Loading professional services…</p>
              ) : sortedServices.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">No professional service entries available yet.</p>
              ) : (
                sortedServices.map((item: ProfessionalService) => (
                  <Card key={item.id} className="card-hover h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
