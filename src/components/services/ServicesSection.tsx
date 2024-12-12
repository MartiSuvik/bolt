import { Bot, Mail, Settings2, Share2 } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

const services = [
  {
    title: "Social Media Automation",
    description: "Automated post creator and designer with upload feature",
    icon: Share2,
    colors: ['#e0f2fe', '#7dd3fc', '#0ea5e9']
  },
  {
    title: "AI Chatbot",
    description: "Lead generation, product recommendation, and appointment booking",
    icon: Bot,
    colors: ['#fef08a', '#fde047', '#eab308']
  },
  {
    title: "Email Marketing",
    description: "Send 2500 targeted, personalized emails daily with unused lead pool",
    icon: Mail,
    colors: ['#f5d0fe', '#e879f9', '#d946ef']
  },
  {
    title: "Custom Automation",
    description: "Tailored automation solutions for your specific needs",
    icon: Settings2,
    colors: ['#fecdd3', '#fda4af', '#e11d48']
  }
];

export function ServicesSection() {
  return (
    <section className="min-h-screen py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            {...service}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
    </section>
  );
}