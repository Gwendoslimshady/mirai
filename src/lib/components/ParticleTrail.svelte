<script>
    import { onMount } from 'svelte';

    /**
     * @typedef {Object} HSLColor
     * @property {number} h - Hue value (0-360)
     * @property {number} s - Saturation value (0-100)
     * @property {number} l - Lightness value (0-100)
     */

    /** @type {HTMLCanvasElement|undefined} */
    let canvas;
    /** @type {CanvasRenderingContext2D|undefined} */
    let ctx;
    /** @type {Array<Particle>} */
    let particles = [];
    /** @type {HSLColor|undefined} */
    let baseColor1;
    /** @type {HSLColor|undefined} */
    let baseColor2; // Store the initial random colors

    /**
     * Helper function to generate a random HSL color
     * @returns {HSLColor}
     */
    function getRandomHSLColor() {
        const h = Math.floor(Math.random() * 360); // Random hue
        const s = 70 + Math.random() * 30; // Random saturation between 70% and 100%
        const l = 50 + Math.random() * 20; // Random lightness between 50% and 70%
        return { h, s, l };
    }

    /**
     * Generate the gradient based on the current hue shift
     * @param {number} scrollRatio
     * @param {HSLColor} color1
     * @param {HSLColor} color2
     * @returns {CanvasGradient|null}
     */
    function createGlobalGradient(scrollRatio, color1, color2) {
        if (!ctx || !canvas) return null;
        
        try {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0); // Horizontal gradient

            // Adjust the hue based on scroll ratio (0 to 1)
            const hueShift1 = (color1.h + scrollRatio * 360) % 360;
            const hueShift2 = (color2.h + scrollRatio * 360) % 360;

            // Convert to HSL string format
            const shiftedColor1 = `hsl(${hueShift1}, ${color1.s}%, ${color1.l}%)`;
            const shiftedColor2 = `hsl(${hueShift2}, ${color2.s}%, ${color2.l}%)`;

            gradient.addColorStop(0, shiftedColor1); // Adjusted color1 based on hue shift
            gradient.addColorStop(1, shiftedColor2); // Adjusted color2 based on hue shift

            return gradient;
        } catch (error) {
            console.error('Error creating gradient:', error);
            return null;
        }
    }

    /**
     * @typedef {Object} ParticleProps
     * @property {number} x
     * @property {number} y
     * @property {number} size
     * @property {number} alpha
     * @property {number} speedX
     * @property {number} speedY
     * @property {string} color
     * @property {number} radiusX
     * @property {number} radiusY
     * @property {number} rotation
     */

    /**
     * @class
     */
    class Particle {
        /** @type {number} */ x = 0;
        /** @type {number} */ y = 0;
        /** @type {number} */ size = 0;
        /** @type {number} */ alpha = 1;
        /** @type {number} */ speedX = 0;
        /** @type {number} */ speedY = 0;
        /** @type {string} */ color = 'rgba(0,0,0,1)';
        /** @type {number} */ radiusX = 0;
        /** @type {number} */ radiusY = 0;
        /** @type {number} */ rotation = 0;

        /**
         * @param {number} x
         * @param {number} y
         * @param {CanvasGradient} globalGradient
         */
        constructor(x, y, globalGradient) {
            if (!canvas || !globalGradient) return;
            this.x = x;
            this.y = y;
            this.size = Math.random() * 80 + 20;
            this.alpha = 1;

            // Wind effect
            this.speedX = Math.random() * 3 + 1;
            this.speedY = Math.random() * 2 - 1;

            // Create a temporary canvas to sample the global gradient
            const gradientCanvas = document.createElement('canvas');
            gradientCanvas.width = canvas?.width || 0;
            gradientCanvas.height = 1;
            const gradientCtx = gradientCanvas.getContext('2d');
            
            if (!gradientCtx) {
                this.color = 'rgba(0,0,0,1)'; // Fallback color
                return;
            }

            gradientCtx.fillStyle = globalGradient;
            gradientCtx.fillRect(0, 0, gradientCanvas.width, 1);

            // Sample the color based on the particle's x position
            const imageData = gradientCtx.getImageData(this.x, 0, 1, 1).data;
            this.color = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;

            // Store ellipse size and rotation (fixed for consistency)
            this.radiusX = this.size * (Math.random() * 0.7 + 0.6);
            this.radiusY = this.size * (Math.random() * 0.5 + 0.7);
            this.rotation = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.005;
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        draw(ctx) {
            try {
                if (this.alpha > 0.05) {
                    const gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.1, this.x, this.y, this.size);
                    const colorMatch = this.color.match(/\d+/g);
                    if (!colorMatch) return;
                    
                    const rgbValues = colorMatch.slice(0, 3).join(',');
                    gradient.addColorStop(0, `rgba(${rgbValues}, ${this.alpha})`);
                    gradient.addColorStop(1, `rgba(${rgbValues}, 0)`);

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = gradient;

                    ctx.beginPath();
                    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }
            } catch (error) {
                console.error('Error drawing particle:', error);
            }
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {CanvasGradient} globalGradient
     */
    function addParticle(x, y, globalGradient) {
        if (!canvas || !globalGradient) return;
        const particle = new Particle(x, y, globalGradient);
        if (particle) {
            particles.push(particle);
            if (particles.length > 100) {
                particles.shift(); // Limit particle count
            }
        }
    }

    /**
     * @param {CanvasGradient} globalGradient
     */
    function animate(globalGradient) {
        if (!ctx || !canvas) return;

        try {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Use filter instead of forEach to safely remove particles
            particles = particles.filter(particle => {
                if (particle && particle.update && particle.draw && ctx) {
                    particle.update();
                    particle.draw(ctx);
                    return particle.alpha > 0.05;
                }
                return false;
            });

            requestAnimationFrame(() => animate(globalGradient));
        } catch (error) {
            console.error('Error in animation:', error);
        }
    }

    onMount(async () => {
        try {
            // Wait for next tick to ensure canvas is mounted
            await new Promise(resolve => setTimeout(resolve, 0));
            
            if (!canvas) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Failed to get canvas context');
            ctx = context;
            if (!ctx) return;

            // Generate random colors when the page loads
            baseColor1 = getRandomHSLColor();
            baseColor2 = getRandomHSLColor();

            let scrollRatio = 0;

            // Create initial gradient based on random colors
            let globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
            if (!globalGradient) return;

            animate(globalGradient);

            window.addEventListener('mousemove', (e) => {
                if (globalGradient) {
                    addParticle(e.clientX, e.clientY, globalGradient);
                }
            });

            // Listen for scroll events and update the hue based on scroll position
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                scrollRatio = scrollTop / documentHeight; // Calculate the scroll ratio (0 to 1)

                // Update the gradient with the hue shift based on scroll position
                if (baseColor1 && baseColor2) {
                    globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
                }
            });

            window.addEventListener('resize', () => {
                if (!canvas || !baseColor1 || !baseColor2) return;
                
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
            });
        } catch (error) {
            console.error('Error in ParticleTrail setup:', error);
        }
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1; /* Ensure the canvas is behind other content */
        pointer-events: none; /* Let clicks pass through */
    }
</style>
