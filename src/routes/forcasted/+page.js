import { pb } from '$lib/services/pocketbase';
import { redirect } from '@sveltejs/kit';
import { generateFashionYears } from '$lib/helpers/yearHelpers';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  // Check authentication first
  if (!pb.authStore.isValid) {
    throw redirect(303, '/login');
  }

  const year = url.searchParams.get('year');
  const generation = url.searchParams.get('generation');

  console.log('Page Load - URL Params:', {
    year,
    generation
  });

  // Generate available years
  const availableYears = generateFashionYears();
  console.log('Available Years:', availableYears);

  // Return response with generated years
  return {
    year,
    generation,
    availableYears,
    error: null
  };
}
