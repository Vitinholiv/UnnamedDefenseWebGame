import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { ModalImage, LevelModal } from '../components/modal.js';
import { GameState } from '../app.js';
import { t } from '../i18n.js';

export const LevelsScreen = () => {
    const nodes = {
        f1: { x: 800, y: 500, w: 100, h: 100, text: t('f1_name'), type: GameState.player.levels['1'] == true ? 'green' : 'red', imageUrl: 'ex.png' },
        f2: { x: 1150, y: 500, w: 100, h: 100, text: t('f2_name'), type: GameState.player.levels['2'] == true ? 'green' : 'red', imageUrl: 'ex.png' },
    };

    const html = `
        <div id="campaign-map" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${linkNodes(nodes.f1,nodes.f2,'yellow')}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#campaign-map', {
            worldWidth: 4000,
            worldHeight: 2000,
            zoomMax: 4,
            zoomSpeed: 0.2,
        });

        attachModalToNode('#f1', {
            width: 450,
            height: 350,
            components: [
                new LevelModal({
                    nameKey: 'f1_name',
                    descKey: 'f1_desc',
                    enemies: ['ex.png', 'ex.png'],
                    objective: 1,
                    onPlay: () => console.log('Iniciando F1')
                })
            ]
        });

        attachModalToNode('#f2', {
            width: 450,
            height: 350,
            components: [
                new LevelModal({
                    nameKey: 'f2_name',
                    descKey: 'f2_desc',
                    enemies: ['ex.png', 'ex.png', 'ex.png', 'ex.png', 'ex.png', 'ex.png', 'ex.png'],
                    objective: 1,
                    onPlay: () => console.log('Iniciando F2')
                })
            ]
        });
    }, 0);

    return html;
};