<script>
    import { onMount } from 'svelte';

    let canvas;
    let ctx;
    let particles = [];
    let gradient; // Store the random gradient

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 40 + 20; // Increase particle size
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.alpha = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.01; // Fade out particles slowly
        }

        draw() {
            if (this.alpha > 0.05) { // Ensure particles are visible enough
                ctx.globalAlpha = this.alpha; // Apply fade-out effect
                ctx.fillStyle = getGradientColor(this.x, this.y); // Use shared gradient
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1; // Reset alpha for next particles
            }
        }
    }

    // Function to return a color from the shared random gradient based on position
    function getGradientColor(x, y) {
        return gradient; // Use the same random gradient for all particles
    }

    // Function to generate a random gradient
    function generateRandomGradient() {
        const color1 = randomColor();
        const color2 = randomColor();
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    // Helper function to generate a random RGB color
    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function addParticle(x, y) {
        particles.push(new Particle(x, y));
        if (particles.length > 100) {
            particles.shift(); // Remove the oldest particles
        }
    }

    function animate() {
        // Clear the canvas and reset the background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw and update each particle
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            // Remove particles before they fully fade out to avoid flickering
            if (particle.alpha <= 0.05) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        addParticle(x, y);
    }

    onMount(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        // Generate a random gradient when the page loads
        gradient = generateRandomGradient();

        animate();

        window.addEventListener('mousemove', handleMouseMove);

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gradient = generateRandomGradient(); // Recreate gradient on resize
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
        z-index: -1; /* Ensure it's behind the content */
        pointer-events: none; /* Allow clicks to pass through */
    }
</style>

<canvas bind:this={canvas}></canvas>
