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
    const nodePositions = [
        {x: 200, y: 200}, {x: 400, y: 200}, {x: 1400, y: 200}, {x: 1400, y: 1000}, {x: 1400, y: 1200},
        {x: 1400, y: 800}, {x: 400, y: 400}, {x: 1600, y: 1000}, {x: 200, y: 1000}, {x: 1200, y: 1200},
        {x: 200, y: 800}, {x: 400, y: 1000}, {x: 1400, y: 400}, {x: 200, y: 1200}, {x: 1800, y: 1000},
        {x: 1600, y: 400}, {x: 600, y: 200}, {x: 1600, y: 200}, {x: 800, y: 200}, {x: 600, y: 400},
        {x: 1800, y: 1200},
    ];
    const moveType = [
        0, 0, 0, 1, 0,
        1, 0, 0, 0, 1,
        0, 0, 0, 1, 0,
        0, 0, 0, 0, 0,
        0,
    ]
    const prevNode = [
        0, 1, 0, 0, 4,
        4, 2, 4, 0, 5,
        9, 9, 3, 9, 8,
        13, 2, 3, 17, 7,
        15,
    ]

    const nodes = {};
    for(let i = 1; i <= 21; i++){
        const pos = nodePositions[i-1];
        const skill = SkillsData[`${i}`];
        const purchased = GameState.player.skills[i] == true;
        const canAfford = GameState.player.goldCoins >= skill.price;
        
        nodes[`s${i}`] = { 
            x: pos.x, 
            y: pos.y, 
            w: 100, 
            h: 100, 
            id: `${i}`,
            prev: prevNode[i-1],
            node: 'skill',
            price: skill.price, 
            text: t(`s${i}_name`), 
            type: purchased ? 'green' : (canAfford ? 'yellow' : 'red'), 
            imageUrl: 'ex.png' 
        };
    }

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
            ${linkNodes(nodes.s9,nodes.s11,'blue')}
            ${linkNodes(nodes.s9,nodes.s12,'blue')}
            ${linkNodes(nodes.s9,nodes.s14,'blue')}
            ${linkNodes(nodes.s4,nodes.s5,'blue')}
            ${linkNodes(nodes.s4,nodes.s6,'blue')}
            ${linkNodes(nodes.s4,nodes.s8,'blue')}
            ${linkNodes(nodes.s5,nodes.s10,'blue')}
            ${linkNodes(nodes.s8,nodes.s15,'blue')}
            ${linkNodes(nodes.s15,nodes.s21,'blue')}
            ${linkNodes(nodes.s2,nodes.s7,'blue')}
            ${linkNodes(nodes.s2,nodes.s17,'blue')}
            ${linkNodes(nodes.s7,nodes.s20,'blue')}
            ${linkNodes(nodes.s17,nodes.s19,'blue')}
            ${linkNodes(nodes.s3,nodes.s13,'blue')}
            ${linkNodes(nodes.s13,nodes.s16,'blue')}
            ${linkNodes(nodes.s3,nodes.s18,'blue')}
        </div>
    `;

    setTimeout(() => {
        new SpatialViewport('#skills-map', {
            worldWidth: 2600,
            worldHeight: 1400,
            zoomMax: 3.6,
        });

        for(let i = 1; i <= 21; i++){
            attachModalToNode(`#s${i}`, {
                width: 450,
                height: 260,
                components: [
                    new SkillsModal({
                        skillId: `${i}`,
                        nameKey: `s${i}_name`,
                        descKey: `s${i}_desc`,
                        statsType: moveType[i-1],
                        price: SkillsData[i].price,
                        theme: 'blue',
                        onBuy: buyfunc(i),
                    })
                ]
            });
        }
        
        globalVisualSync();
    }, 0);

    return html;
};