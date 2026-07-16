export class SpatialViewport {
    constructor(containerSelector, options = {}){
        this.viewport = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;        
        if(!this.viewport) return;

        this.config = {
            worldWidth: options.worldWidth || 1600,
            worldHeight: options.worldHeight || 732,
            zoomMax: options.zoomMax || 3.0,
            zoomSpeed: options.zoomSpeed || 0.3,
            zoomMin: 1.0,
            backgroundImage: options.backgroundImage || null
        };

        this.state = {
            x: 0,
            y: 0,
            zoom: 1,
            isDragging: false,
            startX: 0,
            startY: 0,
            rawMouseX: null,
            rawMouseY: null
        };

        this.initDOM();
        this.attachEvents();
        this.updateTransform();
    }

    initDOM(){
        this.viewport.classList.add('nav-viewport');
        
        const innerContent = this.viewport.innerHTML;
        this.viewport.innerHTML = '';

        this.world = document.createElement('div');
        this.world.classList.add('nav-world');
        this.world.style.width = `${this.config.worldWidth}px`;
        this.world.style.height = `${this.config.worldHeight}px`;

        if(this.config.backgroundImage){
            this.world.style.backgroundImage = `url('${this.config.backgroundImage}')`;
            this.world.style.backgroundSize = '100% 100%';
            this.world.style.backgroundPosition = 'center';
            this.world.style.backgroundRepeat = 'no-repeat';
        }
        
        this.world.innerHTML = innerContent;
        this.viewport.appendChild(this.world);

        this.state.zoom = this.config.zoomMin;

        const rect = this.viewport.getBoundingClientRect();
        const baseScale = Math.max(rect.width / this.config.worldWidth, rect.height / this.config.worldHeight);
        const scaledWidth = this.config.worldWidth * baseScale * this.state.zoom;
        const scaledHeight = this.config.worldHeight * baseScale * this.state.zoom;

        this.state.x = (rect.width - scaledWidth) / 2;
        this.state.y = (rect.height - scaledHeight) / 2;

        this.viewport.classList.remove('nav-world-loading');
        requestAnimationFrame(() => {
            this.world.classList.add('ready');
        });
    }

    updateTransform(){
        const rect = this.viewport.getBoundingClientRect();
        
        const baseScale = Math.max(rect.width / this.config.worldWidth, rect.height / this.config.worldHeight);
        const currentScale = baseScale * this.state.zoom;
        
        const scaledWidth = this.config.worldWidth * currentScale;
        const scaledHeight = this.config.worldHeight * currentScale;
        
        if(scaledWidth < rect.width){
            this.state.x = (rect.width - scaledWidth) / 2;
        } else {
            const minX = rect.width - scaledWidth;
            this.state.x = Math.max(minX, Math.min(0, this.state.x));
        }

        if(scaledHeight < rect.height){
            this.state.y = (rect.height - scaledHeight) / 2;
        } else {
            const minY = rect.height - scaledHeight;
            this.state.y = Math.max(minY, Math.min(0, this.state.y));
        }
        
        this.world.style.transform = `translate(${this.state.x}px, ${this.state.y}px) scale(${currentScale})`;
    }

    attachEvents(){
        this.viewport.addEventListener('mousedown', (e) => {
            if(e.target !== this.world && e.target !== this.viewport && !e.target.closest('.nav-node')) return;
            
            this.state.isDragging = true;
            this.viewport.classList.add('dragging');
            this.state.startX = e.clientX - this.state.x;
            this.state.startY = e.clientY - this.state.y;
        });

        window.addEventListener('mousemove', (e) => {
            this.state.rawMouseX = e.clientX;
            this.state.rawMouseY = e.clientY;

            if(!this.state.isDragging) return;
            
            this.state.x = e.clientX - this.state.startX;
            this.state.y = e.clientY - this.state.startY;
            this.updateTransform();
        });

        window.addEventListener('mouseup', () => {
            this.state.isDragging = false;
            this.viewport.classList.remove('dragging');
        });

        window.addEventListener('mouseleave', () => {
            this.state.isDragging = false;
            this.viewport.classList.remove('dragging');
        });

        this.viewport.addEventListener('wheel', (e) => {
            e.preventDefault();

            const rect = this.viewport.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const delta = e.deltaY > 0 ? -this.config.zoomSpeed : this.config.zoomSpeed;
            let newZoom = Math.min(Math.max(this.state.zoom + delta, this.config.zoomMin), this.config.zoomMax);

            const scaleRatio = newZoom / this.state.zoom;
            this.state.x = mouseX - (mouseX - this.state.x) * scaleRatio;
            this.state.y = mouseY - (mouseY - this.state.y) * scaleRatio;
            
            this.state.zoom = newZoom;
            this.updateTransform();
        }, { passive: false });
        
        window.addEventListener('resize', () => {
            this.updateTransform();
        });

        setInterval(() => {
            if(this.state.rawMouseX === null || this.state.rawMouseY === null) return;
            
            const rect = this.viewport.getBoundingClientRect();
            const mouseX = this.state.rawMouseX - rect.left;
            const mouseY = this.state.rawMouseY - rect.top;

            const baseScale = Math.max(rect.width / this.config.worldWidth, rect.height / this.config.worldHeight);
            const currentScale = baseScale * this.state.zoom;

            const worldX = (mouseX - this.state.x) / currentScale;
            const worldY = (mouseY - this.state.y) / currentScale;

            console.log(`x: ${Math.round(worldX)}, y: ${Math.round(worldY)}`);
        }, 1000);
    }
}