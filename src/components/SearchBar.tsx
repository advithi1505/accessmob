import type { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  placeholder: string;
  value?: string;
  onClick?: () => void;
  readOnly?: boolean;
}

export default function SearchBar({ icon, placeholder, value, onClick, readOnly }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left shadow-card ring-1 ring-black/5"
    >
      {icon}
      <span className={`flex-1 truncate text-base ${value ? 'text-slate-900' : 'text-slate-400'}`}>
        {value || placeholder}
      </span>
      {readOnly && <span className="text-primary-500 text-lg">⌕</span>}
    </button>
  );
}
