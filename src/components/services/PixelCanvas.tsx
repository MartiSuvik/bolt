import { useEffect, useRef } from 'react';

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSize: number;
  delay: number;
  counter: number;
  isIdle: boolean;
  isReverse: boolean;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = Math.random() * 0.2 + 0.1;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSize = Math.random() * 1.5 + 0.5;
    this.delay = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)) * 0.01;
    this.counter = 0;
    this.isIdle = false;
    this.isReverse = false;
  }

  draw() {
    const centerOffset = 2 * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  animate() {
    if (this.counter <= this.delay) {
      this.counter += 1;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }
}

interface PixelCanvasProps {
  colors: string[];
  gap?: number;
}

export function PixelCanvas({ colors, gap = 6 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      pixelsRef.current = [];
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          pixelsRef.current.push(new Pixel(canvas, ctx, x, y, color));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pixelsRef.current.forEach(pixel => pixel.animate());
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, gap]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />
  );
}