import { GameState } from '../app.js';
import { t } from '../i18n.js';

export const SettingsScreen = () =>{
    const settings = GameState.settings;
    const isLoggedIn = GameState.isLoggedIn();
    const currentSpeed = settings.gameSpeed || 1;

    return `
        <div class="settings-container">
            <div class="settings-panel">
                <div class="setting-item">
                    <label>${t('sfx_volume')}</label>
                    <input type="range" min="0" max="100" value="${settings.sfxVolume}" 
                        onchange="GameState.settings.sfxVolume = this.value; GameState.saveLocal();" />
                </div>

                <div class="setting-item">
                    <label>${t('music_volume')}</label>
                    <input type="range" min="0" max="100" value="${settings.musicVolume}" 
                        onchange="GameState.settings.musicVolume = this.value; GameState.saveLocal();" />
                </div>

                <div class="setting-item">
                    <label>${t('game_speed') || 'Velocidade'} (<span id="speed-val">${currentSpeed}x</span>)</label>
                    <input type="range" min="1" max="4" step="0.25" value="${currentSpeed}" 
                        oninput="document.getElementById('speed-val').innerText = this.value + 'x'"
                        onchange="GameState.settings.gameSpeed = parseFloat(this.value); GameState.saveLocal();" />
                </div>

                <div class="setting-item">
                    <label>${t('language')}</label>
                    <select class="game-select" onchange="changeLanguage(this.value)">
                        <option value="pt-BR" ${settings.language === 'pt-BR' ? 'selected' : ''}>Português (BR)</option>
                        <option value="en-US" ${settings.language === 'en-US' ? 'selected' : ''}>English (US)</option>
                    </select>
                </div>
                
                ${isLoggedIn ? `<button class="game-btn logout-btn" onclick="handleLogout()">${t('logout')}</button>` : ''}
            </div>
        </div>
    `;
};

window.changeLanguage = (lang) =>{
    GameState.settings.language = lang;
    GameState.saveLocal();
    window.navigateTo('settings');
};

window.handleLogout = () =>{
    if(GameState.logout){
        GameState.logout();
    } else {
        GameState.player.username = null;
        GameState.player.isAuthenticated = false;
        GameState.saveLocal();
        window.navigateTo('start');
    }
};