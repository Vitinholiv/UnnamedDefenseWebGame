// js/components/layout.js
import { GameState } from '../app.js';
import { t } from '../i18n.js';

const getXpForLevel = (lvl) => {
    if (lvl >= 99) return 10000;
    const minXp = 100;
    const maxXp = 10000;
    const val = minXp + (lvl - 1) * ((maxXp - minXp) / 98);
    const roundTo = val > 1000 ? 100 : 50;
    return Math.floor(val / roundTo) * roundTo;
};

const getPlayerLevelInfo = (totalXp) => {
    let currentXp = totalXp;
    let level = 1;

    while (currentXp >= getXpForLevel(level) && level < 99) {
        currentXp -= getXpForLevel(level);
        level++;
    }
    if (level >= 99) {
        level = 99;
        currentXp = 10000;
    }

    const xpRequired = getXpForLevel(level);
    const xpPercent = (currentXp / xpRequired) * 100;
    return { level, xpPercent };
};

export const GameLayout = (contentHTML, currentScreen) => {
    const player = GameState.player;
    const { level, xpPercent } = getPlayerLevelInfo(player.experience || 0);
    const isLoggedIn = GameState.isLoggedIn();

    if (!isLoggedIn) {
        return `
            <div class="standalone-wrapper">
                <button class="back-btn" onclick="navigateTo('start')">← ${t('back')}</button>
                <div class="standalone-content">
                    ${contentHTML}
                </div>
            </div>
        `;
    }

    return `
        <div class="game-layout-wrapper">
            <header class="top-bar">
                <div class="top-left">
                    <div class="player-info">
                        <span class="player-name">${player.username}</span>
                        <div class="player-level-box">
                            <span class="level-text">LVL ${level}</span>
                            <div class="xp-bar"><div class="xp-fill" style="width: ${xpPercent}%"></div></div>
                        </div>
                    </div>
                    
                    <div class="currencies">
                        <div class="currency coin-gold">
                            <div class="coin-icon gold"></div>
                            <span>${player.goldCoins || 0}</span>
                        </div>
                        <div class="currency coin-silver">
                            <div class="coin-icon silver"></div>
                            <span>${player.silverCoins || 0}</span>
                        </div>
                    </div>
                </div>

                <div class="top-center">
                    <h2 class="screen-title">${t('title_' + currentScreen)}</h2>
                </div>

                <div class="top-right">
                    <button class="settings-btn" onclick="navigateTo('settings')">
                        <!-- Ícone SVG de engrenagem simples -->
                        <svg viewBox="0 0 24 24" fill="none" stroke="#66fcf1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                </div>
            </header>

            <main class="game-content-area">
                ${contentHTML}
            </main>

            <footer class="bottom-bar">
                <button class="nav-btn ${currentScreen === 'levels' ? 'active' : ''}" onclick="navigateTo('levels')">${t('nav_campaign')}</button>
                <button class="nav-btn ${currentScreen === 'units' ? 'active' : ''}" onclick="navigateTo('units')">${t('nav_units')}</button>
                <button class="nav-btn ${currentScreen === 'skills' ? 'active' : ''}" onclick="navigateTo('skills')">${t('nav_skills')}</button>
                <button class="nav-btn ${currentScreen === 'achievements' ? 'active' : ''}" onclick="navigateTo('achievements')">${t('nav_achievements')}</button>
            </footer>
        </div>
    `;
};