// Códigos QR autorizados para misioneros
const AUTHORIZED_MISSIONARY_CODES = [
    'MISIONERO-AREA-001',
    'MISIONERO-AREA-002',
    'MISIONERO-AREA-003',
    'MISIONERO-ZONA-001',
    'MISIONERO-DISTRITO-001'
];

export const QRAuthService = {
    // Verificar si un código QR es válido
    verifyMissionaryQR: (qrData: string): boolean => {
        return AUTHORIZED_MISSIONARY_CODES.includes(qrData);
    },

    // Generar mensaje de autorización
    getAuthorizationMessage: (qrData: string): { authorized: boolean; message: string } => {
        const isAuthorized = QRAuthService.verifyMissionaryQR(qrData);

        if (isAuthorized) {
            return {
                authorized: true,
                message: '✅ Misionero autorizado. Puede reiniciar progresos.'
            };
        } else {
            return {
                authorized: false,
                message: '❌ Código QR no autorizado. Solo misioneros pueden realizar esta acción.'
            };
        }
    }
};
