/**
 * Configuration object for year generation
 * @type {{baseYear: number, numberOfYears: number}}
 */
export const yearConfig = {
  baseYear: 2025,
  numberOfYears: 30
};

/**
 * Generates an array of fashion season years starting from a base year
 * @returns {string[]} Array of years in format "ssYYYY" or "fwYYYY"
 */
export function generateFashionYears() {
  const years = [];
  const { baseYear, numberOfYears } = yearConfig;
  
  for (let i = 0; i < numberOfYears; i++) {
    const year = baseYear + i;
    // Add both spring/summer and fall/winter for each year
    years.push(`ss ${year}`);
    years.push(`fw ${year}`);
  }
  
  return years;
}
