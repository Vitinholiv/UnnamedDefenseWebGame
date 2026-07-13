// js/audio.js
import { GameState } from './app.js';

export const AudioController = {
    playSFX(fileName){
        try {
            const sound = new Audio(`res/sfx/${fileName}`);
            const volume = (GameState.settings?.sfxVolume ?? 100) / 100;
            sound.volume = volume;
            sound.play();
        } catch (e){
            console.warn(`[audio.js] Erro ao tocar o SFX: ${fileName}. `, e);
        }
    }
};
window.AudioController = AudioController;