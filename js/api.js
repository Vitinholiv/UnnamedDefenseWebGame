import { GameState } from './app.js';

export const API = {
    async save() {
        try {
            const response = await fetch('api/save.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerData: GameState.player })
            });

            const result = await response.json();
            return result.status === 'ok';
        } catch (e) {
            console.error('Falha ao salvar no servidor:', e);
            return false;
        }
    },

    async load() {
        try {
            const response = await fetch('api/load.php');
            const result = await response.json();

            if (result.status === 'ok') {
                GameState.update(result.playerData);
            }
        } catch (e) {
            console.error('Falha ao carregar do servidor:', e);
        }
    }
};