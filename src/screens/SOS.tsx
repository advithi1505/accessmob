import { useRef, useState } from 'react';
import { useApp } from '@/store';
import Overlay from '@/components/Overlay';
import Button from '@/components/Button';
import { Phone, Share2, X, AlertCircle } from 'lucide-react';

const HOLD_MS = 1500;

export default function SOS() {
  const { go, sosActive, setSosActive } = useApp();
  const [holding, setHolding] = useState(false);
  const [pct, setPct] = useState(0);
  const timer = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const start = useRef(0);

  const beginHold = () => {
    if (sosActive) return;
    setHolding(true);
    start.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start.current;
      const p = Math.min(1, elapsed / HOLD_MS);
      setPct(p);
      if (p >= 1) {
        setSosActive(true);
        setHolding(false);
        setPct(0);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    timer.current = window.setTimeout(() => {}, HOLD_MS);
  };

  const endHold = () => {
    setHolding(false);
    setPct(0);
    if (timer.current) clearTimeout(timer.current);
    if (raf.current) cancelAnimationFrame(raf.current);
  };

  return (
    <div className="screen-enter relative h-full w-full bg-slate-900">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-4">
        <button
          onClick={() => go('home')}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <X size={20} />
        </button>
        <span className="text-sm font-semibold text-white/70">Emergency</span>
      </div>

      {!sosActive ? (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-danger-500/20">
            <AlertCircle size={28} className="text-danger-400" />
          </div>
          <h1 className="text-2xl font-extrabold">Need immediate help?</h1>
          <p className="mt-2 text-sm text-white/60">Press and hold the button below to activate SOS.</p>

          {/* Hold-to-activate button */}
          <div className="relative mt-10">
            <div className="absolute inset-0 animate-sos-pulse rounded-full" />
            <button
              onPointerDown={beginHold}
              onPointerUp={endHold}
              onPointerLeave={endHold}
              aria-label="Hold to activate SOS"
              className="relative flex h-44 w-44 items-center justify-center rounded-full bg-danger-600 text-white shadow-float ring-4 ring-danger-500/40 select-none touch-none"
            >
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46 * (1 - pct)}
                />
              </svg>
              <div className="relative flex flex-col items-center">
                <span className="text-2xl font-extrabold tracking-wider">HOLD</span>
                <span className="text-sm font-bold tracking-widest opacity-80">SOS</span>
              </div>
            </button>
          </div>
          <p className="mt-6 text-xs text-white/50">
            {holding ? `Hold for ${Math.ceil((HOLD_MS * (1 - pct)) / 1000)}s…` : 'Press and hold for 1.5 seconds'}
          </p>

          <div className="mt-10 w-full space-y-3">
            <Button fullWidth variant="danger" onClick={() => setSosActive(true)}>
              <Phone size={18} /> Call Emergency Services
            </Button>
            <Button fullWidth variant="secondary" className="bg-white/10 text-white border-white/20">
              <Phone size={18} /> Call Emergency Contact
            </Button>
            <Button fullWidth variant="secondary" className="bg-white/10 text-white border-white/20">
              <Share2 size={18} /> Share Current Location
            </Button>
          </div>
        </div>
      ) : (
        <Overlay onClose={() => setSosActive(false)}>
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-100">
              <AlertCircle size={32} className="text-danger-600" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-danger-700">SOS ACTIVATED</h2>
          <p className="mt-3 text-center text-sm text-slate-600">
            Your location is being shared with your emergency contact and local services.
          </p>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-400">Current location</p>
            <p className="text-sm font-bold text-slate-900">Tardeo Road, Mumbai</p>
          </div>
          <div className="mt-6 space-y-3">
            <Button fullWidth variant="danger">
              <Phone size={18} /> Call Emergency Services
            </Button>
            <Button fullWidth variant="secondary" onClick={() => setSosActive(false)}>
              Cancel
            </Button>
          </div>
        </Overlay>
      )}
    </div>
  );
}
