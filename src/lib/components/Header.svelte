<script>
  import { onMount } from 'svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';

  let gradient = generateRandomGradient(); // Generate a random gradient background
  let canvas; // Reference to the canvas DOM element
  let ctx; // Canvas rendering context
  let trails = []; // Store trail positions

  // Add mouse position to the trail
  function addTrail(x, y) {
      trails.push({ x, y, opacity: 1 }); // Full opacity initially
      if (trails.length > 100) trails.shift(); // Limit trail length for performance
  }

  // Update canvas to draw the trails (inverse: reveal effect)
  function drawTrails() {
      // Start by filling the canvas with a white overlay
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set the composite operation to erase the trail path, revealing the gradient
      ctx.globalCompositeOperation = 'destination-out'; // This erases parts of the canvas
      trails = trails.map((trail, index) => {
          ctx.beginPath();
          if (index > 0) {
              const prevTrail = trails[index - 1];
              // Draw a line between previous and current trail point to reveal gradient
              ctx.moveTo(prevTrail.x, prevTrail.y);
              ctx.lineTo(trail.x, trail.y);
          }
          ctx.strokeStyle = `rgba(0, 0, 0, ${trail.opacity})`; // Black trail to "erase"
          ctx.lineWidth = 30; // Trail thickness
          ctx.lineCap = "round"; // Round edges of the trail
          ctx.stroke();

          return { ...trail, opacity: Math.max(trail.opacity - 0.02, 0) }; // Decrease opacity over time
      }).filter(trail => trail.opacity > 0); // Remove fully faded trails

      // Reset composite operation back to source-over after erasing
      ctx.globalCompositeOperation = 'source-over';
  }

  // Initialize canvas and start drawing the trail
  onMount(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d'); // Get the 2D rendering context

      // Fill the entire canvas with white initially to cover the gradient
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const revealEffect = (event) => {
          const x = event.clientX + window.scrollX;
          const y = event.clientY + window.scrollY;
          addTrail(x, y); // Add trail point at mouse position
      };

      window.addEventListener('mousemove', revealEffect);

      const interval = setInterval(drawTrails, 16); // 60fps trail drawing

      return () => {
          window.removeEventListener('mousemove', revealEffect);
          clearInterval(interval); // Clean up when the component is destroyed
      };
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
