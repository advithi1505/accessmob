import { useApp } from '@/store';
import MumbaiMap from '@/components/MumbaiMap';
import TopBar from '@/components/TopBar';
import Button from '@/components/Button';
import ScoreBadge from '@/components/ScoreBadge';
import { Check, AlertTriangle, Eye } from 'lucide-react';

export default function Details() {
  const { destination, go, mode } = useApp();
  if (!destination) return null;

  const conditions = [...destination.tags, 'Smooth sidewalk'];
  const warnings = ['Construction 200 m ahead'];
  const lowVision = ['High contrast route', 'Voice guidance', 'Clear crossings'];
  const lowVisionWarn = ['Busy intersection ahead'];

  return (
    <div className="screen-enter flex h-full w-full flex-col bg-white">
      <div className="relative h-56 w-full shrink-0 overflow-hidden">
        <MumbaiMap mode={mode} destinationId={destination.id} route="accessible" highContrast={mode === 'lowvision'} />
        <TopBar onBack={() => go('routes')} transparent />
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8 pt-4">
        <h1 className="text-lg font-extrabold text-slate-900">Accessibility Score</h1>
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-accessible-50 p-4">
          <ScoreBadge score={destination.score} size="lg" />
          <div>
            <p className="text-sm font-bold text-accessible-800">Highly Accessible</p>
            <p className="text-xs text-accessible-700">Based on route & destination</p>
          </div>
        </div>

        <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-400">Route Conditions</h2>
        <div className="mt-2 space-y-2">
          {conditions.map((c) => (
            <Row key={c} ok text={c} />
          ))}
          {warnings.map((w) => (
            <Row key={w} warn text={w} />
          ))}
        </div>

        {mode === 'lowvision' && (
          <>
            <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-primary-600">
              <Eye size={14} className="mr-1 inline" /> Low Vision
            </h2>
            <div className="mt-2 space-y-2">
              {lowVision.map((c) => (
                <Row key={c} ok text={c} />
              ))}
              {lowVisionWarn.map((w) => (
                <Row key={w} warn text={w} />
              ))}
            </div>
          </>
        )}

        <div className="mt-7">
          <Button fullWidth variant="secondary" onClick={() => go('report')}>
            <AlertTriangle size={18} /> Report outdated information
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ ok, warn, text }: { ok?: boolean; warn?: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${
          ok ? 'bg-accessible-500' : 'bg-warning-500'
        }`}
      >
        {ok ? <Check size={14} strokeWidth={3} /> : <AlertTriangle size={13} strokeWidth={3} />}
      </span>
      <span className={`text-sm font-medium ${warn ? 'text-warning-800' : 'text-slate-700'}`}>{text}</span>
    </div>
  );
}
