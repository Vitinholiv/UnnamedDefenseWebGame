// js/screens/achievements.js
import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { AchievementModal } from '../components/modal.js';
import { AudioController } from '../audio.js';
import { GameState } from '../app.js';
import { AchievementsData } from '../components/data.js';
import { t } from '../i18n.js';

export const AchievementsScreen = () => {
    const nodes = {};

    for(const [id, achiev] of Object.entries(AchievementsData)){
        const isClaimed = GameState.player.achievements[id] == true;
        const isCompleted = achiev.check(GameState);
        
        nodes[`a${id}`] = { 
            x: achiev.x, 
            y: achiev.y, 
            w: 100, 
            h: 100, 
            id: id,
            text: t(`a${id}_name`), 
            type: isClaimed ? 'green' : (isCompleted ? 'yellow' : 'red'), 
            imageUrl: 'ex.png' 
        };
    }

    let claimfunc = (x) => {
        return (e) => { 
            const achiev = AchievementsData[`${x}`];
            if(!achiev.check(GameState)){
                AudioController.playSFX('error.ogg');
                return;
            }
            
            AudioController.playSFX('success.ogg');
            
            GameState.player.goldCoins = (GameState.player.goldCoins || 0) + (achiev.gold || 0);
            GameState.player.silverCoins = (GameState.player.silverCoins || 0) + (achiev.silver || 0);
            GameState.player.experience = (GameState.player.experience || 0) + (achiev.exp || 0);
            
            GameState.player.achievements[`${x}`] = true;
            GameState.saveLocal();
            globalVisualSync();
        }
    };

    const html = `
        <div id="achievements-map" class="nav-world-loading" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#achievements-map', {
            worldWidth: 2000,
            worldHeight: 1400,
            zoomMax: 3.6,
        });

        for(const [id, achiev] of Object.entries(AchievementsData)){
            const isCompleted = achiev.check(GameState);
            attachModalToNode(`#a${id}`, {
                width: 450,
                height: 260,
                components: [
                    new AchievementModal({
                        achievId: id,
                        nameKey: `a${id}_name`,
                        descKey: `a${id}_desc`,
                        isCompleted: isCompleted,
                        theme: 'green',
                        onClaim: claimfunc(id),
                    })
                ]
            });
        }
        
        globalVisualSync();
    }, 0);

    return html;
};