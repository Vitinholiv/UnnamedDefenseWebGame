import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes } from '../components/graph.js';

export const LevelsScreen = () => {
    const nodes = {
        fase1: { x: 800, y: 500 },
        fase2: { x: 1200, y: 700 }
    };

    const html = `
        <div id="campaign-map" style="width: 100%; height: 100%;">
            ${linkNodes(
                nodes.fase1,
                nodes.fase2,
                'green'
            )}
            ${createNode(nodes.fase1.x, nodes.fase1.y, 120, 60, "Fase 1", "red")}
            ${createNode(nodes.fase2.x, nodes.fase2.y, 100, 100, "Bohemian Rhapsody", "green", "ex.png")}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#campaign-map', {
            worldWidth: 1600,
            worldHeight: 800,
            zoomMax: 2.5,
            zoomSpeed: 0.2,
        });
    }, 0);

    return html;
};