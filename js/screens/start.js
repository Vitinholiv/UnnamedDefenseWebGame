// js/screens/start.js
import { t } from '../i18n.js';

export const StartScreen = () => `
    <div class="start-screen-container">
        <button class="settings-trigger-btn" onclick="navigateTo('settings')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        </button>

        <h1 class="game-title">
            <span class="title-unnamed">${t('title_unnamed')}</span><br/>
            ${t('title_defense')}
        </h1>
        
        <div id="login-box" class="auth-panel">
            <h2 class="panel-title">${t('login_title')}</h2>
            
            <div class="input-group">
                <input type="text" id="login-user" class="game-input" placeholder="${t('login_user')}" autocomplete="off" />
            </div>
            
            <div class="input-group">
                <input type="password" id="login-pass" class="game-input" placeholder="${t('login_pass')}" />
            </div>
            
            <button onclick="handleStartLogin()" class="game-btn">${t('login_btn')}</button>
            
            <p class="toggle-mode" onclick="document.getElementById('login-box').style.display='none'; document.getElementById('register-box').style.display='flex';">
                ${t('login_toggle')}
            </p>
        </div>

        <div id="register-box" class="auth-panel" style="display: none;">
            <h2 class="panel-title">${t('reg_title')}</h2>
            
            <div class="input-group">
                <input type="text" id="reg-user" class="game-input" placeholder="${t('reg_user')}" autocomplete="off" />
            </div>
            
            <div class="input-group">
                <input type="password" id="reg-pass" class="game-input" placeholder="${t('reg_pass')}" />
            </div>
            
            <div class="input-group">
                <input type="password" id="reg-pass-repeat" class="game-input" placeholder="${t('reg_pass_repeat')}" />
            </div>
            
            <button onclick="handleStartRegister()" class="game-btn active-register">${t('reg_btn')}</button>
            
            <p class="toggle-mode" onclick="document.getElementById('register-box').style.display='none'; document.getElementById('login-box').style.display='flex';">
                ${t('reg_toggle')}
            </p>
        </div>
    </div>
`;