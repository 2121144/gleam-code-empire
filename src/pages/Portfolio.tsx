import { FadeInUp } from "@/components/FadeInUp";
import { portfolioProjects } from "@/data/siteData";
import { Badge } from "@/components/ui/badge";

const Portfolio = () => (
  <>
    <section className="bg-deep-slate text-light-slate section-padding">
      <div className="container">
        <FadeInUp>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-light-slate/70 max-w-xl">
            A showcase of projects we've delivered across industries.
          </p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((p, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 gradient-primary flex items-center justify-center">
                  <span className="font-display font-bold text-2xl text-primary-foreground opacity-50">{p.title[0]}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-secondary uppercase">{p.category}</span>
                  <h3 className="font-display font-semibold text-lg text-deep-slate mt-1 mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs bg-primary/5 text-primary border-0">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Portfolio;
