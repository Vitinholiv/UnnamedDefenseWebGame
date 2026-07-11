import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { ModalButton, ModalImage, ModalTextBlock } from '../components/modal.js';

export const LevelsScreen = () => {
    const nodes = {
        fase1: { x: 800, y: 500, w: 120, h: 60, text: 'Fase 1', type: 'red' },
        fase2: { x: 1200, y: 700, w: 100, h: 100, text: 'Bohemian Rhapsody', type: 'green', imageUrl: 'ex.png' }
    };

    const html = `
        <div id="campaign-map" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${linkNodes(nodes.fase1,nodes.fase2,'green')}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#campaign-map', {
            worldWidth: 1600,
            worldHeight: 800,
            zoomMax: 2.5,
            zoomSpeed: 0.2,
        });

        attachModalToNode('#fase1', {
            width: 400,
            height: 200,
            components: [
                new ModalTextBlock(10, 20, 80, 40, 'Fase Inicial do Jogo.', '1.1rem')
            ]
        });

        attachModalToNode('#fase2', {
            width: 450,
            height: 350,
            components: [
                new ModalImage(37.5, 8, 25, 25, 'ex.png'), 
                new ModalTextBlock(10, 40, 80, 30, 'Bohemian Rhapsody: Distorção de realidade detectada.', '1.1rem'),
                new ModalButton(25, 78, 50, 14, 'Iniciar', 'green', (e, m) => m.destroy())
            ]
        });
    }, 0);

    return html;
};