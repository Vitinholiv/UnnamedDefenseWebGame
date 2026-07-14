// js/screens/skills.js
import { SpatialViewport } from '../components/viewport.js';
import { createEdge, createNode, linkNodes, createAllNodes, attachModalToNode } from '../components/graph.js';
import { ModalImage, SkillsModal } from '../components/modal.js';
import { AudioController } from '../audio.js';
import { EffectsController } from '../effects.js';
import { GameState } from '../app.js';
import { SkillsData } from '../components/data.js';
import { t } from '../i18n.js';

export const SkillsScreen = () => {
    const nodes = {};
    let dynamicLinks = '';

    for(const [id, skill] of Object.entries(SkillsData)){
        const purchased = GameState.player.skills[id] == true;
        const canAfford = GameState.player.goldCoins >= skill.price;
        
        nodes[`s${id}`] = { 
            x: skill.x, 
            y: skill.y, 
            w: 100, 
            h: 100, 
            id: id,
            prev: skill.prev,
            node: 'skill',
            price: skill.price, 
            text: t(`s${id}_name`), 
            type: purchased ? 'green' : (canAfford ? 'yellow' : 'red'), 
            imageUrl: 'ex.png' 
        };
    }

    for(const [id, skill] of Object.entries(SkillsData)){
        if(skill.prev !== 0 && nodes[`s${skill.prev}`]){
            dynamicLinks += linkNodes(nodes[`s${skill.prev}`], nodes[`s${id}`], 'blue');
        }
    }

    let buyfunc = (x) => {
        return (e) => { 
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
    };

    const html = `
        <div id="skills-map" class="nav-world-loading" style="width: 100%; height: 100%;">
            ${createAllNodes(nodes)}
            ${dynamicLinks}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#skills-map', {
            worldWidth: 2600,
            worldHeight: 1400,
            zoomMax: 3.6,
        });

        // Associa os modais dinamicamente
        for(const [id, skill] of Object.entries(SkillsData)){
            attachModalToNode(`#s${id}`, {
                width: 450,
                height: 260,
                components: [
                    new SkillsModal({
                        skillId: id,
                        nameKey: `s${id}_name`,
                        descKey: `s${id}_desc`,
                        statsType: skill.moveType,
                        price: skill.price,
                        theme: 'blue',
                        onBuy: buyfunc(id),
                    })
                ]
            });
        }
        
        globalVisualSync();
    }, 0);

    return html;
};