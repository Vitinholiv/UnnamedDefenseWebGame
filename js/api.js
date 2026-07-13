// js/api.js
import { GameState } from './app.js';

const STORAGE_PREFIX = 'unnamed_defense_';
const buildKey = (key) => `${STORAGE_PREFIX}${key}`;

export const Storage = {
    load(key, fallback = null){
        const raw = localStorage.getItem(buildKey(key));
        if(!raw) return fallback;
        
        try {
            return JSON.parse(raw);
        } catch (e){
            console.error("[api.js] Erro ao ler storage:", e);
            return fallback;
        }
    },

    save(key, value){
        localStorage.setItem(buildKey(key), JSON.stringify(value));
    },

    remove(key){
        localStorage.removeItem(buildKey(key));
    }
};

export const API = {
    async save(){
        try {
            const response = await fetch('api/save.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerData: GameState.player })
            });

            const result = await response.json();
            return result.status === 'ok';
        } catch (e){
            console.error('[api.js] Erro ao salvar no servidor:', e);
            return false;
        }
    },

    async load(){
        try {
            const response = await fetch('api/load.php');
            const result = await response.json();

            if(result.status === 'ok'){
                GameState.update(result.playerData);
            }
        } catch (e){
            console.error('[api.js] Erro ao carregar do servidor:', e);
        }
    }
};