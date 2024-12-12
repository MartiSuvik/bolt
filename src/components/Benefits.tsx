import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const benefits = [
  {
    title: "Increased Efficiency",
    description: "Automate repetitive tasks and save countless hours",
    side: "left"
  },
  {
    title: "24/7 Operation",
    description: "Your automation works while you sleep",
    side: "right"
  },
  {
    title: "Scalable Growth",
    description: "Handle increasing workload without adding overhead",
    side: "left"
  },
  {
    title: "Cost Reduction",
    description: "Minimize operational costs through automation",
    side: "right"
  }
];

export function Benefits() {
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = benefitsRef.current?.querySelectorAll('.benefit-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={benefitsRef} className="max-w-7xl mx-auto py-20">
      {benefits.map((benefit, index) => (
        <div
          key={benefit.title}
          className={cn(
            "benefit-item opacity-0 flex items-center mb-20",
            "transform translate-x-[-100px]",
            benefit.side === 'right' ? 'flex-row-reverse' : ''
          )}
        >
          <div className={cn(
            "w-1/2 p-8",
            benefit.side === 'right' ? 'text-right' : 'text-left'
          )}>
            <h3 className="text-3xl font-bold mb-4">{benefit.title}</h3>
            <p className="text-gray-400 text-lg">{benefit.description}</p>
          </div>
          <div className="w-1/2" />
        </div>
      ))}
    </div>
  );
}