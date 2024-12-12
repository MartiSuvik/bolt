import { Bot, BrainCircuit, Sparkles, Zap, Target, Shield, Clock } from 'lucide-react';
import '../styles/carousel.css';

interface CarouselSlide {
  icon: typeof Bot;
  title: string;
}

const slides: CarouselSlide[] = [
  { icon: Sparkles, title: 'Smart Automation' },
  { icon: Bot, title: 'AI Integration' },
  { icon: BrainCircuit, title: 'Custom Solutions' },
  { icon: Zap, title: 'Fast Processing' },
  { icon: Target, title: 'Precision Focus' },
  { icon: Shield, title: 'Secure Systems' },
  { icon: Clock, title: '24/7 Operation' }
];

export default function ScrollCarousel() {
  return (
    <div className="scrollsnap-carousel">
      {slides.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div key={index} className="slide">
            <div className="content">
              <div className="content-wrapper">
                <Icon className="w-12 h-12 mb-4 text-blue-900" strokeWidth={1.5} />
                <h3>{slide.title}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}