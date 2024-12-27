import { getColours } from '$lib/services/pocketbase';
import { generateFashionYears } from '$lib/helpers/yearHelpers';

export async function load() {
  const colours = await getColours();
  
  // Extract unique pieces (categories) from all colours
  const categories = [...new Set(colours.flatMap(colour => colour.pieces))];
  
  // Get available years from yearHelpers
  const years = generateFashionYears();

  return {
    colours,
    categories,
    years
  };
}
