import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
  transparent?: boolean;
}

export default function TopBar({ title, onBack, right, transparent }: Props) {
  return (
    <div
      className={`absolute inset-x-0 top-0 z-20 flex items-center gap-3 px-4 pb-2 pt-4 ${
        transparent ? 'bg-gradient-to-b from-black/30 to-transparent' : ''
      }`}
    >
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-card backdrop-blur active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      {title && (
        <h2 className={`flex-1 truncate text-lg font-bold ${transparent ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>
      )}
      {right}
    </div>
  );
}
