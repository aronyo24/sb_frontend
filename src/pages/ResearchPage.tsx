import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResearchAreas from "@/components/ResearchAreas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useResearchMetrics from "@/hooks/Research_metrics";
import useResearchHero from "@/hooks/useResearchHero";
import useResearchHighlights from "@/hooks/useResearchHighlights";
import useCollaborationStreams from "@/hooks/useCollaborationStreams";

const ResearchPage = () => {
  const { hero, error: heroError } = useResearchHero();
  const { researchMetricsData, loading: metricsLoading } = useResearchMetrics();
  const metrics = researchMetricsData;
  const {
    highlights,
    loading: highlightsLoading,
    error: highlightsError,
  } = useResearchHighlights();
  const {
    streams,
    loading: streamsLoading,
    error: streamsError,
  } = useCollaborationStreams();

  const badgeLabel = hero.badge_label ?? "Research Portfolio";
  const heroTitle = hero.title ?? "Research";
  const heroDescription = hero.description ?? "";
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-1">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50  border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="uppercase tracking-wide text-xs">
                {badgeLabel}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {heroTitle}
              </h1>
              <p className="text-lg text-muted-foreground">
                {heroDescription}
              </p>
              {heroError && (
                <p className="text-xs text-amber-600 bg-amber-100/60 rounded-md px-3 py-2 inline-block">
                  Showing the latest published overview while the live hero content updates.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsLoading ? (
                <Card className="h-full border-sky-100">
                  <CardContent className="p-6 text-sm text-muted-foreground">Loading research metrics…</CardContent>
                </Card>
              ) : metrics.length > 0 ? (
                metrics.map((metric) => (
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
                ))
              ) : (
                <Card className="h-full border-sky-100">
                  <CardContent className="p-6 text-sm text-muted-foreground">
                    Research metrics will appear once published.
                  </CardContent>
                </Card>
              )}
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
              {highlightsLoading ? (
                <Card className="card-hover">
                  <CardContent className="p-6 text-center text-sm text-muted-foreground">
                    Loading highlights…
                  </CardContent>
                </Card>
              ) : highlights.length > 0 ? (
                highlights.map((highlight) => (
                  <Card key={highlight.id} className="card-hover">
                    <CardHeader>
                      <CardTitle className="text-lg">{highlight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="card-hover">
                  <CardContent className="p-6 text-center text-sm text-muted-foreground">
                    Research highlights will appear soon.
                  </CardContent>
                </Card>
              )}
            </div>
            {highlightsError && (
              <p className="mt-6 text-center text-xs text-amber-600">
                Highlights are currently showing a cached version due to a connection issue.
              </p>
            )}
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
              {streamsLoading ? (
                <Card className="card-hover h-full border border-emerald-100 bg-white/80 shadow-sm">
                  <CardContent className="p-6 text-center text-sm text-muted-foreground">
                    Loading collaboration streams…
                  </CardContent>
                </Card>
              ) : streams.length > 0 ? (
                streams.map((stream) => (
                  <Card
                    key={stream.id}
                    className="card-hover h-full border border-emerald-100 bg-white/80 shadow-sm"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{stream.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{stream.detail}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="card-hover h-full border border-emerald-100 bg-white/80 shadow-sm">
                  <CardContent className="p-6 text-center text-sm text-muted-foreground">
                    Collaboration streams will appear soon.
                  </CardContent>
                </Card>
              )}
            </div>
            {streamsError && (
              <p className="mt-6 text-center text-xs text-amber-600">
                Streams are currently showing a cached version due to a connection issue.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;
