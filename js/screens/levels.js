//js/screens/levels.js
import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { ModalImage, LevelModal } from '../components/modal.js';
import { GameState } from '../app.js';
import { t } from '../i18n.js';
import { LevelsData } from '../components/data.js';

export const LevelsScreen = () => {
    const nodes = {};
    let dynamicLinks = '';

    for(const [id, level] of Object.entries(LevelsData)){
        const isBeaten = GameState.player.levels[id] == true;
        
        nodes[`f${id}`] = { 
            x: level.x, 
            y: level.y, 
            w: 100, 
            h: 100, 
            id: id,
            prev: level.prev,
            text: t(`f${id}_name`), 
            type: isBeaten ? 'green' : 'red', 
            imageUrl: 'ex.png' 
        };
    }

    for(const [id, level] of Object.entries(LevelsData)){
        if(level.prev !== 0 && nodes[`f${level.prev}`]){
            dynamicLinks += linkNodes(nodes[`f${level.prev}`], nodes[`f${id}`], 'red');
        }
    }

    let playFunc = (x) => {
        return (e) => {
            const level = LevelsData[`${x}`];

            GameState.player.levels[`${x}`] = true;
            GameState.player.goldCoins = (GameState.player.goldCoins || 0) + (level.gold || 0);
            GameState.player.silverCoins = (GameState.player.silverCoins || 0) + (level.silver || 0);
            GameState.player.experience = (GameState.player.experience || 0) + (level.exp || 0);

            GameState.saveLocal();
            globalVisualSync();
        }
    };

    const html = `
        <div id="campaign-map" class="nav-world-loading" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${dynamicLinks}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#campaign-map', {
            worldWidth: 2200,
            worldHeight: 1600,
            zoomMax: 3,
        });

        for(const [key, node] of Object.entries(nodes)){
            const id = node.id;
            const level = LevelsData[id];
            
            attachModalToNode(`#${key}`, {
                width: 450,
                height: 350,
                components: [
                    new LevelModal({
                        nameKey: `f${id}_name`,
                        descKey: `f${id}_desc`,
                        enemies: level.enemies,
                        objective: level.objective,
                        onPlay: playFunc(id)
                    })
                ]
            });
        }

        if(typeof globalVisualSync === 'function'){
            globalVisualSync();
        }
    }, 0);

    return html;
};