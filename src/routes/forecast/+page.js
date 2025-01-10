import { generateFashionYears } from '$lib/helpers/yearHelpers';

/** @type {import('./$types').PageLoad} */
export function load() {
  return {
    years: generateFashionYears()
  };
}
