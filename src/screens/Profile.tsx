import { useApp } from '@/store';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import Toggle from '@/components/Toggle';
import { useState } from 'react';

export default function Profile() {
  const { go, mode, setMode } = useApp();
  const [prefs, setPrefs] = useState({
    mostAccessible: true,
    avoidStairs: true,
    preferRamps: true,
    highContrast: mode === 'lowvision',
    voiceNav: mode === 'lowvision',
    largeText: false,
    appHighContrast: false,
    appVoice: false,
  });

  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="screen-enter flex h-full w-full flex-col bg-slate-50">
      <TopBar title="My Profile" onBack={() => go('home')} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-24 pt-16">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-2xl font-extrabold text-white shadow-card">
            AR
          </div>
          <h2 className="mt-3 text-lg font-extrabold text-slate-900">Aarav Rao</h2>
          <p className="text-sm text-slate-500">aarav.rao@example.com</p>
        </div>

        {/* Accessibility */}
        <Section title="Accessibility">
          <div className="flex gap-2">
            {(['wheelchair', 'lowvision'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-xl border-2 p-3 text-center transition ${
                  mode === m ? 'border-primary-600 bg-primary-50' : 'border-slate-200 bg-white'
                }`}
              >
                <span className="text-2xl">{m === 'wheelchair' ? '♿' : '👁'}</span>
                <p className={`mt-1 text-xs font-bold ${mode === m ? 'text-primary-700' : 'text-slate-600'}`}>
                  {m === 'wheelchair' ? 'Wheelchair' : 'Low Vision'}
                </p>
              </button>
            ))}
          </div>
          <button
            onClick={() => go('setup')}
            className="mt-3 w-full rounded-xl bg-primary-50 py-3 text-sm font-bold text-primary-700"
          >
            Edit Preferences
          </button>
        </Section>

        {/* Navigation */}
        <Section title="Navigation">
          <Row label="Most accessible route" on={prefs.mostAccessible} onChange={() => toggle('mostAccessible')} />
          <Row label="Avoid stairs" on={prefs.avoidStairs} onChange={() => toggle('avoidStairs')} />
          <Row label="Prefer ramps" on={prefs.preferRamps} onChange={() => toggle('preferRamps')} />
          <Row label="High contrast" on={prefs.highContrast} onChange={() => toggle('highContrast')} />
          <Row label="Voice navigation" on={prefs.voiceNav} onChange={() => toggle('voiceNav')} />
        </Section>

        {/* App */}
        <Section title="App">
          <Row label="Large text" on={prefs.largeText} onChange={() => toggle('largeText')} />
          <Row label="High contrast" on={prefs.appHighContrast} onChange={() => toggle('appHighContrast')} />
          <Row label="Voice guidance" on={prefs.appVoice} onChange={() => toggle('appVoice')} />
        </Section>
      </div>

      <BottomNav />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</h3>
      <div className="rounded-2xl bg-white p-4 shadow-card">{children}</div>
    </div>
  );
}

function Row({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <Toggle on={on} onChange={onChange} label={label} />
    </div>
  );
}
