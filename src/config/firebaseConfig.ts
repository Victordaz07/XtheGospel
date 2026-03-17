// src/config/firebaseConfig.ts
// Configuración de Firebase - xTheGospel
// Re-exporta desde firebaseApp para una sola fuente de verdad (env vars, init)

import { getFirebaseDb, getFirebaseAuth } from '../services/firebase/firebaseApp';

export const db = getFirebaseDb();
export const auth = getFirebaseAuth();

export default { db, auth };
