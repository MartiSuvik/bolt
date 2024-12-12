import { useEffect, useRef } from 'react';

interface GlowingBorderProps {
  color: string;
  blur?: number;
  opacity?: number;
  children: React.ReactNode;
}

export default function GlowingBorder({ 
  color, 
  blur = 20,
  opacity = 0.5,
  children 
}: GlowingBorderProps) {
  const borderRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const border = borderRef.current;
    const glow = glowRef.current;
    if (!border || !glow) return;

    let start = 0;
    const duration = 3000; // 3 seconds per rotation

    const updateGlowPosition = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % duration) / duration;
      const angle = progress * 2 * Math.PI;
      
      const rect = border.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      
      requestAnimationFrame(updateGlowPosition);
    };

    let animationFrame: number;
    
    const handleMouseEnter = () => {
      start = 0;
      animationFrame = requestAnimationFrame(updateGlowPosition);
    };

    const handleMouseLeave = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      glow.style.opacity = '0';
    };

    border.addEventListener('mouseenter', handleMouseEnter);
    border.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      border.removeEventListener('mouseenter', handleMouseEnter);
      border.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div 
      ref={borderRef}
      className="relative w-full h-full"
    >
      {children}
      <div
        ref={glowRef}
        className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </div>
  );
}