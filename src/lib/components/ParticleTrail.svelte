<script>
    import { onMount } from 'svelte';

    let canvas;
    let ctx;
    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 40 + 20; // Set size on creation
            this.alpha = 1; // Start fully opaque

            // Wind effect: Add a horizontal speed (wind blowing to the right)
            this.speedX = Math.random() * 3 + 1; // Random speed for natural wind effect
            this.speedY = Math.random() * 2 - 1; // Optional: small vertical drift
        }

        update() {
            // Move the particle with the wind
            this.x += this.speedX;
            this.y += this.speedY;

            // Reduce alpha over time (optional if you want them to fade out)
            this.alpha -= 0.01; // Control how quickly they fade
        }

        draw(ctx) {
            if (this.alpha > 0.05) {
                // Create a radial gradient for soft edges and color
                let gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.1, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(255, 165, 0, ${this.alpha})`); // Example: Orange color
                gradient.addColorStop(1, `rgba(255, 165, 0, 0)`); // Fades to transparent

                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();

                ctx.globalAlpha = 1; // Reset for next particle
            }
        }
    }

    function addParticle(x, y) {
        particles.push(new Particle(x, y));
        if (particles.length > 100) {
            particles.shift(); // Keep number of particles under control
        }
    }

    function animate() {
        // Set white background and clear canvas before each new frame
        ctx.fillStyle = '#fff'; // White background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw all particles
        particles.forEach((particle, index) => {
            particle.update(); // Ensure particles are updated every frame
            particle.draw(ctx);

            // Remove particles that are too transparent
            if (particle.alpha <= 0.05) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate); // Loop animation
    }

    function handleMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        addParticle(x, y); // Add particle at mouse position
    }

    onMount(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        // Start animation loop
        animate();

        // Handle mouse movement to create particles
        window.addEventListener('mousemove', handleMouseMove);

        // Resize canvas when the window is resized
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

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

<canvas bind:this={canvas}></canvas>
