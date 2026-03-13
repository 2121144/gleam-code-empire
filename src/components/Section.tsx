import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export function Section({ title, subtitle, children, className = "", alt }: Props) {
  return (
    <section className={`section-padding ${alt ? "section-alt" : ""} ${className}`}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-slate mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground leading-relaxed">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
