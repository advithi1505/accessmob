import { MapPin, Accessibility } from 'lucide-react';
import { useApp } from '@/store';
import Button from '@/components/Button';
import MumbaiMap from '@/components/MumbaiMap';

export default function Splash() {
  const { go } = useApp();
  return (
    <div className="screen-enter relative h-full w-full overflow-hidden bg-primary-950">
      {/* Faint map background */}
      <div className="absolute inset-0 opacity-25">
        <MumbaiMap />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary-400/30" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-600 shadow-float">
            <MapPin size={40} className="text-white" strokeWidth={2.2} />
            <Accessibility size={26} className="absolute bottom-4 right-4 text-accessible-300" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight">AccessNav</h1>
        <p className="mt-3 text-lg font-medium text-primary-200">Navigate without barriers.</p>

        <div className="mt-auto w-full pb-12">
          <Button fullWidth onClick={() => go('welcome')} className="text-lg">
            Get Started
          </Button>
          <p className="mt-4 text-sm text-primary-300">Personalized accessibility · Navigation · Safety</p>
        </div>
      </div>
    </div>
  );
}
