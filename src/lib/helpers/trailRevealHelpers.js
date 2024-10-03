// FILE: trailRevealHelpers.js

export function initTrailReveal(canvas, gradient) {
    const ctx = canvas.getContext('2d'); // Get the 2D rendering context
    let trails = []; // Store trail positions

    // Function to add trail positions
    function addTrail(x, y) {
        trails.push({ x, y, opacity: 1 }); // Full opacity initially
        if (trails.length > 100) trails.shift(); // Limit trail length for performance
    }

    // Function to update canvas and draw the trails
    function drawTrails() {
        // Start by filling the canvas with a white overlay
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the composite operation to erase the trail path, revealing the gradient
        ctx.globalCompositeOperation = 'destination-out'; // Erase parts of the canvas

        trails = trails.map((trail, index) => {
            ctx.beginPath();
            if (index > 0) {
                const prevTrail = trails[index - 1];
                // Draw a line between previous and current trail point
                ctx.moveTo(prevTrail.x, prevTrail.y);
                ctx.lineTo(trail.x, trail.y);
            }

            // Add blur and increase size of the reveal circle
            ctx.shadowBlur = 30; // Adds a blur to the reveal circle
            ctx.shadowColor = 'rgba(255, 255, 255, 1)'; // White blur around the circle

            ctx.strokeStyle = `rgba(0, 0, 0, ${trail.opacity})`; // Black trail to erase
            ctx.lineWidth = 60; // Make the circle bigger (adjust this for size)
            ctx.lineCap = "round"; // Rounded edges
            ctx.stroke();

            return { ...trail, opacity: Math.max(trail.opacity - 0.05, 0) }; // Fade out over time
        }).filter(trail => trail.opacity > 0); // Remove fully faded trails

        // Reset composite operation to normal after erasing
        ctx.globalCompositeOperation = 'source-over';
    }

    // Function to initialize the canvas and the trail reveal effect
    function initializeReveal() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Fill the entire canvas with white initially to cover the gradient
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Mouse movement event to add trails
        const revealEffect = (event) => {
            const x = event.clientX + window.scrollX;
            const y = event.clientY + window.scrollY;
            addTrail(x, y); // Add trail at mouse position
        };

        window.addEventListener('mousemove', revealEffect);

        // Continuously draw the trail effect at 60fps
        const interval = setInterval(drawTrails, 16);

        return () => {
            // Cleanup event listeners and interval on component destruction
            window.removeEventListener('mousemove', revealEffect);
            clearInterval(interval);
        };
    }

    // Return initialization function
    return initializeReveal;
}
