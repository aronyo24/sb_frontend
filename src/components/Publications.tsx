import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText } from "lucide-react";

const publications = [
  {
    title: "Dynamic Fine-grained SLA Management for 6G eMBB-plus Slice using mDNN & Smart Contracts",
    authors: "Sadaf Bukhari, Kashif Sharif, Liehuang Zhu, Chang Xu, Fan Li, Sujit Biswas",
    journal: "IEEE Transactions on Services Computing",
    year: 2024,
    type: "Journal Article",
    citations: 8,
    url: "https://ieeexplore.ieee.org/abstract/document/10663940/",
  },
  {
    title: "CIC-SIoT: Clean-Slate Information-Centric Software-Defined Content Discovery and Distribution for Internet-of-Things",
    authors: "Md Monjurul Karim, Kashif Sharif, Sujit Biswas, Zohaib Latif, Qiang Qu, Fan Li",
    journal: "IEEE Internet of Things Journal",
    year: 2024,
    type: "Journal Article",
    citations: 12,
    url: "https://ieeexplore.ieee.org/abstract/document/10633277/",
  },
  {
    title: "Globechain: An interoperable blockchain for global sharing of healthcare data—a covid-19 perspective",
    authors: "Sujit Biswas, Kashif Sharif, Fan Li, Anupam Kumar Bairagi, Zohaib Latif, Saraju P Mohanty",
    journal: "IEEE Consumer Electronics Magazine",
    year: 2021,
    type: "Journal Article",
    citations: 67,
    url: "https://ieeexplore.ieee.org/abstract/document/9416228/",
  },
  {
    title: "Enhancing machine learning-based forecasting of chronic renal disease with explainable AI",
    authors: "Sanjana Singamsetty, Swetha Ghanta, Sujit Biswas, Ashok Pradhan",
    journal: "PeerJ Computer Science",
    year: 2024,
    type: "Journal Article",
    url: "https://peerj.com/articles/cs-2291/",
  },
  {
    title: "Interoperability benefits and challenges in smart city services: Blockchain as a solution",
    authors: "Sujit Biswas, Zigang Yao, Lin Yan, Abdulmajeed Alqhatani, Anupam Kumar Bairagi, Fatima Asiri, Mehedi Masud",
    journal: "Electronics",
    year: 2023,
    type: "Journal Article",
    url: "https://www.mdpi.com/2079-9292/12/4/1036",
  },
];

const Publications = () => {
  return (
    <section id="publications" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">Selected Publications</h2>
          <p className="text-lg text-muted-foreground">
            Recent peer-reviewed publications in leading international journals and conferences.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-6">
          {publications.map((pub, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 leading-tight">{pub.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-primary">{pub.journal}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{pub.year}</span>
                        {pub.citations && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <Badge variant="secondary" className="text-xs">
                              {pub.citations} citations
                            </Badge>
                          </>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {pub.type}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" asChild>
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

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-5 w-5" />
              View All Publications on Google Scholar
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Publications;
