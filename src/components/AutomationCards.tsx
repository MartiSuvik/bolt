import { useState } from 'react';
import { MessageSquareMore, Mail, Share2, Cog } from 'lucide-react';
import PixelCanvas from './PixelCanvas';
import GlowingBorder from './GlowingBorder';
import ServiceModal from './ServiceModal';

const services = [
  {
    title: 'Social Media Automation',
    icon: Share2,
    colors: ['#e0f2fe', '#7dd3fc', '#0ea5e9'],
    glowColor: '#0ea5e9',
    gap: 6,
    speed: 25,
    summary: 'Streamline your social media presence with intelligent automation tools that handle posting, engagement, and analytics.',
    possibilities: [
      'Automated content scheduling across platforms',
      'Smart engagement with followers',
      'Analytics and performance tracking',
      'Content curation and suggestion'
    ],
    benefits: [
      'Save 15+ hours per week on social media management',
      'Increase engagement by up to 300%',
      'Maintain consistent posting schedule',
      'Reach wider audience through optimal posting times'
    ],
    deliveryTime: '2-3 weeks for full implementation and training'
  },
  {
    title: 'Chatbot',
    icon: MessageSquareMore,
    colors: ['#fef08a', '#fde047', '#eab308'],
    glowColor: '#eab308',
    gap: 3,
    speed: 20,
    summary: 'Deploy AI-powered chatbots that handle customer inquiries 24/7, improving response times and customer satisfaction.',
    possibilities: [
      'Natural language processing for human-like interactions',
      'Multi-language support',
      'Integration with existing systems',
      'Custom workflow automation'
    ],
    benefits: [
      'Reduce customer service costs by up to 30%',
      '24/7 availability for customer support',
      'Instant response to common queries',
      'Scalable solution for growing businesses'
    ],
    deliveryTime: '4-6 weeks including training and optimization'
  },
  {
    title: 'Email Marketing',
    icon: Mail,
    colors: ['#fecdd3', '#fda4af', '#e11d48'],
    glowColor: '#e11d48',
    gap: 6,
    speed: 80,
    summary: 'Automate your email marketing campaigns with personalized content, smart segmentation, and behavior-based triggers.',
    possibilities: [
      'Automated email sequences',
      'Dynamic content personalization',
      'A/B testing automation',
      'Behavioral trigger emails'
    ],
    benefits: [
      'Increase open rates by up to 50%',
      'Improve click-through rates',
      'Better customer segmentation',
      'Higher conversion rates'
    ],
    deliveryTime: '3-4 weeks for setup and initial campaigns'
  },
  {
    title: 'Custom Automation',
    icon: Cog,
    colors: ['#d1fae5', '#6ee7b7', '#059669'],
    glowColor: '#059669',
    gap: 10,
    speed: 25,
    summary: 'Create custom automation solutions tailored to your specific business needs and workflows.',
    possibilities: [
      'Custom workflow automation',
      'System integration',
      'Process optimization',
      'Data automation and reporting'
    ],
    benefits: [
      'Streamline complex business processes',
      'Reduce manual work by up to 80%',
      'Minimize human error',
      'Improve operational efficiency'
    ],
    deliveryTime: '6-8 weeks depending on complexity'
  }
];

export default function AutomationCards() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 py-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <button
              key={index}
              onClick={() => setSelectedService(service)}
              className="group relative overflow-hidden aspect-[4/5] rounded-xl border border-gray-800 hover:border-[var(--active-color)] transition-colors duration-300 bg-gray-900/50"
              style={{ '--active-color': service.colors[0] } as React.CSSProperties}
            >
              <GlowingBorder color={service.glowColor}>
                <PixelCanvas
                  colors={service.colors}
                  gap={service.gap}
                  speed={service.speed}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <Icon className="w-12 h-12 mb-4 text-gray-400 transition-all duration-300 group-hover:text-[var(--active-color)] group-hover:scale-110" />
                  <h3 className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
              </GlowingBorder>
            </button>
          );
        })}
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}