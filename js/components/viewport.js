// js/components/viewport.js

export class SpatialViewport {
    constructor(containerSelector, options = {}) {
        this.viewport = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
        
        if (!this.viewport) {
            return;
        }

        this.config = {
            worldWidth: options.worldWidth || 3000,
            worldHeight: options.worldHeight || 2000,
            zoomMax: options.zoomMax || 3.0,
            zoomSpeed: options.zoomSpeed || 0.1,
            zoomMin: 1.0
        };

        this.state = {
            x: 0,
            y: 0,
            zoom: 1,
            isDragging: false,
            startX: 0,
            startY: 0
        };

        this.initDOM();
        this.attachEvents();
        this.updateTransform();
    }

    initDOM() {
        this.viewport.classList.add('nav-viewport');
        
        const innerContent = this.viewport.innerHTML;
        this.viewport.innerHTML = '';

        this.world = document.createElement('div');
        this.world.classList.add('nav-world');
        this.world.style.width = `${this.config.worldWidth}px`;
        this.world.style.height = `${this.config.worldHeight}px`;
        
        this.world.innerHTML = innerContent;
        this.viewport.appendChild(this.world);

        const rect = this.viewport.getBoundingClientRect();
        const scaleX = rect.width / this.config.worldWidth;
        const scaleY = rect.height / this.config.worldHeight;
        
        this.config.zoomMin = Math.max(scaleX, scaleY);
        this.state.zoom = this.config.zoomMin;
    }

    updateTransform() {
        const rect = this.viewport.getBoundingClientRect();
        const scaledWidth = this.config.worldWidth * this.state.zoom;
        const scaledHeight = this.config.worldHeight * this.state.zoom;
        
        const minX = Math.min(0, rect.width - scaledWidth);
        const minY = Math.min(0, rect.height - scaledHeight);

        this.state.x = Math.max(minX, Math.min(0, this.state.x));
        this.state.y = Math.max(minY, Math.min(0, this.state.y));
        
        this.world.style.transform = `translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.zoom})`;
    }

    attachEvents() {
        this.viewport.addEventListener('mousedown', (e) => {
            if (e.target !== this.world && e.target !== this.viewport && !e.target.closest('.nav-node')) return;
            
            this.state.isDragging = true;
            this.viewport.classList.add('dragging');
            this.state.startX = e.clientX - this.state.x;
            this.state.startY = e.clientY - this.state.y;
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.state.isDragging) return;
            
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
    }
}