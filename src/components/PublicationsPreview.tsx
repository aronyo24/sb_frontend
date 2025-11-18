import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { apiClient } from "@/api/apiClient";
import { Publication } from "@/types/interface";
import { useState, useEffect } from "react";
import usePublications from "@/hooks/usePublications";



const PublicationsPreview = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedYear,
    setSelectedYear,
    selectedType,
    setSelectedType,
    selectedArea,
    setSelectedArea,
    sortBy,
    setSortBy,
    resultsPerPage,
    setResultsPerPage,
    publications,
  } = usePublications();

  const displayedRecentPublications = [...publications]
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 4);



  return (
    <section id="publications" className="bg-gradient-to-br from-secondary/30 via-background to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="mb-4">Recent Publications</h2>
          <p className="text-lg text-muted-foreground">
            Selected recent publications in leading international journals
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/** show newest first and limit to 4 items for preview */}
          {displayedRecentPublications.map((pub, index) => (
            <Card key={index} className="card-hover border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold leading-tight text-foreground">
                        {pub.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pub.authors}
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="font-medium">
                          {pub.journal}
                        </Badge>
                        <span className="text-muted-foreground">•</span>
                        <Badge variant="outline">{pub.year}</Badge>
                        <span className="text-muted-foreground">•</span>
                        <Badge variant="outline">{pub.area}</Badge>
                        {typeof pub.citations === "number" && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <Badge className="bg-accent/10 text-accent-foreground border-accent/20">
                              {pub.citations} citations
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="default"
                      asChild
                      className="shrink-0 bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" variant="default" asChild>
            <Link to="/publications">
              View All Publications
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicationsPreview;
