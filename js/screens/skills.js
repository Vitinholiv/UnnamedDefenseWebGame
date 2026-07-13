import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { ModalImage, SkillsModal } from '../components/modal.js';
import { GameState } from '../app.js';
import { t } from '../i18n.js';

export const SkillsScreen = () => {
    const nodes = {
        s1: { x: 800, y: 500, w: 100, h: 100, text: t('s1_name'), type: GameState.player.skills['1'] == true ? 'green' : 'red', imageUrl: 'ex.png' },
        s2: { x: 1150, y: 500, w: 100, h: 100, text: t('s2_name'), type: GameState.player.skills['2'] == true ? 'green' : 'red', imageUrl: 'ex.png' },
    };

    const html = `
        <div id="skills-map" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${linkNodes(nodes.s1,nodes.s2,'blue')}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#skills-map', {
            worldWidth: 3200,
            worldHeight: 1600,
            zoomMax: 3.6,
            zoomSpeed: 0.2,
        });

        attachModalToNode('#s1', {
            width: 450,
            height: 260,
            components: [
                new SkillsModal({
                    nameKey: 's1_name',
                    descKey: 's1_desc',
                    statsKey: 's1_stats',
                    onPlay: () => console.log('Comprando S1')
                })
            ]
        });

        attachModalToNode('#s2', {
            width: 450,
            height: 260,
            components: [
                new SkillsModal({
                    nameKey: 's2_name',
                    descKey: 's2_desc',
                    statsKey: 's2_stats',
                    onPlay: () => console.log('Comprando S2')
                })
            ]
        });
    }, 0);

    return html;
};