<script>
    import { onMount } from 'svelte';

    let canvas;
    let ctx;
    let particles = [];
    let baseColor1, baseColor2; // Store the initial random colors

    // Helper function to generate a random HSL color
    function getRandomHSLColor() {
        const h = Math.floor(Math.random() * 360); // Random hue
        const s = 70 + Math.random() * 30; // Random saturation between 70% and 100%
        const l = 50 + Math.random() * 20; // Random lightness between 50% and 70%
        return { h, s, l };
    }

    // Generate the gradient based on the current hue shift
    function createGlobalGradient(scrollRatio, color1, color2) {
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
    }

    class Particle {
        constructor(x, y, globalGradient) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 40 + 20;
            this.alpha = 1;

            // Wind effect
            this.speedX = Math.random() * 3 + 1;
            this.speedY = Math.random() * 2 - 1;

            // Create a temporary canvas to sample the global gradient
            const gradientCanvas = document.createElement('canvas');
            gradientCanvas.width = canvas.width;
            gradientCanvas.height = 1;
            const gradientCtx = gradientCanvas.getContext('2d');
            gradientCtx.fillStyle = globalGradient;
            gradientCtx.fillRect(0, 0, canvas.width, 1);

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

        draw(ctx) {
            if (this.alpha > 0.05) {
                let gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.1, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(${this.color.match(/\d+/g).slice(0, 3).join(',')}, ${this.alpha})`);
                gradient.addColorStop(1, `rgba(${this.color.match(/\d+/g).slice(0, 3).join(',')}, 0)`);

                ctx.globalAlpha = 1;
                ctx.fillStyle = gradient;

                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    function addParticle(x, y, globalGradient) {
        particles.push(new Particle(x, y, globalGradient));
        if (particles.length > 500) {
            particles.shift(); // Limit particle count
        }
    }

    function animate(globalGradient) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw(ctx);

            if (particle.alpha <= 0.05) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(() => animate(globalGradient));
    }

    onMount(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        // Generate random colors when the page loads
        baseColor1 = getRandomHSLColor();
        baseColor2 = getRandomHSLColor();

        let scrollRatio = 0;

        // Create initial gradient based on random colors
        let globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);

        animate(globalGradient);

        window.addEventListener('mousemove', (e) => addParticle(e.clientX, e.clientY, globalGradient));

        // Listen for scroll events and update the hue based on scroll position
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollRatio = scrollTop / documentHeight; // Calculate the scroll ratio (0 to 1)

            // Update the gradient with the hue shift based on scroll position
            globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            globalGradient = createGlobalGradient(scrollRatio, baseColor1, baseColor2);
        });
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
