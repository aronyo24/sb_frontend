import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Globe, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type AboutProps = {
  showBackground?: boolean;
  className?: string;
  title?: string;
  description?: string;
};

const About = ({
  showBackground = true,
  className,
  title = "About Me",
  description = "Academic background and professional journey",
}: AboutProps) => {
  return (
    <section
      id="about"
      className={cn(showBackground ? "bg-secondary/30" : "bg-transparent", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                  I hold the position of <span className="font-semibold text-primary">Assistant Professor</span> in the Department of Computer Science at the City University of London. My professional focus encompasses both teaching and research, with a dedicated commitment to contributing to the academic pursuits of the School of Science and Technology.
                </p>
                <p className="text-lg leading-relaxed text-foreground/90">
                  My research interests span multiple domains including <span className="font-medium">cybersecurity</span>, <span className="font-medium">blockchain technology</span>, <span className="font-medium">FinTech</span>, <span className="font-medium">IoT security</span>, and <span className="font-medium">machine learning applications</span>. I am particularly interested in developing innovative security solutions for next-generation networks and distributed systems.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Education</h3>
                    <p className="text-muted-foreground text-sm">
                      PhD in Computer Science with specialization in distributed systems and security
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Recognition</h3>
                    <p className="text-muted-foreground text-sm">
                      Multiple peer-reviewed publications in top-tier journals and conferences
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Collaborations</h3>
                    <p className="text-muted-foreground text-sm">
                      International research partnerships with leading institutions and industry
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Professional Service</h3>
                    <p className="text-muted-foreground text-sm">
                      Reviewer for international journals and conference program committees
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
