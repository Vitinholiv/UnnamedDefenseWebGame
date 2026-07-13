// js/screens/skills.js
import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { ModalImage, SkillsModal } from '../components/modal.js';
import { AudioController } from '../audio.js';
import { EffectsController } from '../effects.js';
import { GameState } from '../app.js';
import { t } from '../i18n.js';

export const SkillsScreen = () => {
    const nodes = {
        s1: { x: 800, y: 500, w: 100, h: 100, price: 25, text: t('s1_name'), type: GameState.player.skills['1'] == true ? 'green' : 'red', imageUrl: 'ex.png' },
        s2: { x: 1150, y: 500, w: 100, h: 100, price: 70, text: t('s2_name'), type: GameState.player.skills['2'] == true ? 'green' : 'red', imageUrl: 'ex.png' },
    };

    let buyfunc = (x) => {
        let kf = (e) => { 
            if(GameState.player.goldCoins < nodes[`s${x}`].price){
                AudioController.playSFX('coinless.ogg');
                EffectsController.spawnPoorIndicator(e);
                return;
            } else {
                AudioController.playSFX('coin.ogg');
                EffectsController.spawnBoughtIndicator(e);
                GameState.player.goldCoins -= nodes[`s${x}`].price;
                GameState.player.skills[`${x}`] = true;
                GameState.saveLocal();
                globalVisualSync();
            }
        }
        return kf;
    };

    const html = `
        <div id="skills-map" class="nav-world-loading" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${linkNodes(nodes.s1,nodes.s2,'blue')}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#skills-map', {
            worldWidth: 3200,
            worldHeight: 1600,
            zoomMax: 3.6,
        });

        attachModalToNode('#s1', {
            width: 450,
            height: 260,
            components: [
                new SkillsModal({
                    skillId: '1',
                    nameKey: 's1_name',
                    descKey: 's1_desc',
                    statsKey: 's1_stats',
                    price: nodes.s1.price,
                    theme: 'blue',
                    onBuy: buyfunc(1),
                })
            ]
        });

        attachModalToNode('#s2', {
            width: 450,
            height: 260,
            components: [
                new SkillsModal({
                    skillId: '2',
                    nameKey: 's2_name',
                    descKey: 's2_desc',
                    statsKey: 's2_stats',
                    price: nodes.s2.price,
                    theme: 'blue',
                    onBuy: buyfunc(2),
                })
            ]
        });
    }, 0);

    return html;
};