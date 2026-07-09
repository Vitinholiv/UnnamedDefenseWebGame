// js/ui.js
import { t } from './i18n.js';

export const GameUI = {
    showAlert(message, type = 'error') {
        let overlay = document.getElementById('game-alert-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'game-alert-overlay';
            overlay.className = 'game-alert-overlay';
            document.body.appendChild(overlay);
        }

        const title = type === 'error' ? t('alert_error_title') || 'FALHA NO SISTEMA' : t('alert_info_title') || 'INFORMAÇÃO';
        const typeClass = type === 'error' ? 'alert-error' : 'alert-info';

        overlay.innerHTML = `
            <div class="game-alert-box ${typeClass}">
                <div class="game-alert-title">${title}</div>
                <div class="game-alert-msg">${message}</div>
                <button class="game-btn game-alert-btn" onclick="document.getElementById('game-alert-overlay').classList.remove('active')">
                    ${t('alert_btn_ok') || 'CONFIRMAR'}
                </button>
            </div>
        `;
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }
};
window.GameUI = GameUI;