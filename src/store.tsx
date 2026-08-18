import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AccessibilityMode, ScreenName, Place } from './types';

interface AppState {
  screen: ScreenName;
  go: (s: ScreenName) => void;
  mode: AccessibilityMode;
  setMode: (m: AccessibilityMode) => void;
  destination: Place | null;
  setDestination: (p: Place) => void;
  selectedRoute: 'accessible' | 'fastest' | 'clear';
  setSelectedRoute: (r: 'accessible' | 'fastest' | 'clear') => void;
  navStep: number;
  setNavStep: (n: number) => void;
  paused: boolean;
  setPaused: (p: boolean) => void;
  sosActive: boolean;
  setSosActive: (a: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenName>('splash');
  const [mode, setMode] = useState<AccessibilityMode>('wheelchair');
  const [destination, setDestination] = useState<Place | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<'accessible' | 'fastest' | 'clear'>('accessible');
  const [navStep, setNavStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const go = (s: ScreenName) => {
    setScreen(s);
    if (s === 'navigation') setNavStep(0);
  };

  return (
    <Ctx.Provider
      value={{
        screen,
        go,
        mode,
        setMode,
        destination,
        setDestination,
        selectedRoute,
        setSelectedRoute,
        navStep,
        setNavStep,
        paused,
        setPaused,
        sosActive,
        setSosActive,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp must be used within AppProvider');
  return c;
}
