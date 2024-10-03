// FILE: mouseHelpers.js

import { tweened } from 'svelte/motion';

// Create tweened variables for smooth mouse position tracking
// These variables store the damped coordinates of the mouse and can be used in other components
export const mouseX = tweened(0, { duration: 300 });
export const mouseY = tweened(0, { duration: 300 });

// Function to generate a random linear gradient
export function generateRandomGradient() {
    const color1 = randomColor();
    const color2 = randomColor();
    // Return a random gradient with two generated colors
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}

// Helper function to generate a random RGB color
function randomColor() {
    // Create random RGB values for a color
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`; // Return color in rgba format
}
