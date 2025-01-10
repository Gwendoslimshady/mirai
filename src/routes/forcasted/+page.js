import { redirect } from '@sveltejs/kit';
import { authStore } from '$lib/stores/auth';
import { get } from 'svelte/store';
import { pb } from '$lib/services/pocketbase';

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

  try {
    console.log('Input year:', year);
    console.log('Input generation:', generation);

    // Extract the numeric year and season from the format "ss 2025"
    const [season, yearStr] = year.split(' ');
    const numericYear = parseInt(yearStr);
    
    // Base subtraction years for each generation
    const baseYears = {
      gen_z: 20,
      millennial: 22,
      gen_x: 25,
      baby_boomer: 27
    }[generation.toLowerCase()] || 20;

    // Calculate historical year for seed
    const historicalYear = numericYear - baseYears;
    
    // Create the historical year string in the same format (e.g., "ss 2003")
    const historicalYearStr = `${season.toLowerCase()} ${historicalYear}`;

    console.log('Base years for generation:', baseYears);
    console.log('Calculated historical year:', historicalYearStr);

    // Fetch colors for this historical year
    const colors = await pb.collection('fashion_colours').getFullList({
      filter: `year = "${historicalYearStr}"`,
      sort: 'priority',
      expand: 'colour_combo,mood'
    });

    console.log('Historical year:', historicalYearStr);
    console.log('Found colors:', colors);

    if (!colors || colors.length === 0) {
      throw new Error(`No colors found for year ${historicalYearStr}`);
    }

    return {
      year,
      generation,
      historicalData: colors.map(color => ({
        id: color.id,
        hex: color.hex,
        colour_name: color.colour_name,
        year,
        priority: color.priority,
        pieces: color.pieces,
        colour_combo: Array.isArray(color.expand?.colour_combo) ? color.expand.colour_combo[0] || null : null,
        mood: color.expand?.mood || null
      })),
      error: null
    };
  } catch (error) {
    console.error('Error generating forecast:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      year,
      generation,
      historicalData: [],
      error: errorMessage
    };
  }
}
