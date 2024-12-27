import PocketBase from 'pocketbase';

// Use environment variable for the API URL
export const pb = new PocketBase(import.meta.env.VITE_API_URL);

export const getColours = async () => {
  try {
    const records = await pb.collection('fashion_colours').getFullList({
      sort: '-created',
      fields: 'id,hex,colour_name,year,priority,pieces,colour_combo,mood'
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
