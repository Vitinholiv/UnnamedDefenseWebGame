// js/api.js
import { GameState } from './app.js';
import { Storage } from './storage.js';

/*
    Mapeia objetos JS em hashes.
*/
const hashValue = (value) => {
    const json = JSON.stringify(value || {});
    let hash = 0;

    for (let i = 0; i < json.length; i += 1) {
        hash = ((hash << 5) - hash) + json.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString(16);
};

// Gerenciador da API
export const API = {
    operationLog: [],

    /*
        Adiciona uma operação na fila de operações que serão salvas no proximo save.
    */
    queueOperation(type, data = {}) {
        this.operationLog.push({
            type,
            data,
            hash: hashValue({ type, data })
        });
    },

    /*
        Sincronização de dados locais com o servidor. Ao ser chamada, salva os registros da fila.
    */
    async sync() {
        try {
            const payload = {
                token: GameState.player.token,
                operations: this.operationLog,
                stateHash: GameState.player.lastValidHash || null,
                playerData: GameState.player
            };

            const response = await fetch('api/sync.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.status === 'ok') {
                this.operationLog = [];
                GameState.update({
                    ...(result.newData || GameState.player),
                    lastValidHash: result.serverHash || result.newHash || GameState.player.lastValidHash
                });
                Storage.save('playerData', GameState.player);
            } else if (result.status === 'corrupt') {
                alert('Dados inconsistentes!');
                GameState.rollbackToLastValid();
            }
        } catch (e) {
            console.error('Erro de sincronização');
        }
    }
};