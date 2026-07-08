// js/storage.js
const STORAGE_PREFIX = 'unnamed_defense_';
const buildKey = (key) => `${STORAGE_PREFIX}${key}`;

export const Storage = {
    load(key, fallback = null) {
        const raw = localStorage.getItem(buildKey(key));
        if (!raw) return fallback;
        
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error("Erro ao ler storage:", e);
            return fallback;
        }
    },

    save(key, value) {
        localStorage.setItem(buildKey(key), JSON.stringify(value));
    },

    remove(key) {
        localStorage.removeItem(buildKey(key));
    }
};