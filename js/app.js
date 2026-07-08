// js/app.js
import { Storage } from './storage.js';
import { StartScreen } from './screens/start.js';
import { SettingsScreen } from './screens/settings.js';
import { LevelsScreen } from './screens/levels.js';
import { UnitsScreen } from './screens/units.js';
import { SkillsScreen } from './screens/skills.js';
import { BattleScreen } from './screens/battle.js';
import { AchievementsScreen } from './screens/achievements.js';

/*
    Define a estrutura base e o estado inicial do perfil do player, contendo
    os dados de sessão (token) e progresso.
*/
const defaultPlayer = {
    username: null,
    token: null,
    levels: [],
    units: [],
    skills: [],
    achievements: []
};

/*
    Define as preferências de configuração do usuário que são independentes do progresso 
    do jogo.
*/
const defaultSettings = {
    sfxVolume: 100,
    musicVolume: 100,
    language: 'pt-BR'
};

/*
    Objeto central que gerencia o estado global da aplicação. 
    Realiza o carregamento persistente via Storage, gerencia atualizações 
    incrementais do perfil e implementa mecanismos de rollback.
*/
export const GameState = {
    player: Storage.load('playerData', { ...defaultPlayer }),
    settings: Storage.load('gameSettings', { ...defaultSettings }),

    clone(value){
        return JSON.parse(JSON.stringify(value));
    },

    saveLocal: function(){
        Storage.save('playerData', this.player);
        Storage.save('gameSettings', this.settings);
    },

    update(data){
        if(!data || typeof data !== 'object'){
            return;
        }

        this.player = {
            ...this.player,
            ...data
        };

        this.saveLocal();
    },

    rollbackToLastValid(){
        const fallback = Storage.load('playerData', { ...defaultPlayer });
        this.player = { ...fallback };
        this.saveLocal();
    }
};

const appContainer = document.getElementById('game-app');

/*
    Router da aplicação.
*/
export const navigateTo = (screenName) => {
    appContainer.innerHTML = '';

    switch (screenName){
        case 'start':
            appContainer.innerHTML = StartScreen();
            break;
        case 'settings':
            appContainer.innerHTML = SettingsScreen();
            break;
        case 'levels':
            appContainer.innerHTML = LevelsScreen();
            break;
        case 'units':
            appContainer.innerHTML = UnitsScreen();
            break;
        case 'battle':
            appContainer.innerHTML = BattleScreen();
            break;
        case 'achievements':
            appContainer.innerHTML = AchievementsScreen();
            break;
        default:
            appContainer.innerHTML = StartScreen();
    }
};

// Inicialização
window.navigateTo = navigateTo;
navigateTo('start');