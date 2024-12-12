import { LucideIcon } from 'lucide-react';
import { PixelCanvas } from './PixelCanvas';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colors: string[];
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, colors, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden aspect-[4/5]",
        "bg-[#101012] border border-[#27272a]",
        "group hover:border-purple-500/50 transition-all duration-500",
        "cursor-pointer",
        className
      )}
    >
      <PixelCanvas colors={colors} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 gap-4">
        <div className="p-4 rounded-full bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
          <Icon className="w-8 h-8 text-purple-200" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}