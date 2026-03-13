import { FadeInUp } from "@/components/FadeInUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="bg-deep-slate text-light-slate section-padding">
        <div className="container">
          <FadeInUp>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-light-slate/70 max-w-xl">
              Ready to start your project? We'd love to hear from you.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <FadeInUp>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-deep-slate mb-1.5 block">Name</label>
                    <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-deep-slate mb-1.5 block">Email</label>
                    <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-deep-slate mb-1.5 block">Subject</label>
                  <Input placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-deep-slate mb-1.5 block">Message</label>
                  <Textarea placeholder="Tell us about your project..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" variant="hero" size="lg">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </FadeInUp>

            {/* Contact Info */}
            <FadeInUp delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-deep-slate mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-deep-slate">Phone</div>
                        <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-deep-slate">Email</div>
                        <a href="mailto:info@syntaxitsolution.com" className="text-muted-foreground hover:text-primary transition-colors">info@syntaxitsolution.com</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-deep-slate">Address</div>
                        <p className="text-muted-foreground">123 Tech Avenue, Silicon Valley, CA 94025</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-border h-64">
                  <iframe
                    title="Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.20117753788!2d-122.11518864363824!3d37.39302829698018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1709800000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
