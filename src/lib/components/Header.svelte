<script>
  import { onMount } from 'svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';
  import { initTrailReveal } from '$lib/helpers/trailRevealHelpers.js'; // Import the helper

  let gradient = generateRandomGradient(); // Generate a random gradient background
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

      // After a short delay (e.g., 100ms), fade out the white overlay
      setTimeout(() => {
          overlay.style.transition = 'opacity 0.5s ease';
          overlay.style.opacity = 0;
      }, 100);
  });
</script>

<!-- HTML structure -->

<section class="header-section" style="background-image: {gradient};">
  <div class="overlay" bind:this={overlay}></div>
  <!-- Canvas to draw the trail -->
  <canvas bind:this={canvas} class="trail-canvas"></canvas>
  <h1>Mirai</h1>
</section>

<style>
  .header-section {
      position: relative;
      height: 100vh;
      width: 100vw;
      background-size: cover;
      overflow: hidden;
  }

  /* Canvas to render the reveal effect */
  .trail-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Make sure it doesn't interfere with mouse events */
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white; /* Ensure white background */
    pointer-events: none; /* Allow interactions with the canvas */
  }

  h1 {
      font-size: 10rem;
      text-align: center;
      position: relative;
      line-height: 100vh;
      color: #000; /* Ensure the text stands out */
  }
</style>
