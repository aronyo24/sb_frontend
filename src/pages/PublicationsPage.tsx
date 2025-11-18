import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePublications from "@/hooks/usePublications";



const PublicationsPage = () => {
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
    loading,
    error,
  } = usePublications();

  // Extract unique years, types, and areas for filters
  const years = Array.from(
    new Set(publications.map((pub) => pub.year).filter((year) => year !== undefined))
  ).sort((a, b) => b - a) as number[];

  const types = Array.from(
    new Set(publications.map((pub) => pub.type).filter((type) => type !== undefined))
  ) as string[];

  const areas = Array.from(
    new Set(publications.map((pub) => pub.area).filter((area) => area !== undefined))
  ) as string[];
  // Filter and sort publications
  const filteredPublications = publications
    .filter((pub) => {
      // safe, trimmed, lower-cased query
      const q = searchQuery.trim().toLowerCase();
      const title = (pub.title ?? "").toString().toLowerCase();
      const authors = (pub.authors ?? "").toString().toLowerCase();
      const journal = (pub.journal ?? "").toString().toLowerCase();

      const matchesSearch = q === "" || title.includes(q) || authors.includes(q) || journal.includes(q);

      const matchesYear = selectedYear === "all" || pub.year.toString() === selectedYear;
      const matchesType = selectedType === "all" || pub.type === selectedType;
      const matchesArea = selectedArea === "all" || pub.area === selectedArea;

      return matchesSearch && matchesYear && matchesType && matchesArea;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        default:
          return 0;
      }
    });

  const totalFiltered = filteredPublications.length;
  const requestedCount =
    resultsPerPage === "all" ? totalFiltered : parseInt(resultsPerPage, 10);
  const safeCount =
    Number.isNaN(requestedCount) || requestedCount <= 0
      ? totalFiltered
      : Math.min(requestedCount, totalFiltered);
  const displayedPublications = filteredPublications.slice(0, safeCount);
  const showingCount = displayedPublications.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-20">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-4">Publications</h1>
              <p className="text-lg text-muted-foreground">
                Peer-reviewed research publications in leading international journals and conferences
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Search and Filters */}
              {loading ? (
                <Card className="mb-8 border border-sky-100 shadow-sm">
                  <CardContent className="p-6 text-center">Loading publications…</CardContent>
                </Card>
              ) : error ? (
                <Card className="mb-8 border border-rose-100 shadow-sm">
                  <CardContent className="p-6 text-center">Error loading publications: {error}</CardContent>
                </Card>
              ) : (
                <Card className="mb-8 border border-sky-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search publications by title, author, or journal..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {/* Filters Row */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="border-sky-100 focus:ring-emerald-200">
                            <SelectValue placeholder="All Years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Years</SelectItem>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger className="border-sky-100 focus:ring-emerald-200">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {types.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={selectedArea} onValueChange={setSelectedArea}>
                          <SelectTrigger className="border-sky-100 focus:ring-emerald-200">
                            <SelectValue placeholder="All Research Areas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            {areas.map((area) => (
                              <SelectItem key={area} value={area}>
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="border-sky-100 focus:ring-emerald-200">
                            <SelectValue placeholder="Sort By" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="year-desc">Year (Newest)</SelectItem>
                            <SelectItem value="year-asc">Year (Oldest)</SelectItem>
                            <SelectItem value="citations-desc">Citations (High-Low)</SelectItem>
                            <SelectItem value="citations-asc">Citations (Low-High)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Results Count */}
                      <div className="text-sm text-muted-foreground">
                        Found <span className="font-semibold text-foreground">{totalFiltered}</span> matching publications
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Publications List */}
              <div className="space-y-6">
                {displayedPublications.map((pub, index) => (
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

                {filteredPublications.length === 0 && (
                  <Card className="border border-emerald-100">
                    <CardContent className="p-12 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
                      <h3 className="text-lg font-semibold mb-2">No publications found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search query
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Footer */}
              <div className="mt-10">
                <Card className="border border-sky-100 shadow-sm bg-slate-50/70">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{showingCount}</span> of <span className="font-semibold text-foreground">{totalFiltered}</span> matching publications
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">Results per page</span>
                        <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
                          <SelectTrigger className="w-32 border-emerald-100 focus:ring-emerald-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="60">60</SelectItem>
                            <SelectItem value="80">80</SelectItem>
                            <SelectItem value="all">All</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Google Scholar Link */}
              <div className="text-center mt-10">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <a href="https://scholar.google.com/citations?user=eTiiXkYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-5 w-5" />
                    View All Publications on Google Scholar
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PublicationsPage;