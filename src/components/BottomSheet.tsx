import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  children: ReactNode;
  maxHeight?: string;
}

export default function BottomSheet({ open, children, maxHeight = '70%' }: Props) {
  if (!open) return null;
  return (
    <div
      className="animate-slide-up absolute inset-x-0 bottom-0 z-30 rounded-t-3xl bg-white shadow-sheet"
      style={{ maxHeight }}
    >
      <div className="flex justify-center pt-3">
        <div className="h-1.5 w-12 rounded-full bg-slate-200" />
      </div>
      <div className="no-scrollbar overflow-y-auto px-5 pb-8 pt-3">{children}</div>
    </div>
  );
}
