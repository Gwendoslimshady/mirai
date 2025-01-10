import PocketBase from 'pocketbase';

// Use environment variable for the API URL
export const pb = new PocketBase(import.meta.env.VITE_API_URL);

/**
 * Logs out the current user
 */
export const logout = () => {
  pb.authStore.clear();
};

export const getColours = async () => {
  try {
    const records = await pb.collection('fashion_colours').getFullList({
      sort: '-created',
      fields: 'id,hex,colour_name,year,priority,pieces,colour_combo,mood',
      expand: 'colour_combo,mood'
    });
    
    if (!records) {
      throw new Error('No records found');
    }
    
    return records;
  } catch (error) {
    console.error('Error fetching colours:', error);
    return []; // Return empty array instead of throwing to prevent page crash
  }
};

/**
 * Get the range of available years in the database
 * @returns {Promise<{start: number, end: number}>} The earliest and latest years available
 */
export const getAvailableYearRange = async () => {
  try {
    const records = await pb.collection('fashion_colours').getFullList({
      fields: 'year',
    });
    
    if (!records || records.length === 0) {
      throw new Error('No records found');
    }

    // Extract years from format "ss YYYY" or "fw YYYY"
    const years = records.map(record => parseInt(record.year.split(' ')[1]));
    
    return {
      start: Math.min(...years),
      end: Math.max(...years)
    };
  } catch (error) {
    console.error('Error getting year range:', error);
    // Return default range if there's an error
    return {
      start: 1998,
      end: 2005
    };
  }
};
