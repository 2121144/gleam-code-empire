import { FadeInUp } from "@/components/FadeInUp";
import { blogPosts } from "@/data/siteData";
import { ArrowRight } from "lucide-react";

const Blog = () => (
  <>
    <section className="bg-deep-slate text-light-slate section-padding">
      <div className="container">
        <FadeInUp>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Articles</h1>
          <p className="text-light-slate/70 max-w-xl">
            Stay updated with the latest in technology, development, and digital strategy.
          </p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((p, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <article className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 section-alt flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/10">{p.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-secondary">{p.category}</span>
                    <span className="text-xs text-muted-foreground">· {p.date}</span>
                  </div>
                  <h3 className="font-display font-semibold text-deep-slate mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.excerpt}</p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Blog;
