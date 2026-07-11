// Base Component para os elementos internos do modal
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

        const img = document.createElement('img');
        img.src = this.src;
        img.classList.add('nav-node-img');
        img.style.objectFit = 'contain';

        wrapper.appendChild(img);
        return wrapper;
    }
}

export class ModalButton extends ModalComponent {
    constructor(x, y, w, h, text, styleType = 'blue', onClickFn = () => {}){
        super(x, y, w, h);
        this.text = text;
        this.styleType = styleType;
        this.onClickFn = onClickFn;
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

        btn.addEventListener('click', (e) => {
            this.onClickFn(e, modalInstance);
        });

        container.appendChild(btn);
        return container;
    }
}

export class ModalTextBlock extends ModalComponent {
    constructor(x, y, w, h, text, fontSize = '1rem'){
        super(x, y, w, h);
        this.text = text;
        this.fontSize = fontSize;
    }

    render(){
        const textBlock = document.createElement('div');
        this.applyBaseStyles(textBlock);
        
        textBlock.style.color = '#c5c6c7';
        textBlock.style.fontFamily = "'Rajdhani', sans-serif";
        textBlock.style.fontSize = this.fontSize;
        textBlock.style.textAlign = 'justify';
        textBlock.style.overflow = 'hidden';
        textBlock.style.textOverflow = 'ellipsis';
        textBlock.style.lineHeight = '1.4';
        
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
            if (!this.element.contains(e.target)) {
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
            if (this.element && this.element.parentNode){
                this.element.parentNode.removeChild(this.element);
            }
        }, 200);
    }
}