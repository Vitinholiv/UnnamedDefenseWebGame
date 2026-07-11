// js/components/graph.js
import { FloatingModal } from './modal.js';

export const createEdge = (x1, y1, x2, y2, type = '') => {
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return `
        <div class="nav-edge ${type}" 
             style="width: ${length}px; top: ${y1}px; left: ${x1}px; transform: translateY(-50%) rotate(${angle}deg);">
        </div>
    `;
};

export const createNode = (id, x, y, w, h, text, type = '', imageUrl = null) => {
    let content = '';
    if(imageUrl){
        content = `
            <div class="nav-node-img-wrapper" style="width: ${w}px; height: ${h}px;">
                <img src="res/${imageUrl}" class="nav-node-img" alt="${text}">
            </div>
            <div class="nav-node-label">${text}</div>
        `;
    } else {
        content = `<button class="game-btn" style="width: ${w}px; height: ${h}px;">${text}</button>`;
    }
    return `
        <div id="${id}" class="nav-node ${type}" style="top: ${y}px; left: ${x}px;">
            ${content}
        </div>
    `;
};

export const createAllNodes = (allNodes) => {
    let restr = ``;
    for(const [key, node] of Object.entries(allNodes)){
        restr += createNode(key, node.x, node.y, node.w, node.h, node.text, node.type, node.imageUrl);
    }
    return restr;
};

export const linkNodes = (n1, n2, type = '') => {
    const x1 = n1.x; const y1 = n1.y;
    const x2 = n2.x; const y2 = n2.y;
    return createEdge(x1,y1,x2,y2,type);
}

export function attachModalToNode(containerSelector, modalOptions){
    const nodeElement = document.querySelector(containerSelector);
    if(!nodeElement) return;

    nodeElement.addEventListener('click', (e) => {
        e.stopPropagation();
        new FloatingModal({
            id: containerSelector,
            ...modalOptions
        });
    });
}