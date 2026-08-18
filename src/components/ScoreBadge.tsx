interface Props {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: Props) {
  const color =
    score >= 90
      ? 'bg-accessible-100 text-accessible-700'
      : score >= 75
        ? 'bg-warning-100 text-warning-700'
        : 'bg-danger-100 text-danger-700';

  const sizing = size === 'lg' ? 'text-3xl px-4 py-2' : size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold ${color} ${sizing}`}>
      {score}
      <span className={size === 'lg' ? 'text-base font-medium opacity-70' : 'opacity-70'}>/100</span>
    </span>
  );
}
