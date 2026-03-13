import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/FadeInUp";
import { Section } from "@/components/Section";
import { services, technologies, testimonials, stats, industries } from "@/data/siteData";
import { ArrowRight, CheckCircle, Quote } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep-slate text-light-slate">
        <div className="absolute inset-0 opacity-30">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container py-24 md:py-36">
          <div className="max-w-2xl">
            <FadeInUp>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-6">
                Enterprise IT Solutions
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Transform Your Business with{" "}
                <span className="text-gradient">Intelligent Technology</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg text-light-slate/70 mb-8 max-w-lg">
                We build scalable web applications, AI solutions, and digital experiences that drive real business growth.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div className="text-center">
                  <s.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-deep-slate">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Section title="Our Services" subtitle="End-to-end technology solutions tailored for your business needs.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-deep-slate mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* Technologies */}
      <Section title="Technologies We Use" subtitle="We leverage the latest technologies to build robust solutions." alt>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((t, i) => (
            <FadeInUp key={i} delay={i * 0.03}>
              <span className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-deep-slate hover:border-primary/30 transition-colors">
                {t}
              </span>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Syntax IT Solution" subtitle="We combine technical expertise with a commitment to your success.">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Expert Team", desc: "Seasoned engineers and architects with deep domain expertise." },
            { title: "Agile Delivery", desc: "Iterative development with transparent timelines and milestones." },
            { title: "24/7 Support", desc: "Dedicated support team ensuring your systems run flawlessly." },
          ].map((item, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-deep-slate mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section title="Industries We Serve" subtitle="Delivering solutions across diverse industry verticals." alt>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <div className="text-center p-4 rounded-lg border border-border bg-card">
                <span className="font-medium text-deep-slate">{ind}</span>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section title="What Our Clients Say" subtitle="Trusted by leading companies worldwide.">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-border bg-card">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4 leading-relaxed">{t.text}</p>
                <div>
                  <div className="font-semibold text-deep-slate">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="gradient-primary section-padding">
        <div className="container text-center">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Let's discuss how we can help you achieve your technology goals.
            </p>
            <Button variant="hero-outline" size="lg" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">Get in Touch <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </FadeInUp>
        </div>
      </section>
    </>
  );
};

export default Index;
