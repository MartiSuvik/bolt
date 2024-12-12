import { type LucideIcon } from 'lucide-react';

interface NavButtonProps {
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
}

export default function NavButton({ label, Icon, onClick }: NavButtonProps) {
  return (
    <div 
      role="button"
      onClick={onClick}
      className="cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <span>{label}</span>
      <span className="flex items-center justify-center" aria-hidden="true">
        <Icon className="w-5 h-5" />
      </span>
      <svg viewBox="0 0 300 300" aria-hidden="true">
        <g>
          <text fill="currentColor">
            <textPath xlinkHref="#circlePath">{label}</textPath>
          </text>
          <text fill="currentColor">
            <textPath xlinkHref="#circlePath" startOffset="50%">{label}</textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}