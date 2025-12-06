import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StudentsDirectory from "@/components/StudentsDirectory";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useStudentHero from "@/hooks/useStudentHero";
import { ArrowRight } from "lucide-react";

const StudentsPage = () => {
  const { hero, loading, error } = useStudentHero();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl space-y-6">
              {(hero.badge_label || loading) && (
                <Badge variant="outline" className="uppercase tracking-wide text-xs text-primary">
                  {loading ? "Loading" : hero.badge_label}
                </Badge>
              )}
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {hero.description}
              </p>
              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
          </div>
        </section>

        <StudentsDirectory className="py-16" />

        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border border-emerald-100 bg-emerald-50/60 shadow-sm">
              <CardContent className="p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Interested in doctoral or master's supervision?
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                    Share your research ambitions, industry project ideas, or interdisciplinary collaborations. I am keen to
                    support motivated researchers working at the intersection of security, blockchain, and financial
                    technology.
                  </p>
                </div>
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Start the conversation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StudentsPage;
