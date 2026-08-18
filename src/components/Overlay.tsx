import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClose?: () => void;
}

export default function Overlay({ children, onClose }: Props) {
  return (
    <div className="animate-fade-in absolute inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <div className="animate-slide-up relative z-10 w-full rounded-t-3xl bg-white p-6 pb-8 shadow-sheet">
        {children}
      </div>
    </div>
  );
}
