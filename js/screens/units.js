// js/screens/units.js
import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { UnitModal } from '../components/modal.js';
import { AudioController } from '../audio.js';
import { EffectsController } from '../effects.js';
import { GameState } from '../app.js';
import { UnitsData } from '../components/data.js';
import { t } from '../i18n.js';

export const UnitsScreen = () => {
    const nodes = {};
    let dynamicLinks = '';

    for(const [id, unit] of Object.entries(UnitsData)){
        const purchased = GameState.player.units[id] == true;
        const canAfford = GameState.player.goldCoins >= unit.buyCost;
        
        nodes[`u${id}`] = { 
            x: unit.x, 
            y: unit.y, 
            w: 100, 
            h: 100, 
            id: id,
            prev: unit.prev || 0,
            price: unit.buyCost, 
            text: t(`u${id}_name`), 
            type: purchased ? 'green' : (canAfford ? 'yellow' : 'red'), 
            imageUrl: 'ex.png' 
        };
    }

    for(const [id, unit] of Object.entries(UnitsData)){
        if(unit.prev && unit.prev !== 0 && nodes[`u${unit.prev}`]){
            dynamicLinks += linkNodes(nodes[`u${unit.prev}`], nodes[`u${id}`], 'purple');
        }
    }

    let buyfunc = (x) => {
        return (e) => { 
            if(GameState.player.goldCoins < nodes[`u${x}`].price){
                AudioController.playSFX('coinless.ogg');
                EffectsController.spawnPoorIndicator(e);
                return;
            } else {
                AudioController.playSFX('coin.ogg');
                EffectsController.spawnBoughtIndicator(e);
                GameState.player.goldCoins -= nodes[`u${x}`].price;
                GameState.player.units[`${x}`] = true;
                GameState.saveLocal();
                globalVisualSync();
            }
        }
    };

    const html = `
        <div id="units-map" class="nav-world-loading" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${dynamicLinks}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#units-map', {
            worldWidth: 2800,
            worldHeight: 1400,
            zoomMax: 3.6,
        });

        for(const [id, unit] of Object.entries(UnitsData)){
            attachModalToNode(`#u${id}`, {
                width: 450,
                height: 260,
                components: [
                    new UnitModal({
                        unitId: id,
                        nameKey: `u${id}_name`,
                        descKey: `u${id}_desc`,
                        buyCost: unit.buyCost,
                        theme: 'purple',
                        onBuy: buyfunc(id),
                    })
                ]
            });
        }
        
        globalVisualSync();
    }, 0);

    return html;
};