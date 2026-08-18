import { useApp } from '@/store';
import MumbaiMap from '@/components/MumbaiMap';
import BottomSheet from '@/components/BottomSheet';
import TopBar from '@/components/TopBar';
import Button from '@/components/Button';
import { Check, AlertTriangle, Star, Zap, Eye, Navigation } from 'lucide-react';

type RouteId = 'accessible' | 'fastest' | 'clear';

const ROUTE_META: Record<
  RouteId,
  { title: string; emoji: string; color: string; time: string; dist: string; tag: string; badge?: string }
> = {
  accessible: {
    title: 'Most Accessible',
    emoji: '⭐',
    color: 'accessible',
    time: '12 min',
    dist: '2.1 km',
    tag: 'No stairs · Ramp available · Smooth sidewalk',
    badge: 'Recommended for you',
  },
  fastest: {
    title: 'Fastest',
    emoji: '⚡',
    color: 'primary',
    time: '9 min',
    dist: '1.8 km',
    tag: 'Stairs · Uneven sidewalk',
  },
  clear: {
    title: 'Clear Route',
    emoji: '👁',
    color: 'warning',
    time: '14 min',
    dist: '2.4 km',
    tag: 'Fewer obstacles · Clear crossings · Better visibility',
  },
};

export default function Routes() {
  const { destination, selectedRoute, setSelectedRoute, go, mode } = useApp();
  if (!destination) return null;

  return (
    <div className="screen-enter relative h-full w-full overflow-hidden bg-slate-100">
      <div className="absolute inset-0">
        <MumbaiMap
          mode={mode}
          destinationId={destination.id}
          route={selectedRoute}
          highContrast={mode === 'lowvision'}
        />
      </div>

      <TopBar onBack={() => go('destination')} transparent />

      {/* Route legend */}
      <div className="absolute right-4 top-16 z-10 space-y-1.5 rounded-2xl bg-white/95 p-3 shadow-card backdrop-blur">
        {(['accessible', 'fastest', 'clear'] as RouteId[]).map((r) => (
          <div key={r} className="flex items-center gap-2 text-xs font-semibold">
            <span
              className="h-1 w-5 rounded-full"
              style={{
                background:
                  r === 'accessible' ? '#10b981' : r === 'fastest' ? '#4f46e5' : '#f59e0b',
              }}
            />
            <span className="text-slate-600">{ROUTE_META[r].title}</span>
          </div>
        ))}
      </div>

      <BottomSheet open maxHeight="68%">
        <h2 className="mb-1 text-xl font-extrabold text-slate-900">Choose your route</h2>
        <p className="mb-3 text-xs text-slate-500">to {destination.name}</p>

        <div className="space-y-2.5">
          {(['accessible', 'fastest', 'clear'] as RouteId[]).map((id) => {
            const meta = ROUTE_META[id];
            const selected = selectedRoute === id;
            const isAccessible = id === 'accessible';
            const isFastest = id === 'fastest';
            return (
              <button
                key={id}
                onClick={() => setSelectedRoute(id)}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.99] ${
                  selected ? 'border-primary-600 bg-primary-50 shadow-card' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{meta.emoji}</span>
                    <span className="text-base font-extrabold uppercase tracking-wide text-slate-900">
                      {meta.title}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{meta.time}</p>
                    <p className="text-xs text-slate-500">{meta.dist}</p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {isAccessible && (
                    <>
                      <Pill ok>No stairs</Pill>
                      <Pill ok>Ramp available</Pill>
                      <Pill ok>Smooth sidewalk</Pill>
                    </>
                  )}
                  {isFastest && (
                    <>
                      <Pill>Stairs</Pill>
                      <Pill>Uneven sidewalk</Pill>
                    </>
                  )}
                  {!isAccessible && !isFastest && (
                    <>
                      <Pill ok>Fewer obstacles</Pill>
                      <Pill ok>Clear crossings</Pill>
                      <Pill ok>Better visibility</Pill>
                    </>
                  )}
                </div>

                {meta.badge && (
                  <p className="mt-2 text-xs font-bold text-accessible-700">✓ {meta.badge}</p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <Button fullWidth onClick={() => go('navigation')} className="text-lg">
            <Navigation size={18} /> Start Route
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}

function Pill({ children, ok }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        ok ? 'bg-accessible-100 text-accessible-700' : 'bg-danger-100 text-danger-700'
      }`}
    >
      {ok ? <Check size={11} strokeWidth={3} /> : <AlertTriangle size={11} strokeWidth={3} />}
      {children}
    </span>
  );
}
