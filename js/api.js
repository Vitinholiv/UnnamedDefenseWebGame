// js/api.js
import { GameState } from './app.js';

const STORAGE_PREFIX = 'unnamed_defense_';
const buildKey = (key, username) => {
    return username ? `${STORAGE_PREFIX}${username}_${key}` : `${STORAGE_PREFIX}${key}`;
};

export const Storage = {
    load(key, fallback = null, username = null){
        const raw = localStorage.getItem(buildKey(key, username));
        if(!raw) return fallback;
        try{
            return JSON.parse(raw);
        } catch(e){
            return fallback;
        }
    },

    save(key, value, username = null){
        localStorage.setItem(buildKey(key, username), JSON.stringify(value));
    }
};

export const API = {
    isSaving: false,

    async save(){
        if(this.isSaving) return false;
        this.isSaving = true;
        try{
            const response = await fetch('api/save.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerData: GameState.player }),
                keepalive: true
            });
            const result = await response.json();
            this.isSaving = false;
            return result.status === 'ok';
        } catch(e){
            this.isSaving = false;
            return false;
        }
    },

    async load(){
        try{
            const response = await fetch('api/load.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            if(result.status === 'ok' && result.playerData && Object.keys(result.playerData).length > 0){
                GameState.update(result.playerData);
            }
            return result.status === 'ok';
        } catch(e){
            return false;
        }
    }
};