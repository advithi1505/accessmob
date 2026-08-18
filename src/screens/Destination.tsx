import { useApp } from '@/store';
import MumbaiMap from '@/components/MumbaiMap';
import BottomSheet from '@/components/BottomSheet';
import TopBar from '@/components/TopBar';
import Button from '@/components/Button';
import ScoreBadge from '@/components/ScoreBadge';
import { Check, AlertTriangle, Navigation, Eye } from 'lucide-react';

export default function Destination() {
  const { destination, go, mode } = useApp();
  if (!destination) return null;

  return (
    <div className="screen-enter relative h-full w-full overflow-hidden bg-slate-100">
      <div className="absolute inset-0">
        <MumbaiMap mode={mode} destinationId={destination.id} highContrast={mode === 'lowvision'} dim />
      </div>

      <TopBar onBack={() => go('search')} transparent />

      <BottomSheet open maxHeight="72%">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {destination.area} · {destination.distanceKm} km
            </p>
            <h2 className="text-xl font-extrabold text-slate-900">{destination.name}</h2>
          </div>
          <span className="text-3xl">{destination.emoji}</span>
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-accessible-50 p-4">
          <ScoreBadge score={destination.score} size="lg" />
          <div>
            <p className="text-sm font-bold text-accessible-800">Highly Accessible</p>
            <p className="text-xs text-accessible-700">Accessibility Score</p>
          </div>
        </div>

        <div className="space-y-2">
          {destination.tags.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accessible-500 text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-slate-700">{t}</span>
            </div>
          ))}
          {destination.warnings.map((w) => (
            <div key={w} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning-500 text-white">
                <AlertTriangle size={13} strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-warning-800">{w}</span>
            </div>
          ))}
        </div>

        {mode === 'lowvision' && (
          <div className="mt-4 rounded-2xl bg-primary-50 p-3">
            <div className="flex items-center gap-2 text-primary-700">
              <Eye size={16} />
              <p className="text-sm font-semibold">Low-vision route available</p>
            </div>
            <p className="mt-1 text-xs text-primary-700">High-contrast route · Voice navigation</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => go('details')}>
            View Accessibility
          </Button>
          <Button fullWidth onClick={() => go('routes')} className="flex-1">
            <Navigation size={18} /> Find Route
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
