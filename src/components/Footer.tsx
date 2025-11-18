import { Mail, Globe, Linkedin, ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950" aria-hidden="true" />
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl text-white font-semibold tracking-tight">Dr. Sujit Biswas</h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Assistant Professor, City, University of London
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400 bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                  >
                    Let&apos;s connect
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href="/MY_CV.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-300 px-5 py-2 text-sm font-medium text-slate-100 transition hover:bg-sky-500/20"
                  >
                    Download CV
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Explore</h4>
                <nav aria-label="Footer Navigation" className="mt-5 grid grid-cols-1 gap-2 text-sm text-slate-400">
                  <Link to="/research" className="group inline-flex items-center gap-2 hover:text-white">
                    Research Areas
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                  <Link to="/publications" className="group inline-flex items-center gap-2 hover:text-white">
                    Publications
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                  <Link to="/projects" className="group inline-flex items-center gap-2 hover:text-white">
                    Projects
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                  <Link to="/teaching" className="group inline-flex items-center gap-2 hover:text-white">
                    Teaching
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                  <Link to="/about" className="group inline-flex items-center gap-2 hover:text-white">
                    About
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </nav>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Connect</h4>
                <ul className="mt-5 space-y-3 text-sm text-slate-400">
                  <li>
                    <a
                      href="mailto:sujitsujitbiswas@ieee.org"
                      className="group flex items-center gap-3 hover:text-white"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Email</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://scholar.google.com/citations?user=eTiiXkYAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 hover:text-white"
                    >
                      <Globe className="h-4 w-4" aria-hidden="true" />
                      <span>Google Scholar</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/sujitedu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 hover:text-white"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© {currentYear} Dr. Sujit Biswas. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
