// FILE: trailRevealHelpers.js

export function initTrailReveal(canvas, gradient) {
    const ctx = canvas.getContext('2d'); // Get the 2D rendering context
    let trails = []; // Store trail positions
    const MAX_TRAIL_TIME = 800; // Trail points remain for 2 seconds before they are removed

    // Function to add trail positions with timestamps
    function addTrail(x, y) {
        const timestamp = Date.now(); // Get the current time
        trails.push({ x, y, timestamp }); // Add mouse position with a timestamp
    }

    // Function to update canvas and draw the smooth, closing-in trail
    function drawTrails() {
        // Start by filling the canvas with a white overlay
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the composite operation to erase the trail path, revealing the gradient
        ctx.globalCompositeOperation = 'destination-out'; // Erase parts of the canvas

        const currentTime = Date.now(); // Get the current time

        // Filter out points that have existed longer than MAX_TRAIL_TIME
        trails = trails.filter(trail => currentTime - trail.timestamp < MAX_TRAIL_TIME);

        // Draw the trail line
        ctx.beginPath();
        trails.forEach((trail, index) => {
            const progress = index / trails.length; // Calculate the progress along the trail
            const lineWidth = 80; // Shrink the trail size from head to tail

            if (index === 0) {
                ctx.moveTo(trail.x, trail.y); // Start from the first trail point
                ctx.shadowBlur = 30; // Add blur to the head circle
                ctx.shadowColor = 'rgba(255, 255, 255, 1)'; // White blur around the head
            } else {
                ctx.lineTo(trail.x, trail.y); // Draw a line to the next trail point
                ctx.shadowBlur = 30; // Add blur to the head circle
                ctx.shadowColor = 'rgba(255, 255, 255, 1)'; // White blur around the head
            }

            // Set the stroke style and line width for the trail
            ctx.strokeStyle = 'rgba(0, 0, 0, 1)'; // Solid black trail
            ctx.lineWidth = Math.max(lineWidth, 5); // Ensure the line doesn’t get too thin
        });
        ctx.stroke(); // Finalize the trail drawing

        // Draw the head as a blurred circle at the most recent point
        if (trails.length > 0) {
            const head = trails[trails.length - 1]; // The most recent point

            ctx.shadowBlur = 30; // Add blur to the head circle
            ctx.shadowColor = 'rgba(255, 255, 255, 1)'; // White blur around the head

            ctx.beginPath();
            ctx.arc(head.x, head.y, 40, 0, Math.PI * 2); // Larger circle for the head
            ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Solid black for the head
            ctx.fill();

            // Reset the shadowBlur for the rest of the drawing
            ctx.shadowBlur = 0;
        }

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
