import { tweened } from 'svelte/motion';

// Create tweened variables for mouse X and Y coordinates with damping
export const mouseX = tweened(0, { duration: 300 });
export const mouseY = tweened(0, { duration: 300 });

// Generate a random gradient
export function generateRandomGradient() {
    const color1 = randomColor();
    const color2 = randomColor();
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}

// Helper to generate a random color
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}
