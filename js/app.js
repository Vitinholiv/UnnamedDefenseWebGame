import { Storage } from './storage.js';
import { StartScreen } from './screens/start.js';
import { SettingsScreen } from './screens/settings.js';
import { LevelsScreen } from './screens/levels.js';
import { UnitsScreen } from './screens/units.js';
import { SkillsScreen } from './screens/skills.js';
import { BattleScreen } from './screens/battle.js';
import { AchievementsScreen } from './screens/achievements.js';

const defaultPlayer = {
    username: null,
    isAuthenticated: false,
    levels: [],
    units: [],
    skills: [],
    achievements: []
};

const defaultSettings = {
    sfxVolume: 100,
    musicVolume: 100,
    language: 'pt-BR'
};

export const GameState = {
    player: Storage.load('playerData', { ...defaultPlayer }),
    settings: Storage.load('gameSettings', { ...defaultSettings }),

    saveLocal: function() {
        Storage.save('playerData', this.player);
        Storage.save('gameSettings', this.settings);
    },

    isLoggedIn: function() {
        return Boolean(this.player?.username && this.player?.isAuthenticated);
    },

    setUser: function(username) {
        this.player.username = username;
        this.player.isAuthenticated = true;
        this.saveLocal();
    },

    clearSession: function() {
        this.player.username = null;
        this.player.isAuthenticated = false;
        this.saveLocal();
    },

    update(data) {
        if (!data || typeof data !== 'object') return;
        this.player = { ...this.player, ...data };
        this.saveLocal();
    }
};

const appContainer = document.getElementById('game-app');

export const navigateTo = (screenName) => {
    appContainer.innerHTML = '';
    const screens = {
        'start': StartScreen,
        'settings': SettingsScreen,
        'levels': LevelsScreen,
        'units': UnitsScreen,
        'skills': SkillsScreen,
        'battle': BattleScreen,
        'achievements': AchievementsScreen
    };

    const screenFn = screens[screenName] || StartScreen;
    appContainer.innerHTML = screenFn();
};

window.GameState = GameState;
window.navigateTo = navigateTo;

const authFetch = async (action, data) => {
    const response = await fetch('api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
    });
    return await response.json();
};

window.handleStartLogin = async () => {
    const username = document.getElementById('login-user')?.value.trim();
    const password = document.getElementById('login-pass')?.value;

    if (!username || !password) return;

    try {
        const result = await authFetch('login', { username, password });
        if (result.status === 'ok') {
            GameState.setUser(username);
            window.navigateTo('levels');
        } else {
            GameState.clearSession();
            alert(result.message);
        }
    } catch (e) { GameState.clearSession(); alert('Erro ao conectar I.'); }
};

window.handleStartRegister = async () => {
    const username = document.getElementById('reg-user')?.value.trim();
    const password = document.getElementById('reg-pass')?.value;
    const repeat = document.getElementById('reg-pass-repeat')?.value;

    if (!username || !password || password !== repeat) return;

    try {
        const result = await authFetch('register', { username, password });
        if (result.status === 'ok') {
            GameState.setUser(username);
            window.navigateTo('levels');
        } else {
            GameState.clearSession();
            alert(result.message);
        }
    } catch (e) { GameState.clearSession(); alert('Erro ao conectar II.'); }
};

navigateTo(GameState.isLoggedIn() ? 'levels' : 'start');