// js/app.js
import { Storage } from './api.js';
import { StartScreen } from './screens/start.js';
import { SettingsScreen } from './screens/settings.js';
import { LevelsScreen } from './screens/levels.js';
import { UnitsScreen } from './screens/units.js';
import { SkillsScreen } from './screens/skills.js';
import { BattleScreen } from './screens/battle.js';
import { AchievementsScreen } from './screens/achievements.js';
import { GameLayout } from './components/layout.js';
import{ t } from './i18n.js';

// Game State
const defaultPlayer = {
    username: null,
    isAuthenticated: false,
    levels: {},
    units: {},
    skills: {},
    activeUnits: {},
    activeSkills: {},
    goldCoins: 0,
    silverCoins: 0,
    experience: 0,
    achievements: {}
};

const defaultSettings = {
    sfxVolume: 100,
    musicVolume: 100,
    language: 'pt-BR'
};

export const GameState = {
    player: Storage.load('playerData', { ...defaultPlayer }),
    settings: Storage.load('gameSettings', { ...defaultSettings }),

    saveLocal: function(){
        Storage.save('playerData', this.player);
        Storage.save('gameSettings', this.settings);
    },

    isLoggedIn: function(){
        return Boolean(this.player?.username && this.player?.isAuthenticated);
    },

    setUser: function(username){
        this.player.username = username;
        this.player.isAuthenticated = true;
        this.saveLocal();
    },

    clearSession: function(){
        this.player.username = null;
        this.player.isAuthenticated = false;
        this.saveLocal();
    },

    update(data){
        if(!data || typeof data !== 'object') return;
        this.player = { ...this.player, ...data };
        this.saveLocal();
    }
};

// Page Navigation
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
    const contentHTML = screenFn();

    if(screenName === 'start' || screenName == 'battle'){
        appContainer.innerHTML = contentHTML;
    } else {
        appContainer.innerHTML = GameLayout(contentHTML, screenName);
    }
};
window.GameState = GameState;
window.navigateTo = navigateTo;

// Authentication
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

    if(!username || !password) return;

    try {
        const result = await authFetch('login', { username, password });
        if(result.status === 'ok'){
            GameState.setUser(username);
            window.navigateTo('levels');
        } else {
            GameState.clearSession();
            GameUI.showAlert(result.message);
        }
    } catch (e){ GameState.clearSession(); GameUI.showAlert('[Login]: Erro ao se conectar.'); }
};

window.handleStartRegister = async () => {
    const username = document.getElementById('reg-user')?.value.trim();
    const password = document.getElementById('reg-pass')?.value;
    const repeat = document.getElementById('reg-pass-repeat')?.value;

    if(!username || !password || password !== repeat) return;

    try {
        const result = await authFetch('register', { username, password });
        if(result.status === 'ok'){
            GameState.setUser(username);
            window.navigateTo('levels');
        } else {
            GameState.clearSession();
            GameUI.showAlert(result.message);
        }
    } catch (e){ GameState.clearSession(); GameUI.showAlert('[Registro]: Erro ao se conectar.'); }
};

// UI
export const GameUI = {
    showAlert(message, type = 'error'){
        let overlay = document.getElementById('game-alert-overlay');
        if(!overlay){
            overlay = document.createElement('div');
            overlay.id = 'game-alert-overlay';
            overlay.className = 'game-alert-overlay';
            document.body.appendChild(overlay);
        }

        const title = type === 'error' ? t('alert_error_title') : t('alert_info_title');
        const typeClass = type === 'error' ? 'alert-error' : 'alert-info';

        overlay.innerHTML = `
            <div class="game-alert-box ${typeClass}">
                <div class="game-alert-title">${title}</div>
                <div class="game-alert-msg">${message}</div>
                <button class="game-btn game-alert-btn" onclick="document.getElementById('game-alert-overlay').classList.remove('active')">
                    ${t('alert_btn_ok')}
                </button>
            </div>
        `;
        setTimeout(() =>{
            overlay.classList.add('active');
        }, 10);
    }
};
window.GameUI = GameUI;

export const globalVisualSync = () => {
    const goldSpan = document.querySelector('.coin-gold span');
    if(goldSpan){
        const goldVal = String(GameState.player.goldCoins || 0);
        if(goldSpan.innerText !== goldVal) goldSpan.innerText = goldVal;
    }

    const silverSpan = document.querySelector('.coin-silver span');
    if(silverSpan){
        const silverVal = String(GameState.player.silverCoins || 0);
        if(silverSpan.innerText !== silverVal) silverSpan.innerText = silverVal;
    }

    const skillNodes = document.querySelectorAll('.nav-node[id^="s"]');
    skillNodes.forEach(node => {
        const skillId = node.id.replace('s', '');

        if(GameState.player.skills && skillId in GameState.player.skills){
            const isPurchased = GameState.player.skills[skillId] === true;
            const targetClass = isPurchased ? 'green' : 'red'; 
            if(!node.classList.contains(targetClass)){
                node.classList.remove('red', 'green');
                node.classList.add(targetClass);
                const innerBtn = node.querySelector('.game-btn');
                if(innerBtn){
                    innerBtn.style.backgroundColor = ''; 
                }
            }
        }
    });

    const activeModal = document.querySelector('.floating-modal.active');
    if(activeModal){
        const modalBtn = activeModal.querySelector('.game-btn');
        if(modalBtn && !modalBtn.disabled){
            for(const [skillId, isPurchased] of Object.entries(GameState.player.skills || {})){
                if(isPurchased === true){
                    const titleBlock = activeModal.querySelector('div[style*="font-size: 1.8rem"]');
                    if(titleBlock && titleBlock.innerText === t(`s${skillId}_name`)){
                        
                        modalBtn.disabled = true;
                        modalBtn.style.cursor = 'not-allowed';
                        modalBtn.innerText = t('btn_purchased') || 'COMPRADO';
                        
                        const buttonWrapper = modalBtn.closest('.nav-node');
                        if(buttonWrapper){
                            buttonWrapper.className = 'nav-node locked';
                        }
                    }
                }
            }
        }
    }
};
window.globalVisualSync = globalVisualSync;

// Init
navigateTo(GameState.isLoggedIn() ? 'levels' : 'start');