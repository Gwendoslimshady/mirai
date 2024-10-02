<script>
    import { onMount } from 'svelte';
    import { mouseX, mouseY, generateRandomGradient } from '$lib/helpers/mouseHelpers.js';
    
    // Store the mouse position values for damped effect
    let overlay; // Reference to the white overlay DOM element
    let gradient = generateRandomGradient(); // Random gradient for the background

    // Set up mouse listeners on mount
    onMount(() => {
        const revealEffect = (event) => {
            // Get the mouse coordinates and apply them to the overlay's mask
            const x = event.clientX;
            const y = event.clientY;

            // Directly manipulate the white overlay mask
            overlay.style.maskImage = `radial-gradient(circle at ${x}px ${y}px, transparent 80px, white 150px)`;
            overlay.style.webkitMaskImage = `radial-gradient(circle at ${x}px ${y}px, transparent 80px, white 150px)`;
        };

        // Add event listener for mouse movement
        window.addEventListener('mousemove', revealEffect);

        // Clean up the listener when the component is destroyed
        return () => {
            window.removeEventListener('mousemove', revealEffect);
        };
    });
</script>

<!-- Main section with the gradient background and white overlay -->
<section class="header-section" style="background: {gradient};">
    <div bind:this={overlay} class="white-overlay"></div>
    <h1>Mirai</h1>
</section>

<style>
    /* Full-screen gradient background */
    .header-section {
        position: relative;
        height: 100vh;
        background-size: cover;
        overflow: hidden;
    }

    /* Fully opaque white overlay */
    .white-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        pointer-events: none;
    }

    /* Text styling */
    h1 {
        font-size: 10rem;
        text-align: center;
        position: relative;
        z-index: 1;
        color: black;
        line-height: 100vh;
    }
</style>
