import { FadeInUp } from "@/components/FadeInUp";
import { services } from "@/data/siteData";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Services = () => (
  <>
    <section className="bg-deep-slate text-light-slate section-padding">
      <div className="container">
        <FadeInUp>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h1>
          <p className="text-light-slate/70 max-w-xl">
            Comprehensive IT solutions designed to help your business thrive in the digital age.
          </p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <div className="group p-8 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-5">
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-deep-slate mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{s.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="text-center mt-16">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Discuss Your Project <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  </>
);

export default Services;
