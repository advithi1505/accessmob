import { useApp } from '@/store';
import { SAVED_PLACES, PLACES } from '@/data';
import MumbaiMap from '@/components/MumbaiMap';
import TopBar from '@/components/TopBar';
import ScoreBadge from '@/components/ScoreBadge';
import BottomNav from '@/components/BottomNav';

export default function Saved() {
  const { go, setDestination, mode } = useApp();

  return (
    <div className="screen-enter relative h-full w-full overflow-hidden bg-slate-100">
      <div className="absolute inset-0">
        <MumbaiMap mode={mode} highContrast={mode === 'lowvision'} dim />
      </div>

      <div className="absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-slate-900/40 to-transparent">
        <TopBar onBack={() => go('home')} transparent />
      </div>

      <div className="absolute inset-x-0 bottom-0 top-32 z-20 overflow-y-auto rounded-t-3xl bg-white px-5 pb-24 pt-3 shadow-sheet no-scrollbar">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-200" />
        <h1 className="text-xl font-extrabold text-slate-900">Saved Places</h1>
        <p className="mb-4 text-sm text-slate-500">Tap a place to navigate there.</p>

        <div className="space-y-2.5">
          {SAVED_PLACES.map((s) => {
            const place = PLACES.find((p) => p.id === s.placeId)!;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setDestination(place);
                  go('destination');
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm active:scale-[0.99]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-50 text-2xl">
                  {s.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">{s.name}</p>
                  <p className="truncate text-xs text-slate-500">{s.address}</p>
                </div>
                <ScoreBadge score={place.score} size="sm" />
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
