import { useEffect, useRef } from 'react';
import '../styles/button.css';

interface GooeyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function GooeyButton({ children, onClick }: GooeyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const moveBg = (e: PointerEvent) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--x', ((e.clientX - rect.x) / rect.width * 100).toString());
      button.style.setProperty('--y', ((e.clientY - rect.y) / rect.height * 100).toString());
    };

    const intro = () => {
      let i = 4;
      button.style.setProperty("--a", '100%');
      
      const interval = setInterval(() => {
        button.style.setProperty("--x", (((Math.cos(i) + 2) / 3.6) * 100).toString());
        button.style.setProperty("--y", (((Math.sin(i) + 2) / 3.6) * 100).toString());
        i += 0.03;
        
        if (i > 11.5) {
          clearInterval(interval);
          button.style.setProperty("--a", '');
        }
      }, 16);

      return interval;
    };

    const interval = intro();
    button.addEventListener('pointermove', moveBg);
    button.addEventListener('pointerover', () => {
      clearInterval(interval);
      button.style.setProperty("--a", '');
    });

    return () => {
      button.removeEventListener('pointermove', moveBg);
      clearInterval(interval);
    };
  }, []);

  return (
    <button ref={buttonRef} className="gooey-button" onClick={onClick}>
      {children}
    </button>
  );
}