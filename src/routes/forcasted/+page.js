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

  // Extract the numeric year and season from the format (e.g., "ss2025" -> {year: 2025, season: "ss"})
  const season = year.substring(0, 2); // "ss" or "fw"
  const numericYear = parseInt(year.substring(2));
  
  // Subtract 20 years for historical data comparison
  const historicalYear = numericYear - 20;
  
  // Format the historical year with the same season (with space)
  const currentQuery = `${season} ${numericYear}`;
  const historicalQuery = `${season} ${historicalYear}`;

  console.log('Calculated Reference Year:', season, historicalYear);
  console.log('Database Query:', `year = "${historicalQuery}"`);

  try {
    const response = await pb.collection('fashion_colours').getList(1, 50, {
      filter: `year = "${currentQuery}" || year = "${historicalQuery}"`,
      sort: 'year'
    });

    console.log('Database Response:', response);

    // Get unique years from the database for the select dropdown
    const yearsResponse = await pb.collection('fashion_colours').getList(1, 1000, {
      fields: 'year',
      sort: 'year'
    });
    
    // Extract unique years and format them as "ssYYYY" or "fwYYYY"
    const availableYears = [...new Set(yearsResponse.items.map(item => {
      const [season, year] = item.year.split(' ');
      return `${season}${year}`;
    }))].sort();

    return {
      year,
      generation,
      currentData: response.items.filter(item => item.year === currentQuery),
      historicalData: response.items.filter(item => item.year === historicalQuery),
      availableYears,
      error: null
    };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return {
      year,
      generation,
      currentData: [],
      historicalData: [],
      availableYears: [],
      error: 'Failed to fetch forecast data'
    };
  }
}
