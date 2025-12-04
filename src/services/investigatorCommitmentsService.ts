import { StorageService } from '../utils/storage';
import { InvestigatorCommitment, CommitmentState } from '../data/investigatorCommitments';

const INVESTIGATOR_COMMITMENTS_KEY = '@investigatorCommitments';

export const InvestigatorCommitmentsService = {
    saveCommitments: async (commitments: InvestigatorCommitment[]): Promise<void> => {
        try {
            StorageService.setItem(INVESTIGATOR_COMMITMENTS_KEY, JSON.stringify(commitments));
        } catch (e) {
            console.error('Error guardando compromisos del investigador:', e);
            throw e;
        }
    },

    loadCommitments: async (): Promise<InvestigatorCommitment[]> => {
        try {
            const json = StorageService.getItem(INVESTIGATOR_COMMITMENTS_KEY);
            if (json) {
                const parsed = JSON.parse(json);
                // Migrate old format to new format if needed
                return parsed.map((c: any) => {
                    if (c.completed !== undefined && c.state === undefined) {
                        // Old format: convert completed boolean to state
                        return {
                            ...c,
                            state: c.completed ? 'completed' : 'pending',
                            text: c.title || c.text || '',
                        };
                    }
                    return c;
                });
            }
            return [];
        } catch (e) {
            console.error('Error cargando compromisos del investigador:', e);
            return [];
        }
    },

    addCommitment: async (
        commitment: Omit<InvestigatorCommitment, 'id' | 'createdAt'>
    ): Promise<InvestigatorCommitment> => {
        try {
            const commitments = await InvestigatorCommitmentsService.loadCommitments();
            const newCommitment: InvestigatorCommitment = {
                ...commitment,
                id: (typeof crypto !== 'undefined' && crypto.randomUUID) 
                    ? crypto.randomUUID() 
                    : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                createdAt: new Date().toISOString(),
            };
            await InvestigatorCommitmentsService.saveCommitments([...commitments, newCommitment]);
            return newCommitment;
        } catch (e) {
            console.error('Error agregando compromiso del investigador:', e);
            throw e;
        }
    },

    updateCommitment: async (
        id: string,
        updates: Partial<InvestigatorCommitment>
    ): Promise<void> => {
        try {
            const commitments = await InvestigatorCommitmentsService.loadCommitments();
            const updated = commitments.map((c) => (c.id === id ? { ...c, ...updates } : c));
            await InvestigatorCommitmentsService.saveCommitments(updated);
        } catch (e) {
            console.error('Error actualizando compromiso del investigador:', e);
            throw e;
        }
    },

    updateCommitmentState: async (id: string, state: CommitmentState): Promise<void> => {
        await InvestigatorCommitmentsService.updateCommitment(id, { state });
    },

    deleteCommitment: async (id: string): Promise<void> => {
        try {
            const commitments = await InvestigatorCommitmentsService.loadCommitments();
            const filtered = commitments.filter((c) => c.id !== id);
            await InvestigatorCommitmentsService.saveCommitments(filtered);
        } catch (e) {
            console.error('Error eliminando compromiso del investigador:', e);
            throw e;
        }
    },

    clearCommitments: async (): Promise<void> => {
        try {
            StorageService.removeItem(INVESTIGATOR_COMMITMENTS_KEY);
        } catch (e) {
            console.error('Error limpiando compromisos del investigador:', e);
            throw e;
        }
    },
};

