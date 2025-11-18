import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const contactCommitments = [
  {
    title: "Response Window",
    detail: "Email replies within 3 business days for research and supervision enquiries.",
  },
  {
    title: "Collaboration Calls",
    detail: "Virtual office hours scheduled monthly for prospective partners and students.",
  },
  {
    title: "In-Person Meetings",
    detail: "By appointment at Northampton Square campus, City, University of London.",
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 ">
        <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="uppercase tracking-wide text-xs">
                Connect
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Let&apos;s explore how we can work together
              </h1>
              <p className="text-lg text-muted-foreground">
                Reach out for collaborative research, student supervision, guest lectures, or advisory opportunities.
                I look forward to hearing from you.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactCommitments.map((item) => (
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

        <section className="bg-emerald-50">
          <Contact
            showBackground={false}
            className="py-12"
            title="Send a Message"
            description="Complete the form or email directly at sujitsujitbiswas@ieee.org to start the conversation."
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
