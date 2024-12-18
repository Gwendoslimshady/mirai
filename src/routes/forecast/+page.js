import { getColours } from '$lib/services/pocketbase';

export async function load() {
  const colours = await getColours();
  
  // Extract unique pieces (categories) from all colours
  const categories = [...new Set(colours.flatMap(colour => colour.pieces))];
  
  // Extract unique years
  const years = [...new Set(colours.map(colour => colour.year))];

  return {
    colours,
    categories,
    years
  };
}
