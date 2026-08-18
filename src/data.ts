import type { Place, NavState } from './types';

export const PLACES: Place[] = [
  {
    id: 'mumbai-central',
    name: 'Mumbai Central Railway Station',
    area: 'Mumbai Central',
    distanceKm: 2.4,
    score: 92,
    tags: ['Step-free entrance', 'Ramps available', 'Elevators available'],
    warnings: ['Construction near Platform 2'],
    x: 168,
    y: 312,
    emoji: '🚉',
  },
  {
    id: 'phoenix-mall',
    name: 'Phoenix Mall',
    area: 'Lower Parel',
    distanceKm: 4.1,
    score: 95,
    tags: ['Step-free entrance', 'Ramps available', 'Elevators available', 'Accessible restrooms'],
    warnings: [],
    x: 232,
    y: 392,
    emoji: '🛍️',
  },
  {
    id: 'apollo-hospital',
    name: 'Apollo Hospital',
    area: 'Tardeo',
    distanceKm: 5.2,
    score: 90,
    tags: ['Step-free entrance', 'Ramps available', 'Elevators available'],
    warnings: ['Limited parking near main gate'],
    x: 120,
    y: 420,
    emoji: '🏥',
  },
  {
    id: 'mumbai-airport',
    name: 'Mumbai Airport (BOM)',
    area: 'Vile Parle',
    distanceKm: 8.5,
    score: 88,
    tags: ['Step-free entrance', 'Ramps available', 'Elevators available', 'Accessible shuttle'],
    warnings: ['Busy drop-off zone'],
    x: 318,
    y: 150,
    emoji: '✈️',
  },
  {
    id: 'bkc',
    name: 'Bandra Kurla Complex',
    area: 'Bandra East',
    distanceKm: 9.6,
    score: 86,
    tags: ['Step-free entrance', 'Ramps available', 'Smooth sidewalks'],
    warnings: ['Long pedestrian crossings'],
    x: 340,
    y: 248,
    emoji: '🏢',
  },
];

export const SAVED_PLACES = [
  { id: 'home', name: 'Home', address: 'Tardeo Road, Mumbai', emoji: '🏠', placeId: 'apollo-hospital' },
  { id: 'college', name: 'College', address: 'Mahalaxmi, Mumbai', emoji: '🎓', placeId: 'mumbai-central' },
  { id: 'hospital', name: 'Hospital', address: 'Tardeo, Mumbai', emoji: '🏥', placeId: 'apollo-hospital' },
  { id: 'work', name: 'Work', address: 'BKC, Mumbai', emoji: '💼', placeId: 'bkc' },
];

export const NAV_STATES: NavState[] = [
  {
    instruction: 'Turn left in 80 m',
    detail: 'Then continue straight for 200 m',
    accessInstruction: '♿ Ramp available on your right',
    nextAccessPoint: '30 m',
  },
  {
    instruction: 'Continue straight for 200 m',
    detail: 'Then turn right onto Tardeo Road',
    accessInstruction: '♿ Use the ramp to cross the junction',
    nextAccessPoint: '120 m',
  },
  {
    instruction: 'Turn right onto Tardeo Road',
    detail: 'Continue 450 m to your destination',
    accessInstruction: '👁 Use the marked pedestrian crossing',
    nextAccessPoint: '200 m',
  },
  {
    instruction: 'You have arrived',
    detail: 'Mumbai Central Railway Station',
    accessInstruction: '♿ Step-free entrance ahead on your left',
    nextAccessPoint: 'Here',
  },
];

export const REPORT_OPTIONS = [
  'Blocked sidewalk',
  'Broken ramp',
  'Broken elevator',
  'Construction',
  'Obstacle',
  'Other',
];
