import { FadeInUp } from "@/components/FadeInUp";
import { Section } from "@/components/Section";
import { CheckCircle, Target, Eye } from "lucide-react";

const About = () => (
  <>
    <section className="bg-deep-slate text-light-slate section-padding">
      <div className="container">
        <FadeInUp>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Building the Future of Technology</h1>
          <p className="text-light-slate/70 max-w-xl">
            Syntax IT Solution is a global technology company specializing in web development, AI, mobile apps, and digital transformation.
          </p>
        </FadeInUp>
      </div>
    </section>

    <Section title="Our Story" subtitle="Founded with a vision to make enterprise-grade technology accessible to businesses of all sizes.">
      <div className="max-w-3xl mx-auto text-muted-foreground leading-relaxed space-y-4">
        <p>
          Since our founding, Syntax IT Solution has grown into a trusted technology partner for over 200 clients worldwide. 
          We combine deep technical expertise with a business-first mindset to deliver solutions that create real impact.
        </p>
        <p>
          Our team of engineers, designers, and strategists works across web, mobile, AI, and cloud technologies 
          to help businesses scale, automate, and innovate.
        </p>
      </div>
    </Section>

    <Section title="Mission & Vision" alt>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[
          { icon: Target, title: "Our Mission", text: "To empower businesses with innovative, reliable, and scalable technology solutions that drive growth and efficiency." },
          { icon: Eye, title: "Our Vision", text: "To be a global leader in IT services, recognized for our technical excellence, innovation, and commitment to client success." },
        ].map((item, i) => (
          <FadeInUp key={i} delay={i * 0.1}>
            <div className="p-8 rounded-xl border border-border bg-card">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-xl text-deep-slate mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          </FadeInUp>
        ))}
      </div>
    </Section>

    <Section title="Core Values">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {["Innovation", "Integrity", "Excellence", "Collaboration"].map((v, i) => (
          <FadeInUp key={i} delay={i * 0.1}>
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
              <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
              <span className="font-semibold text-deep-slate">{v}</span>
            </div>
          </FadeInUp>
        ))}
      </div>
    </Section>
  </>
);

export default About;
