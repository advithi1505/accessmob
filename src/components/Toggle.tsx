interface Props {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

export default function Toggle({ on, onChange, label }: Props) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`relative h-7 w-12 rounded-full transition-colors ${on ? 'bg-primary-600' : 'bg-slate-300'}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
          on ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  );
}
