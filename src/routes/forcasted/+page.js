import { pb } from '$lib/services/pocketbase';
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
      currentData: [],
      historicalData: [],
      error: `No historical data available for ${season.toLowerCase()} ${historicalYear}. Data only available from 1998 to 2005.`
    };
  }
  
  // Format the years to match the exact format in the database schema
  const currentQuery = `${season.toLowerCase()} ${numericYear}`;
  const historicalQuery = `${season.toLowerCase()} ${historicalYear}`;

  console.log('Looking for years:', { current: currentQuery, historical: historicalQuery });

  try {
    // Only query for historical data since that's all we have (1998-2005)
    const response = await pb.collection('fashion_colours').getList(1, 50, {
      filter: `year = "${historicalQuery}"`,
      sort: 'year'
    });

    console.log('Database Response:', response);

    // Split the results into current and historical data
    const currentData = response.items.filter(item => item.year === currentQuery);
    const historicalData = response.items.filter(item => item.year === historicalQuery);

    return {
      year,
      generation,
      currentData,
      historicalData,
      error: null
    };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return {
      year,
      generation,
      currentData: [],
      historicalData: [],
      error: 'Failed to fetch forecast data'
    };
  }
}
