import { Home, Compass, Heart, User } from 'lucide-react';
import { useApp } from '@/store';
import type { ScreenName } from '@/types';

const items: { id: ScreenName; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Navigate', icon: Compass },
  { id: 'saved', label: 'Saved', icon: Heart },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const { screen, go } = useApp();
  const active = ['home', 'search', 'saved', 'profile'].includes(screen) ? screen : 'home';

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-slate-100 bg-white/95 px-2 pb-5 pt-2 backdrop-blur">
      <div className="flex items-center justify-around">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => go(id)}
              className="flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.4 : 2}
                className={isActive ? 'text-primary-600' : 'text-slate-400'}
              />
              <span className={`text-xs font-semibold ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
