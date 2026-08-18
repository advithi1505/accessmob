import { PLACES } from '@/data';
import type { AccessibilityMode } from '@/types';

interface Props {
  mode?: AccessibilityMode;
  /** highlight a route on the map */
  route?: 'accessible' | 'fastest' | 'clear' | null;
  /** show a destination marker */
  destinationId?: string | null;
  /** progress 0..1 along the selected route (for active navigation) */
  progress?: number;
  /** dim/quiet the map when a sheet is open */
  dim?: boolean;
  /** high-contrast color scheme for low vision mode */
  highContrast?: boolean;
}

const VB_W = 390;
const VB_H = 644;

// Current location on the map
const CUR = { x: 80, y: 540 };

// Route polylines from current location to Mumbai Central (the demo destination)
const ROUTES: Record<string, { color: string; pts: string; dashed?: boolean }> = {
  accessible: {
    color: '#10b981',
    pts: `${CUR.x},${CUR.y} 80,470 120,420 120,360 168,312`,
  },
  fastest: {
    color: '#4f46e5',
    pts: `${CUR.x},${CUR.y} 80,480 95,400 130,340 168,312`,
    dashed: true,
  },
  clear: {
    color: '#f59e0b',
    pts: `${CUR.x},${CUR.y} 60,500 60,420 95,360 130,330 168,312`,
    dashed: true,
  },
};

export default function MumbaiMap({
  mode,
  route = null,
  destinationId = null,
  progress = 0,
  dim = false,
  highContrast = false,
}: Props) {
  const dest = PLACES.find((p) => p.id === destinationId) ?? PLACES[0];
  const showRoute = route ?? (destinationId ? 'accessible' : null);

  const bg = highContrast ? '#0f172a' : '#e8eef5';
  const land = highContrast ? '#1e293b' : '#f1f5f9';
  const park = highContrast ? '#14532d' : '#d1fae5';
  const water = highContrast ? '#0c4a6e' : '#bae6fd';
  const roadMajor = highContrast ? '#475569' : '#ffffff';
  const roadMinor = highContrast ? '#334155' : '#e2e8f0';
  const roadOutline = highContrast ? '#64748b' : '#cbd5e1';
  const building = highContrast ? '#334155' : '#dde4ed';
  const building2 = highContrast ? '#3b475a' : '#cfd8e6';
  const label = highContrast ? '#e2e8f0' : '#475569';
  const labelLight = highContrast ? '#94a3b8' : '#94a3b8';

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={`h-full w-full transition-all ${dim ? 'brightness-95' : ''}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Base */}
      <rect width={VB_W} height={VB_H} fill={bg} />

      {/* Water bodies (Arabian Sea + Mithi River hint) */}
      <path
        d="M -10 -10 L 120 -10 L 95 70 L 60 120 L 20 150 L -10 140 Z"
        fill={water}
        opacity={0.9}
      />
      <path d="M 360 -10 L 400 -10 L 400 60 L 380 80 L 360 70 Z" fill={water} opacity={0.9} />
      <path d="M 300 470 L 400 470 L 400 560 L 330 580 L 300 540 Z" fill={water} opacity={0.7} />

      {/* Parks / green spaces */}
      <rect x="200" y="470" width="80" height="60" rx="8" fill={park} opacity={0.85} />
      <rect x="20" y="250" width="55" height="50" rx="8" fill={park} opacity={0.8} />
      <circle cx="300" cy="420" r="22" fill={park} opacity={0.8} />

      {/* Land blocks (subtle) */}
      <rect x="130" y="180" width="200" height="120" rx="12" fill={land} opacity={0.6} />
      <rect x="30" y="330" width="120" height="120" rx="12" fill={land} opacity={0.5} />

      {/* Minor road grid */}
      <g stroke={roadMinor} strokeWidth="6" fill="none">
        <path d="M 0 200 L 390 200" />
        <path d="M 0 280 L 390 280" />
        <path d="M 0 360 L 390 360" />
        <path d="M 0 440 L 390 440" />
        <path d="M 0 520 L 390 520" />
        <path d="M 70 0 L 70 644" />
        <path d="M 150 0 L 150 644" />
        <path d="M 230 0 L 230 644" />
        <path d="M 300 0 L 300 644" />
      </g>

      {/* Major roads (outlined) */}
      <g stroke={roadOutline} strokeWidth="12" fill="none" strokeLinecap="round">
        <path d="M 0 240 L 390 240" />
        <path d="M 0 400 L 390 400" />
        <path d="M 110 0 L 110 644" />
        <path d="M 260 0 L 260 644" />
      </g>
      <g stroke={roadMajor} strokeWidth="9" fill="none" strokeLinecap="round">
        <path d="M 0 240 L 390 240" />
        <path d="M 0 400 L 390 400" />
        <path d="M 110 0 L 110 644" />
        <path d="M 260 0 L 260 644" />
      </g>

      {/* Diagonal road (Tardeo Road) */}
      <path d="M 60 560 L 168 312" stroke={roadOutline} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M 60 560 L 168 312" stroke={roadMajor} strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* Buildings */}
      <g fill={building}>
        <rect x="120" y="210" width="24" height="20" rx="3" />
        <rect x="150" y="205" width="20" height="28" rx="3" />
        <rect x="175" y="215" width="30" height="18" rx="3" />
        <rect x="215" y="208" width="18" height="24" rx="3" />
        <rect x="240" y="215" width="14" height="20" rx="3" />
        <rect x="270" y="210" width="24" height="22" rx="3" />
        <rect x="135" y="290" width="20" height="24" rx="3" />
        <rect x="165" y="285" width="16" height="30" rx="3" />
        <rect x="190" y="295" width="22" height="20" rx="3" />
        <rect x="220" y="290" width="18" height="26" rx="3" />
        <rect x="245" y="295" width="10" height="20" rx="3" />
        <rect x="270" y="285" width="24" height="28" rx="3" />
        <rect x="30" y="340" width="24" height="22" rx="3" />
        <rect x="60" y="345" width="18" height="18" rx="3" />
        <rect x="85" y="340" width="20" height="24" rx="3" />
        <rect x="30" y="375" width="20" height="20" rx="3" />
        <rect x="60" y="380" width="22" height="16" rx="3" />
        <rect x="85" y="375" width="18" height="22" rx="3" />
        <rect x="30" y="410" width="24" height="20" rx="3" />
        <rect x="65" y="410" width="18" height="24" rx="3" />
        <rect x="30" y="445" width="20" height="22" rx="3" />
        <rect x="60" y="450" width="22" height="18" rx="3" />
        <rect x="180" y="370" width="24" height="22" rx="3" />
        <rect x="210" y="365" width="18" height="28" rx="3" />
        <rect x="235" y="372" width="20" height="22" rx="3" />
        <rect x="180" y="410" width="20" height="24" rx="3" />
        <rect x="210" y="415" width="22" height="18" rx="3" />
        <rect x="240" y="410" width="14" height="24" rx="3" />
        <rect x="275" y="370" width="20" height="24" rx="3" />
        <rect x="300" y="365" width="18" height="28" rx="3" />
        <rect x="275" y="410" width="22" height="22" rx="3" />
        <rect x="305" y="415" width="16" height="20" rx="3" />
      </g>
      <g fill={building2}>
        <rect x="130" y="250" width="14" height="14" rx="3" />
        <rect x="155" y="250" width="12" height="14" rx="3" />
        <rect x="180" y="250" width="16" height="14" rx="3" />
        <rect x="220" y="250" width="14" height="14" rx="3" />
        <rect x="245" y="250" width="12" height="14" rx="3" />
        <rect x="275" y="250" width="14" height="14" rx="3" />
        <rect x="130" y="330" width="14" height="14" rx="3" />
        <rect x="160" y="330" width="12" height="14" rx="3" />
        <rect x="185" y="330" width="14" height="14" rx="3" />
        <rect x="220" y="330" width="12" height="14" rx="3" />
        <rect x="245" y="330" width="14" height="14" rx="3" />
        <rect x="275" y="330" width="12" height="14" rx="3" />
      </g>

      {/* Pedestrian crossings (zebra) */}
      <g fill={highContrast ? '#f8fafc' : '#ffffff'}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`c1-${i}`} x={108 + i * 4} y={236} width="3" height="8" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`c2-${i}`} x={258 + i * 4} y={396} width="3" height="8" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`c3-${i}`} x={108 + i * 4} y={396} width="3" height="8" />
        ))}
      </g>

      {/* Route line(s) */}
      {showRoute &&
        (Object.keys(ROUTES) as (keyof typeof ROUTES)[]).map((key) => {
          const r = ROUTES[key];
          const isActive = showRoute === key;
          return (
            <polyline
              key={key}
              points={r.pts}
              fill="none"
              stroke={r.color}
              strokeWidth={isActive ? 6 : 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={r.dashed ? '2 7' : undefined}
              opacity={isActive ? 1 : 0.55}
              className={isActive && !r.dashed ? 'animate-route-dash' : ''}
              style={isActive && r.dashed ? { strokeDashoffset: 0 } : undefined}
            />
          );
        })}

      {/* Progress marker along the accessible route during active navigation */}
      {showRoute && progress > 0 && (
        <ProgressDot pts={ROUTES.accessible.pts.split(' ').map((p) => p.split(',').map(Number))} progress={progress} />
      )}

      {/* Accessibility markers: ramps */}
      <Marker x={120} y={420} color="#10b981" glyph="♿" />
      <Marker x={95} y={400} color="#10b981" glyph="♿" />
      <Marker x={130} y={330} color="#10b981" glyph="♿" />

      {/* Elevator markers */}
      <Marker x={150} y={360} color="#4f46e5" glyph="🛗" small />
      <Marker x={250} y={300} color="#4f46e5" glyph="🛗" small />

      {/* Warning markers */}
      <Marker x={180} y={280} color="#f59e0b" glyph="⚠" />
      <Marker x={210} y={400} color="#f59e0b" glyph="⚠" />

      {/* Place markers */}
      {PLACES.map((p) => {
        const isDest = p.id === dest.id && destinationId;
        return (
          <g key={p.id}>
            {isDest && (
              <circle cx={p.x} cy={p.y - 6} r={16} fill="#4f46e5" opacity={0.15} className="animate-pulse-ring" />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={isDest ? 14 : 10}
              fill={isDest ? '#4f46e5' : '#ffffff'}
              stroke={isDest ? '#312e81' : '#4f46e5'}
              strokeWidth="2"
            />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={isDest ? 13 : 9}>
              {p.emoji}
            </text>
          </g>
        );
      })}

      {/* Current location */}
      <g>
        <circle cx={CUR.x} cy={CUR.y} r={18} fill="#4f46e5" opacity={0.18} className="animate-pulse-ring" />
        <circle cx={CUR.x} cy={CUR.y} r={9} fill="#4f46e5" stroke="#ffffff" strokeWidth="3" />
      </g>

      {/* Street labels */}
      <g fontSize="9" fill={label} fontWeight={600} fontFamily="Inter, sans-serif">
        <text x="200" y="234" textAnchor="middle">
          Mahalaxmi Road
        </text>
        <text x="200" y="394" textAnchor="middle">
          Tardeo Road
        </text>
        <text x={110 + 4} y="120" transform="rotate(90 114 120)" textAnchor="middle">
          Nana Chowk St
        </text>
        <text x={260 + 4} y="150" transform="rotate(90 264 150)" textAnchor="middle">
          Worli Ave
        </text>
      </g>

      {/* Area labels */}
      <g fontSize="11" fill={labelLight} fontWeight={700} fontFamily="Inter, sans-serif" opacity={0.8}>
        <text x="150" y="170">
          MUMBAI CENTRAL
        </text>
        <text x="30" y="320">
          TARDEO
        </text>
        <text x="210" y="460">
          MAHALAXMI
        </text>
        <text x="300" y="200">
          WORLI
        </text>
      </g>
    </svg>
  );
}

function Marker({
  x,
  y,
  color,
  glyph,
  small = false,
}: {
  x: number;
  y: number;
  color: string;
  glyph: string;
  small?: boolean;
}) {
  const r = small ? 8 : 10;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#ffffff" stroke={color} strokeWidth="2.5" />
      <text x={x} y={y + 3} textAnchor="middle" fontSize={small ? 8 : 9}>
        {glyph}
      </text>
    </g>
  );
}

function ProgressDot({ pts, progress }: { pts: number[][]; progress: number }) {
  // Walk the polyline by arc length and place a dot at `progress` fraction
  const segs = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    segs.push({ x1, y1, x2, y2, len });
    total += len;
  }
  let target = total * progress;
  let px = pts[0][0];
  let py = pts[0][1];
  for (const s of segs) {
    if (target <= s.len) {
      const t = s.len === 0 ? 0 : target / s.len;
      px = s.x1 + (s.x2 - s.x1) * t;
      py = s.y1 + (s.y2 - s.y1) * t;
      break;
    }
    target -= s.len;
    px = s.x2;
    py = s.y2;
  }
  return (
    <g>
      <circle cx={px} cy={py} r={10} fill="#10b981" stroke="#ffffff" strokeWidth="3" />
    </g>
  );
}
