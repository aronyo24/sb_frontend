import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Globe, Linkedin, Github, CheckCircle } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { apiClient } from "@/api/apiClient";
import { cn } from "@/lib/utils";

type ContactProps = {
  showBackground?: boolean;
  className?: string;
  title?: string;
  description?: string;
};

const Contact = ({
  showBackground = true,
  className,
  title = "Get in Touch",
  description = "Feel free to reach out for research collaborations, academic inquiries, or supervision opportunities.",
}: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const updateField = (
    field: keyof typeof formData,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === "success") {
      setStatus("idle");
    }
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    // send to backend API
    apiClient
      .post("messages/", formData)
      .then((res) => {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("Failed to send message:", err);
        // keep form data so user can retry; consider showing an error toast
        setStatus("idle");
      });
  };

  return (
    <section
      id="contact"
      className={cn(showBackground ? "bg-background" : "bg-transparent", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border border-emerald-100 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:sujitsujitbiswas@ieee.org"
                      className="text-emerald-700 hover:text-emerald-600 font-medium transition-colors"
                    >
                      sujitbiswas@ieee.org
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      I typically respond within two business days to collaboration and inquiry requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-sky-100 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Collaboration</h3>
                    <p className="text-sm text-muted-foreground">
                      Open to research partnerships, graduate supervision, and speaking engagements worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Professional Links</h3>
                <div className="space-y-3">
                  <a
                    href="https://scholar.google.com/citations?user=eTiiXkYAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-md border border-transparent bg-slate-50 px-4 py-3 text-muted-foreground transition-colors hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Globe className="h-5 w-5" />
                    <span>Google Scholar</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sujitedu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-md border border-transparent bg-slate-50 px-4 py-3 text-muted-foreground transition-colors hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/sujitedu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-md border border-transparent bg-slate-50 px-4 py-3 text-muted-foreground transition-colors hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "success" && (
                  <div className="flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4">
                    <CheckCircle className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                    <div className="text-sm text-emerald-700">
                      Thank you for your message! I&apos;ll get back to you soon.
                    </div>
                  </div>
                )}
                

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={updateField("name")}
                    required
                    
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={updateField("email")}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={updateField("subject")}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={6}
                    value={formData.message}
                    onChange={updateField("message")}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
