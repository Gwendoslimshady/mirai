import { redirect } from '@sveltejs/kit';
import { authStore } from '$lib/stores/auth';
import { get } from 'svelte/store';

/**
 * Generate a deterministic color based on input parameters
 * @param {string} seed - String to use as seed for color generation
 * @param {number} index - Index to create variation
 * @returns {{ hex: string, hue: number }} Generated color
 */
function generateColor(seed, index) {
  // Create a simple hash of the seed string
  const hash = seed.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  
  // Use the hash to generate a base hue (0-360)
  const baseHue = Math.abs(hash % 360);
  
  // Create variations based on index
  const hue = (baseHue + (index * 137.5)) % 360;
  const saturation = 65 + (index * 5) % 20; // 65-85%
  const lightness = 45 + (index * 7) % 20; // 45-65%

  // Convert HSL to Hex
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const rgb = [
    Math.round(hueToRgb(p, q, h + 1/3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1/3) * 255)
  ];

  const hex = '#' + rgb.map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  return { hex, hue };
}

/**
 * Helper function for HSL to RGB conversion
 * @param {number} p - First parameter for RGB conversion
 * @param {number} q - Second parameter for RGB conversion
 * @param {number} t - Third parameter for RGB conversion
 * @returns {number} RGB component value
 */
function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

/**
 * Get color name based on hue value
 * @param {number} hue - Color hue (0-360)
 * @returns {string} Color name
 */
function getColorName(hue) {
  /** @type {Array<[number, string]>} */
  const names = [
    [15, "Red"],
    [45, "Orange"],
    [75, "Yellow"],
    [165, "Green"],
    [195, "Cyan"],
    [255, "Blue"],
    [285, "Purple"],
    [315, "Pink"],
    [360, "Red"]
  ];
  
  for (const [maxHue, name] of names) {
    if (hue <= maxHue) return name;
  }
  return "Red";
}

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  // Check authentication first
  if (!get(authStore)) {
    const returnUrl = encodeURIComponent(url.pathname + url.search);
    throw redirect(303, `/login?returnUrl=${returnUrl}`);
  }

  const year = url.searchParams.get('year');
  const generation = url.searchParams.get('generation');

  if (!year || !generation) {
    throw redirect(303, '/forecast');
  }

  // Extract the numeric year and season from the format "ss 2025"
  const [season, yearStr] = year.split(' ');
  const numericYear = parseInt(yearStr);
  
  // Base subtraction years for each generation
  const baseYears = {
    gen_z: 20,
    millennial: 22,
    gen_x: 25,
    baby_boomer: 27
  }[generation] || 20;

  // Calculate historical year for seed
  const historicalYear = numericYear - baseYears;
  
  // Generate a seed string that combines all parameters
  const seed = `${season}${historicalYear}${generation}`;
  
  // Generate 5 colors based on the seed
  const colors = Array.from({ length: 5 }, (_, i) => {
    const { hex, hue } = generateColor(seed, i);
    const colorName = getColorName(hue);
    
    return {
      id: `generated-${i}`,
      hex,
      colour_name: colorName,
      year,
      priority: i + 1,
      pieces: ['dress', 'skirt', 'top'] // Default pieces for all colors
    };
  });

  return {
    year,
    generation,
    historicalData: colors,
    error: null
  };
}
