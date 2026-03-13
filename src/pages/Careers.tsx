import { FadeInUp } from "@/components/FadeInUp";
import { careers } from "@/data/siteData";
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => (
  <>
    <section className="bg-deep-slate text-light-slate section-padding">
      <div className="container">
        <FadeInUp>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">Careers</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-light-slate/70 max-w-xl">
            Help us build the future of technology. We're always looking for talented people.
          </p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding">
      <div className="container max-w-3xl">
        <div className="space-y-6">
          {careers.map((c, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-deep-slate">{c.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{c.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{c.description}</p>
                  </div>
                  <Button variant="outline" className="shrink-0">Apply Now</Button>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Careers;
