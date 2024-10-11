<script>
  import { onMount } from 'svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';
  import { initTrailReveal } from '$lib/helpers/trailRevealHelpers.js'; 

  export let gradient = generateRandomGradient(); // Allow passing a gradient as a prop
  let canvas; // Reference to the canvas DOM element
  let overlay; // Bind the white overlay div

  onMount(() => {
    const ctx = canvas.getContext('2d');
  
    // Immediately hide the gradient by showing the white overlay
    overlay.style.opacity = 1;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initialize the reveal effect
    const revealEffect = initTrailReveal(canvas, 'linear-gradient(...)');
    revealEffect();

    // After a short delay, fade out the white overlay
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.5s ease';
      overlay.style.opacity = 0;
    }, 100);
  });
</script>

<!-- HTML structure -->
<div class="overlay" bind:this={overlay}></div>
<canvas bind:this={canvas} class="trail-canvas"></canvas>

<style>
  .trail-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    pointer-events: none; /* Ensure it doesn't block user interactions */
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: white; /* Ensure white background */
    pointer-events: none; /* Allow interactions below the overlay */
  }

  
</style>
