import { useApp } from '@/store';
import MumbaiMap from '@/components/MumbaiMap';
import SearchBar from '@/components/SearchBar';
import BottomNav from '@/components/BottomNav';
import SOSButton from '@/components/SOSButton';
import { Search, Bell, User, AlertTriangle, MapPin } from 'lucide-react';

export default function Home() {
  const { go, mode } = useApp();

  return (
    <div className="screen-enter relative h-full w-full overflow-hidden bg-slate-100">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <MumbaiMap mode={mode} highContrast={mode === 'lowvision'} />
      </div>

      {/* Top bar: profile + notifications + search */}
      <div className="absolute inset-x-0 top-0 z-20 px-4 pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go('profile')}
            aria-label="Profile"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-card backdrop-blur active:scale-95"
          >
            <User size={20} className="text-primary-700" />
          </button>
          <div className="flex-1">
            <SearchBar icon={<Search size={18} className="text-slate-400" />} placeholder="Where do you want to go?" onClick={() => go('search')} />
          </div>
          <button
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-card backdrop-blur active:scale-95"
          >
            <Bell size={20} className="text-primary-700" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger-500" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="mt-3 flex gap-2">
          <QuickChip icon={<MapPin size={14} />} label="Nearby" onClick={() => go('search')} />
          <QuickChip icon={<span>❤️</span>} label="Saved" onClick={() => go('saved')} />
          <QuickChip icon={<AlertTriangle size={14} />} label="Report Issue" onClick={() => go('report')} />
        </div>
      </div>

      {/* Floating route-preference card */}
      <div className="absolute left-4 right-4 top-36 z-10">
        <div className="rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Your route preference</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-2xl">{mode === 'wheelchair' ? '♿' : '👁'}</span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {mode === 'wheelchair' ? 'Wheelchair' : 'Low Vision'}
              </p>
              <p className="text-xs text-slate-500">
                {mode === 'wheelchair' ? 'Avoid stairs • Prefer ramps' : 'High contrast • Voice guidance'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating SOS */}
      <div className="absolute bottom-24 right-4 z-20">
        <SOSButton />
      </div>

      <BottomNav />
    </div>
  );
}

function QuickChip({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-card backdrop-blur active:scale-95"
    >
      {icon}
      {label}
    </button>
  );
}
