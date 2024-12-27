/**
 * @typedef {Object} ForecastFormData
 * @property {string} companySize - Selected company size
 * @property {string} category - Selected category
 * @property {string} year - Selected year/season
 * @property {string} generation - Selected generation
 */

import { writable } from 'svelte/store';

// Initialize store with default data
const initialData = {
  companySize: '',
  category: '',
  year: '',
  generation: ''
};

// Create the store
const forecastFormStore = writable(initialData);

// Subscribe to store changes and update session storage if in browser
forecastFormStore.subscribe(value => {
  if (typeof window !== 'undefined' && value) {
    sessionStorage.setItem('forecastFormData', JSON.stringify(value));
  }
});

// Load data from session storage if in browser
if (typeof window !== 'undefined') {
  const storedForecast = sessionStorage.getItem('forecastFormData');
  if (storedForecast) {
    forecastFormStore.set(JSON.parse(storedForecast));
  }
}

/**
 * Update forecast form data in store and session storage
 * @param {ForecastFormData} data - Form data to store
 */
export function updateForecastForm(data) {
  forecastFormStore.set(data);
}

/**
 * Clear forecast form data from store and session storage
 */
export function clearForecastForm() {
  forecastFormStore.set({
    companySize: '',
    category: '',
    year: '',
    generation: ''
  });
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('forecastFormData');
  }
}

export { forecastFormStore };
