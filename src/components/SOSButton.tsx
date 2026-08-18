import { useApp } from '@/store';

export default function SOSButton() {
  const { go } = useApp();
  return (
    <button
      onClick={() => go('sos')}
      aria-label="SOS emergency"
      className="animate-sos-pulse flex h-16 w-16 items-center justify-center rounded-full bg-danger-600 text-white shadow-float ring-4 ring-danger-600/30 transition active:scale-95"
    >
      <span className="text-lg font-extrabold tracking-wider">SOS</span>
    </button>
  );
}
