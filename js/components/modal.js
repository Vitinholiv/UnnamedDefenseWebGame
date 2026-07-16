//js/components/modal.js
import { t } from '../i18n.js';
import { GameState } from '../app.js';

class ModalComponent {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    applyBaseStyles(element){
        element.style.position = 'absolute';
        element.style.left = `${this.x}%`;
        element.style.top = `${this.y}%`;
        element.style.width = `${this.w}%`;
        element.style.height = `${this.h}%`;
    }
}

export class ModalImage extends ModalComponent {
    constructor(x, y, w, h, fileName){
        super(x, y, w, h);
        this.src = `res/${fileName}`;
    }

    render(){
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-node-img-wrapper');
        this.applyBaseStyles(wrapper);
        
        wrapper.style.boxShadow = 'none';
        wrapper.style.borderRadius = '0';
        wrapper.style.border = 'none';
        wrapper.style.backgroundColor = 'transparent';
        
        wrapper.style.height = 'auto';
        wrapper.style.aspectRatio = '1 / 1';

        const img = document.createElement('img');
        img.src = this.src;
        img.classList.add('nav-node-img');
        img.style.objectFit = 'contain';
        img.style.borderRadius = '0';
        img.style.width = '100%';
        img.style.height = '100%';

        wrapper.appendChild(img);
        return wrapper;
    }
}

export class ModalButton extends ModalComponent {
    constructor(x, y, w, h, text, styleType = 'blue', onClickFn = () => {}, disabled = false){
        super(x, y, w, h);
        this.text = text;
        this.styleType = styleType;
        this.onClickFn = onClickFn;
        this.disabled = disabled;
    }

    render(modalInstance){
        const container = document.createElement('div');
        container.classList.add('nav-node', this.styleType);
        this.applyBaseStyles(container);
        container.style.transform = 'none';

        const btn = document.createElement('button');
        btn.classList.add('game-btn');
        btn.style.width = '100%';
        btn.style.height = '100%';
        btn.style.marginTop = '0';
        btn.style.padding = '0';
        btn.innerText = this.text;

        if(this.disabled){
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
        } else {
            btn.addEventListener('click', (e) => {
                this.onClickFn(e, modalInstance);
            });
        }

        container.appendChild(btn);
        return container;
    }
}

export class ModalTextBlock extends ModalComponent {
    constructor(x, y, w, h, text, fontSize = '1rem', customStyles = {}){
        super(x, y, w, h);
        this.text = text;
        this.fontSize = fontSize;
        this.customStyles = customStyles;
    }

    render(){
        const textBlock = document.createElement('div');
        this.applyBaseStyles(textBlock);
        
        textBlock.style.color = this.customStyles.color || '#c5c6c7';
        textBlock.style.fontFamily = "'Orbitron', sans-serif";
        textBlock.style.fontSize = this.fontSize;
        textBlock.style.textAlign = 'justify';
        textBlock.style.overflow = 'hidden';
        textBlock.style.textOverflow = 'ellipsis';
        textBlock.style.lineHeight = '1.4';

        if(this.customStyles.border){
            textBlock.style.border = this.customStyles.border;
            textBlock.style.borderRadius = '0';
            textBlock.style.padding = '5px';
            textBlock.style.boxSizing = 'border-box';
        }
        
        textBlock.innerText = this.text;
        return textBlock;
    }
}

export class FloatingModal {
    constructor(options = {}){
        this.id = options.id || null;
        this.width = options.width || 500;
        this.height = options.height || 400;
        this.components = options.components || [];
        this.createDOM();
    }

    createDOM(){
        const existingModal = document.querySelector('.floating-modal');
        if(existingModal){
            const existingId = existingModal.getAttribute('data-id');
            existingModal.remove();
            if(this.id && existingId === this.id){
                return;
            }
        }

        this.element = document.createElement('div');
        this.element.classList.add('floating-modal');
        if(this.id){
            this.element.setAttribute('data-id', this.id);
        }
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.outsideClickListener = (e) => {
            if(!this.element.contains(e.target)){
                this.destroy();
            }
        };

        setTimeout(() => {
            document.addEventListener('click', this.outsideClickListener);
        }, 10);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('modal-close-btn');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => this.destroy());
        this.element.appendChild(closeBtn);

        this.components.forEach(comp => {
            this.element.appendChild(comp.render(this));
        });

        document.body.appendChild(this.element);
        requestAnimationFrame(() => {
            this.element.classList.add('active');
        });
    }

    destroy(){
        document.removeEventListener('click', this.outsideClickListener);
        this.element.classList.remove('active');
        setTimeout(() => {
            if(this.element && this.element.parentNode){
                this.element.parentNode.removeChild(this.element);
            }
        }, 200);
    }
}

export class LevelModal {
    constructor(options = {}){
        this.nameKey = options.nameKey || "";
        this.descKey = options.descKey || "";
        this.enemies = options.enemies || [];
        this.objective = `level_objective${options.objective || 1}`;
        this.onPlay = options.onPlay || (() => {});
        this.extraComponents = options.extraComponents || [];
        this.theme = options.theme || 'yellow'; 
    }

    render(modalInstance){
        modalInstance.element.classList.add(this.theme);
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';

        const content = [
            new ModalTextBlock(5, 5, 90, 10, t(this.nameKey), '1.4rem', { color: 'var(--theme-vivid)' }),
            new ModalTextBlock(5, 20, 90, 30, t(this.descKey), '1.0rem', { border: '1px solid var(--theme-strong)', color: 'var(--theme-strong)' }),
            new ModalTextBlock(5, 54, 90, 10, t(this.objective), '1.1rem', { color: 'var(--theme-vivid)' }),
            new ModalButton(25, 81, 50, 15, t('btn_start'), this.theme, (e, m) => {
                this.onPlay(e);
                m.destroy();
            }),
            ...this.extraComponents
        ];

        if(this.enemies && this.enemies.length > 0){
            this.enemies.forEach((enemyImg, index) => {
                const enemyX = 5 + (index * 13);
                content.push(new ModalImage(enemyX, 62, 11, 11, enemyImg));
            });
        }

        content.forEach(comp => {
            container.appendChild(comp.render(modalInstance));
        });

        return container;
    }
}

export class SkillsModal {
    constructor(options = {}){
        this.skillId = options.skillId || "";
        this.nameKey = options.nameKey || "";
        this.descKey = options.descKey || "";
        this.statsType = options.statsType || 0;
        this.price = options.price || "0";
        this.onBuy = options.onBuy || (() => {});
        this.extraComponents = options.extraComponents || [];
        this.theme = options.theme || 'blue';
    }

    render(modalInstance){
        modalInstance.element.classList.add(this.theme);
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';

        const isPurchased = this.skillId && GameState.player.skills[this.skillId] === true;
        const btnText = isPurchased ? (t('btn_purchased')) : t('btn_buy');
        const btnTheme = isPurchased ? 'locked' : this.theme;

        const content = [
            new ModalTextBlock(5, 6, 90, 14, t(this.nameKey), '1.4rem', { color: 'var(--theme-vivid)' }),
            new ModalTextBlock(5, 24, 90, 36, t(this.descKey), '0.95rem', { border: '1px solid var(--theme-strong)', color: 'var(--theme-strong)' }),
            new ModalTextBlock(5, 66, 90, 12, `${this.statsType == 0 ? t('skill_stats',this.skillId) : t('skill_stats_t',this.skillId)}`, '0.8rem', { color: 'var(--theme-vivid)' }),
            new ModalButton(25, 80, 50, 16, btnText, btnTheme, (e, m) => {
                this.onBuy(e);
                m.destroy();
            }, isPurchased),
            ...this.extraComponents
        ];

        content.forEach(comp => {
            container.appendChild(comp.render(modalInstance));
        });

        return container;
    }
}

export class UnitModal {
    constructor(options = {}){
        this.unitId = options.unitId || "";
        this.nameKey = options.nameKey || "";
        this.descKey = options.descKey || "";
        this.buyCost = options.buyCost || 0;
        this.onBuy = options.onBuy || (() => {});
        this.theme = options.theme || 'purple';
    }

    render(modalInstance){
        modalInstance.element.classList.add(this.theme);
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';

        const isPurchased = this.unitId && GameState.player.units[this.unitId] === true;
        const btnText = isPurchased ? t('btn_purchased') : t('btn_buy');
        const btnTheme = isPurchased ? 'locked' : this.theme;

        const content = [
            new ModalTextBlock(5, 6, 90, 14, t(this.nameKey), '1.4rem', { color: 'var(--theme-vivid)' }),
            new ModalTextBlock(5, 24, 90, 36, t(this.descKey), '0.95rem', { border: '1px solid var(--theme-strong)', color: 'var(--theme-strong)' }),
            new ModalTextBlock(5, 66, 90, 12, t('unit_stats', this.unitId), '0.8rem', { color: 'var(--theme-vivid)' }),
            new ModalButton(25, 80, 50, 16, btnText, btnTheme, (e, m) => {
                this.onBuy(e);
                m.destroy();
            }, isPurchased)
        ];

        content.forEach(comp => {
            container.appendChild(comp.render(modalInstance));
        });

        return container;
    }
}

export class AchievementModal {
    constructor(options = {}){
        this.achievId = options.achievId || "";
        this.nameKey = options.nameKey || "";
        this.descKey = options.descKey || "";
        this.isCompleted = options.isCompleted || false;
        this.onClaim = options.onClaim || (() => {});
        this.theme = options.theme || 'green';
    }

    render(modalInstance){
        modalInstance.element.classList.add(this.theme);
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';

        const isClaimed = this.achievId && GameState.player.achievements[this.achievId] === true;
        
        let btnText = t('btn_claim');
        let btnTheme = this.theme;
        let disabled = false;
        
        if(isClaimed){
            btnText = t('btn_claimed');
            btnTheme = 'locked';
            disabled = true;
        } else if(!this.isCompleted){
            btnText = t('btn_locked');
            btnTheme = 'locked';
            disabled = true;
        }

        const content = [
            new ModalTextBlock(5, 6, 90, 14, t(this.nameKey), '1.4rem', { color: 'var(--theme-vivid)' }),
            new ModalTextBlock(5, 24, 90, 36, t(this.descKey), '0.95rem', { border: '1px solid var(--theme-strong)', color: 'var(--theme-strong)' }),
            new ModalTextBlock(5, 66, 90, 12, t('achiev_rewards', this.achievId), '0.8rem', { color: 'var(--theme-vivid)' }),
            new ModalButton(25, 80, 50, 16, btnText, btnTheme, (e, m) => {
                this.onClaim(e);
                m.destroy();
            }, disabled)
        ];

        content.forEach(comp => {
            container.appendChild(comp.render(modalInstance));
        });

        return container;
    }
}