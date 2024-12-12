import { LucideIcon } from 'lucide-react';
import { PixelCanvas } from './PixelCanvas';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden aspect-[4/5] p-6",
        "bg-[#101012] border border-[#27272a]",
        "group hover:border-purple-500/50 transition-colors duration-500",
        className
      )}
    >
      <PixelCanvas />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-4">
        <div className="p-4 rounded-full bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}