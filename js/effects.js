// js/effects.js
export const EffectsController = {
    spawnPoorIndicator(e){
        if(!e || typeof e.clientX === 'undefined') return;

        const particle = document.createElement('div');
        particle.className = 'poor-particle';
        particle.innerText = '$!';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        document.body.appendChild(particle);
        setTimeout(() => {
            if(particle.parentNode){
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    },
    spawnBoughtIndicator(e){
        if(!e || typeof e.clientX === 'undefined') return;

        const particle = document.createElement('div');
        particle.className = 'bought-particle';
        particle.innerText = '-$';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        document.body.appendChild(particle);
        setTimeout(() => {
            if(particle.parentNode){
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
};
window.EffectsController = EffectsController;