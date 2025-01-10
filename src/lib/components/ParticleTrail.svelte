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
        try {
            const h = Math.floor(Math.random() * 360); // Random hue
            const s = 70 + Math.random() * 30; // Random saturation between 70% and 100%
            const l = 50 + Math.random() * 20; // Random lightness between 50% and 70%
            // Validate values before returning
            return {
                h: isNaN(h) ? 0 : h,
                s: isNaN(s) ? 70 : Math.max(0, Math.min(100, s)),
                l: isNaN(l) ? 50 : Math.max(0, Math.min(100, l))
            };
        } catch (error) {
            console.error('Error generating random color:', error);
            return { h: 0, s: 70, l: 50 }; // Fallback to a default color
        }
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
            // Validate input colors
            if (!color1 || !color2 || 
                typeof color1.h !== 'number' || typeof color1.s !== 'number' || typeof color1.l !== 'number' ||
                typeof color2.h !== 'number' || typeof color2.s !== 'number' || typeof color2.l !== 'number') {
                throw new Error('Invalid color values');
            }

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0); // Horizontal gradient

            // Ensure scroll ratio is valid
            const validScrollRatio = isNaN(scrollRatio) ? 0 : Math.min(1, Math.max(0, scrollRatio));

            // Calculate hue shifts with bounds checking
            const hueShift1 = Math.floor((color1.h + validScrollRatio * 360) % 360);
            const hueShift2 = Math.floor((color2.h + validScrollRatio * 360) % 360);

            // Clamp saturation and lightness values
            const s1 = Math.min(100, Math.max(0, color1.s));
            const l1 = Math.min(100, Math.max(0, color1.l));
            const s2 = Math.min(100, Math.max(0, color2.s));
            const l2 = Math.min(100, Math.max(0, color2.l));

            // Create color strings with validated values
            const shiftedColor1 = `hsl(${hueShift1}, ${s1}%, ${l1}%)`;
            const shiftedColor2 = `hsl(${hueShift2}, ${s2}%, ${l2}%)`;

            try {
                gradient.addColorStop(0, shiftedColor1);
                gradient.addColorStop(1, shiftedColor2);
                return gradient;
            } catch (colorError) {
                console.error('Error adding color stops:', colorError);
                // Create a fallback gradient if color stops fail
                const fallbackGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                fallbackGradient.addColorStop(0, 'hsl(0, 70%, 50%)');
                fallbackGradient.addColorStop(1, 'hsl(180, 70%, 50%)');
                return fallbackGradient;
            }
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

            try {
                // Sample the color based on the particle's x position
                const imageData = gradientCtx.getImageData(
                    Math.min(Math.max(0, this.x), gradientCanvas.width - 1), // Clamp x position
                    0,
                    1,
                    1
                ).data;
                
                // Ensure RGB values are valid numbers
                const r = isNaN(imageData[0]) ? 0 : Math.min(255, Math.max(0, imageData[0]));
                const g = isNaN(imageData[1]) ? 0 : Math.min(255, Math.max(0, imageData[1]));
                const b = isNaN(imageData[2]) ? 0 : Math.min(255, Math.max(0, imageData[2]));
                
                this.color = `rgba(${r}, ${g}, ${b}, 1)`;
            } catch (error) {
                console.error('Error sampling gradient color:', error);
                this.color = 'rgba(0, 0, 0, 1)'; // Fallback color
            }

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
                    let particleGradient;
                    try {
                        particleGradient = ctx.createRadialGradient(
                            this.x, this.y, Math.max(0, this.size * 0.1),
                            this.x, this.y, Math.max(0.1, this.size)
                        );
                        
                        const colorMatch = this.color.match(/\d+/g);
                        if (!colorMatch) {
                            throw new Error('Invalid color format');
                        }
                        
                        // Ensure RGB values are valid
                        const rgbValues = colorMatch.slice(0, 3)
                            .map(val => isNaN(Number(val)) ? 0 : Math.min(255, Math.max(0, Number(val))))
                            .join(',');
                        
                        // Ensure alpha is valid
                        const alpha = isNaN(this.alpha) ? 0 : Math.min(1, Math.max(0, this.alpha));
                        
                        particleGradient.addColorStop(0, `rgba(${rgbValues}, ${alpha})`);
                        particleGradient.addColorStop(1, `rgba(${rgbValues}, 0)`);
                    } catch (error) {
                        console.error('Error creating particle gradient:', error);
                        particleGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 1); // Minimal fallback gradient
                        particleGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
                        particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    }

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = particleGradient;

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

            // Initialize with default colors in case random generation fails
            baseColor1 = { h: 0, s: 70, l: 50 };
            baseColor2 = { h: 180, s: 70, l: 50 };

            try {
                // Generate random colors when the page loads
                const color1 = getRandomHSLColor();
                const color2 = getRandomHSLColor();
                
                // Only update if we got valid colors
                if (color1 && !isNaN(color1.h) && !isNaN(color1.s) && !isNaN(color1.l)) {
                    baseColor1 = color1;
                }
                if (color2 && !isNaN(color2.h) && !isNaN(color2.s) && !isNaN(color2.l)) {
                    baseColor2 = color2;
                }
            } catch (error) {
                console.error('Error generating initial colors:', error);
                // Keep using default colors if random generation failed
            }

            let scrollRatio = 0;

            // Create initial gradient based on colors
            let globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
            if (!globalGradient) {
                console.error('Failed to create initial gradient');
                return;
            }

            animate(globalGradient);

            window.addEventListener('mousemove', (e) => {
                if (globalGradient) {
                    addParticle(e.clientX, e.clientY, globalGradient);
                }
            });

            // Listen for scroll events and update the hue based on scroll position
            window.addEventListener('scroll', () => {
                try {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const documentHeight = Math.max(1, document.documentElement.scrollHeight - document.documentElement.clientHeight);
                    scrollRatio = Math.min(1, Math.max(0, scrollTop / documentHeight)); // Ensure ratio is between 0 and 1

                    // Update the gradient with the hue shift based on scroll position
                    if (baseColor1 && baseColor2 && 
                        !isNaN(baseColor1.h) && !isNaN(baseColor1.s) && !isNaN(baseColor1.l) &&
                        !isNaN(baseColor2.h) && !isNaN(baseColor2.s) && !isNaN(baseColor2.l)) {
                        const newGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
                        if (newGradient) {
                            globalGradient = newGradient;
                        }
                    }
                } catch (error) {
                    console.error('Error updating gradient on scroll:', error);
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
