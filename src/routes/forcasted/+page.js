import { pb, getColours } from '$lib/services/pocketbase';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  // Check authentication first
  if (!pb.authStore.isValid) {
    // Save the current URL to redirect back after login
    const returnUrl = encodeURIComponent(url.pathname + url.search);
    throw redirect(303, `/login?returnUrl=${returnUrl}`);
  }

  const year = url.searchParams.get('year');
  const generation = url.searchParams.get('generation');

  if (!year || !generation) {
    throw redirect(303, '/forecast');
  }

  // Extract the numeric year and season from the format (e.g., "ss 2025" or "ss2025")
  let season, numericYear;
  
  // Handle both formats: "ss 2025" and "ss2025"
  if (year.includes(' ')) {
    [season, numericYear] = year.split(' ');
    numericYear = parseInt(numericYear);
  } else {
    season = year.substring(0, 2); // "ss" or "fw"
    numericYear = parseInt(year.substring(2));
  }
  
  // Calculate historical year based on generation
  let yearsToSubtract;
  switch (generation) {
    case 'gen_z':
      yearsToSubtract = 20;
      break;
    case 'millennial':
      yearsToSubtract = 22;
      break;
    case 'gen_x':
      yearsToSubtract = 25;
      break;
    case 'baby_boomer':
      yearsToSubtract = 27;
      break;
    default:
      yearsToSubtract = 20; // Default to Gen Z offset
  }
  
  const historicalYear = numericYear - yearsToSubtract;

  // Check if the historical year is within our available data range (1998-2005)
  if (historicalYear < 1998 || historicalYear > 2005) {
    console.log('Historical year out of range:', historicalYear);
    return {
      year,
      generation,
      historicalData: [],
      error: `Based on the selected generation (${generation.replace('_', ' ').toUpperCase()}), we're looking at trends from ${season.toLowerCase()} ${historicalYear}. However, our historical data only covers 1998-2005.`
    };
  }
  
  // Format just the historical year to match the schema format
  const historicalQuery = `${season.toLowerCase()} ${historicalYear}`;

  try {
    const response = await pb.collection('fashion_colours').getList(1, 50, {
      filter: `year = "${historicalQuery}"`,
      sort: 'priority'
    });

    return {
      year, // Keep the original selected year for display
      generation,
      historicalData: response.items,
      error: null
    };
  } catch (err) {
    console.error('Error fetching forecast data:', err);
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch forecast data';
    return {
      year,
      generation,
      historicalData: [],
      error: errorMessage
    };
  }
}
