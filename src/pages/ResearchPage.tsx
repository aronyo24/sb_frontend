import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResearchAreas from "@/components/ResearchAreas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  researchMetrics,
  researchHighlights,
  collaborationStreams,
} from "@/data/research";
import useResearchMetrics from "@/hooks/Research_metrics";

const ResearchPage = () => {
  const { researchMetricsData, loading } = useResearchMetrics();
  const researchMetrics = researchMetricsData;
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-1">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="uppercase tracking-wide text-xs">
                Research Portfolio
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Building trusted digital ecosystems through socio-technical research
              </h1>
              <p className="text-lg text-muted-foreground">
                The research programme combines rigorous theoretical inquiry with translational experimentation.
                From future network orchestration to responsible blockchain governance, each project advances human-centred,
                secure digital infrastructure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchMetrics.map((metric) => (
                <Card key={metric.metric_name} className="h-full border-sky-100">
                  <CardHeader>
                    <CardTitle className="text-3xl text-primary">{metric.metric_value}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {metric.metric_name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

  <section className="py-12 bg-sky-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Current Research Highlights</h2>
              <p className="text-muted-foreground text-lg">
                Cross-cutting initiatives that demonstrate our commitment to resilient and equitable digital futures.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchHighlights.map((highlight) => (
                <Card key={highlight.title} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <ResearchAreas
            showBackground={false}
            className="py-12"
            title="Core Research Areas"
            description="Each thematic area blends theoretical insight with applied experimentation, delivering impact that spans academia, industry, and policy communities."
          />
        </section>

        <section className="py-12 bg-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold tracking-tight">Collaborative Streams</h2>
              <p className="text-muted-foreground text-lg">
                Multi-institution partnerships and advisory engagements underpin research translation and global reach.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collaborationStreams.map((stream) => (
                <Card key={stream.title} className="card-hover h-full border border-emerald-100 bg-white/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{stream.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stream.detail}</p>
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

export default ResearchPage;
