export type ConvertStatus = 
  | 'attendsSacrament'
  | 'hasMinistry'
  | 'hasCalling'
  | 'takingGospelPrinciples'
  | 'preparingTemple';

export type ConvertTimeframe = '0-3' | '3-6' | '6-12';
export type OrganizationType = 'eldersQuorum' | 'reliefSociety' | 'youngAdults' | 'youngMen' | 'youngWomen' | 'primary';

export interface NewConvert {
  id: string;
  name: string;
  monthsSinceBaptism: number;
  statuses: ConvertStatus[];
  hasCalling: boolean;
  isPreparingForTemple: boolean;
  timeframe: ConvertTimeframe;
  organization?: OrganizationType; // Organización a la que pertenece
}

export const mockNewConverts: NewConvert[] = [
  {
    id: 'nc1',
    name: 'Carlos',
    monthsSinceBaptism: 3,
    statuses: ['attendsSacrament', 'hasMinistry', 'hasCalling'],
    hasCalling: true,
    isPreparingForTemple: false,
    timeframe: '0-3',
    organization: 'eldersQuorum'
  },
  {
    id: 'nc2',
    name: 'Ana',
    monthsSinceBaptism: 8,
    statuses: ['attendsSacrament', 'hasMinistry', 'hasCalling', 'preparingTemple'],
    hasCalling: true,
    isPreparingForTemple: true,
    timeframe: '6-12',
    organization: 'reliefSociety'
  },
  {
    id: 'nc3',
    name: 'Miguel',
    monthsSinceBaptism: 5,
    statuses: ['attendsSacrament', 'hasMinistry', 'takingGospelPrinciples'],
    hasCalling: false,
    isPreparingForTemple: false,
    timeframe: '3-6',
    organization: 'youngAdults'
  },
  {
    id: 'nc4',
    name: 'Laura',
    monthsSinceBaptism: 11,
    statuses: ['attendsSacrament', 'hasMinistry', 'hasCalling'],
    hasCalling: true,
    isPreparingForTemple: false,
    timeframe: '6-12',
    organization: 'reliefSociety'
  },
  {
    id: 'nc5',
    name: 'Roberto',
    monthsSinceBaptism: 2,
    statuses: ['attendsSacrament', 'hasMinistry'],
    hasCalling: false,
    isPreparingForTemple: false,
    timeframe: '0-3',
    organization: 'eldersQuorum'
  }
];

