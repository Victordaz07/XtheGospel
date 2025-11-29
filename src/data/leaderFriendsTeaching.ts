export type FriendStatus = 
  | 'hasBaptismDate'
  | 'attendsSacrament'
  | 'lesson1'
  | 'lesson2'
  | 'lesson3'
  | 'lesson4'
  | 'lesson5';

export interface FriendInTeaching {
  id: string;
  name: string;
  broughtBy?: string;  // quién lo trajo / quién le acompaña
  status: FriendStatus;
  statusLabel: string;  // "Con fecha de bautismo", "En lección 3", etc.
  notes?: string;
}

export const mockFriendsInTeaching: FriendInTeaching[] = [
  {
    id: 'fit1',
    name: 'Luis',
    broughtBy: 'Familia García',
    status: 'lesson3',
    statusLabel: 'En lección 3',
    notes: 'Interesado en el plan de salvación'
  },
  {
    id: 'fit2',
    name: 'María',
    broughtBy: 'Hermana Pérez',
    status: 'hasBaptismDate',
    statusLabel: 'Con fecha de bautismo - 15 de marzo',
    notes: 'Necesita amigo que se siente con ella el domingo'
  },
  {
    id: 'fit3',
    name: 'Familia Ramírez',
    broughtBy: 'Obispo',
    status: 'attendsSacrament',
    statusLabel: 'Asiste a la sacramental',
    notes: 'Listos para lección 4'
  },
  {
    id: 'fit4',
    name: 'Pedro',
    broughtBy: 'Elderes',
    status: 'lesson2',
    statusLabel: 'En lección 2',
    notes: 'Preguntas sobre la restauración'
  }
];

