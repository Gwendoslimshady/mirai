<script>
  import { onMount } from 'svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';
  import { initTrailReveal } from '$lib/helpers/trailRevealHelpers.js'; // Import the helper

  let gradient = generateRandomGradient(); // Generate a random gradient background
  let canvas; // Reference to the canvas DOM element

  onMount(() => {
      const initializeReveal = initTrailReveal(canvas, gradient); // Initialize trail and reveal effect
      initializeReveal(); // Start the effect
  });
</script>

<!-- HTML structure -->
<section class="header-section" style="background-image: {gradient};">
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

  h1 {
      font-size: 10rem;
      text-align: center;
      position: relative;
      line-height: 100vh;
      color: #000; /* Ensure the text stands out */
  }
</style>
