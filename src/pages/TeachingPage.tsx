import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Teaching from "@/components/Teaching";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useTeachingHero from "@/hooks/useTeachingHero";
import useTeachingFocus from "@/hooks/useTeachingFocus";

const TeachingPage = () => {
  const { hero, loading: heroLoading, error: heroError } = useTeachingHero();
  const { focusAreas, loading: focusLoading, error: focusError } = useTeachingFocus();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              {(hero.badge_label || heroLoading) && (
                <Badge variant="outline" className="uppercase tracking-wide text-xs">
                  {heroLoading ? "Loading" : hero.badge_label}
                </Badge>
              )}
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {hero.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {hero.description}
              </p>
              {heroError && <p className="text-sm text-red-600">{heroError}</p>}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {focusAreas.map((item) => (
                <Card key={item.id} className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {focusLoading && focusAreas.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">Loading focus areas…</p>
            )}
            {focusError && <p className="mt-4 text-sm text-red-600">{focusError}</p>}
          </div>
        </section>

        <section className="bg-emerald-50 border-y">
          <Teaching
            showBackground={false}
            className="py-12"
            title="Courses & Cohorts"
            description="Curated modules combining theory, technical depth, and real-world case studies across cybersecurity, blockchain, and fintech."
          />
        </section>

        
      </main>
      <Footer />
    </div>
  );
};

export default TeachingPage;
