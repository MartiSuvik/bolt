import { useEffect, useRef } from 'react';

interface PixelProps {
  colors: string[];
  gap?: number;
  speed?: number;
}

class Pixel {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;
  private speed: number;
  private size: number;
  private sizeStep: number;
  private minSize: number;
  private maxSize: number;
  private delay: number;
  private counter: number;
  private counterStep: number;
  public isIdle: boolean;
  private isReverse: boolean;
  private isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSize = this.getRandomValue(this.minSize, 2);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  private getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private draw(): void {
    const centerOffset = 1 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear(): void {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear(): void {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    
    this.size -= 0.1;
    this.draw();
  }

  private shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

export default function PixelCanvas({ colors, gap = 5, speed = 35 }: PixelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(performance.now());
  const intervalRef = useRef<number>(1000 / 60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const getDistanceToCenter = (x: number, y: number): number => {
      const dx = x - canvas.width / 2;
      const dy = y - canvas.height / 2;
      return Math.sqrt(dx * dx + dy * dy);
    };

    pixelsRef.current = [];
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = getDistanceToCenter(x, y);
        pixelsRef.current.push(new Pixel(canvas, ctx, x, y, color, speed * 0.001, delay));
      }
    }

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const timeNow = performance.now();
      const timePassed = timeNow - timeRef.current;

      if (timePassed < intervalRef.current) return;

      timeRef.current = timeNow - (timePassed % intervalRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const pixel of pixelsRef.current) {
        pixel.appear();
      }
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      pixelsRef.current = [];
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const delay = getDistanceToCenter(x, y);
          pixelsRef.current.push(new Pixel(canvas, ctx, x, y, color, speed * 0.001, delay));
        }
      }
    });

    resizeObserver.observe(canvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [colors, gap, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
      style={{ opacity: 0.6 }}
    />
  );
}