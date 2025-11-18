import { useState,useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Teaching from "@/components/Teaching";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teachingFocus } from "@/data/courses";

const TeachingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="uppercase tracking-wide text-xs">
                Teaching & Mentorship
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Designing inclusive learning journeys for future-ready practitioners
              </h1>
              <p className="text-lg text-muted-foreground">
                Teaching spans postgraduate and undergraduate cohorts with an emphasis on applied labs, reflective
                practice, and direct engagement with industry stakeholders.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teachingFocus.map((item) => (
                <Card key={item.title} className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Supervision Availability</h2>
              <p className="text-lg text-muted-foreground">
                I welcome motivated students for doctoral and master&apos;s projects aligned with cybersecurity, distributed
                systems, and financial technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Badge variant="secondary" className="px-6 py-2 text-sm font-medium">
                  PhD Supervision: Open
                </Badge>
                <Badge variant="outline" className="px-6 py-2 text-sm font-medium">
                  MSc Projects: Open
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeachingPage;
