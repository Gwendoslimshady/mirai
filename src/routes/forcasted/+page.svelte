<script>
  import Nav from '$lib/components/Nav.svelte';
  import { page } from '$app/stores';
  import { pb } from '$lib/services/pocketbase';

  /** @type {{ year: string, generation: string, availableYears: string[], error: { message: string, status: number } | null }} */
  export let data;

  /** @type {Array<{id: string, hex: string, colour_name: string, pieces: string[], year: string, priority: number}>} */
  let fashionColors = [];
  /** @type {string} */
  let selectedYear = data.year || '';
  /** @type {string} */
  let selectedGeneration = data.generation || '';
  /** @type {string} */
  let category = 'Fashion';
  /** @type {string} */
  let errorMessage = '';

  /**
   * Calculate reference year based on generation by subtracting years:
   * Gen Z: -20 years
   * Millennials: -22 years
   * Gen X: -25 years
   * Boomers: -27 years
   * @param {string} yearStr - Selected year in format "ssYYYY" or "fwYYYY"
   * @param {string} generation - Selected generation
   * @returns {string} Calculated reference year in same format
   */
  function calculateReferenceYear(yearStr, generation) {
    // Extract season (ss/fw) and year, handling format without space
    const season = yearStr.substring(0, 2);
    const yearNum = yearStr.substring(2);
    if (!season || !yearNum || !['ss', 'fw'].includes(season)) return '';
    const year = parseInt(yearNum, 10);
    if (isNaN(year)) return '';
    let yearsToSubtract = 0;

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
    }

    // Format with space between season and year to match database format
    const referenceYear = year - yearsToSubtract;
    return `${season} ${referenceYear}`;
  }

  /**
   * Load fashion colors for the selected year and generation
   */
  async function loadFashionColors() {
    if (selectedYear && selectedGeneration) {
      const referenceYear = calculateReferenceYear(selectedYear, selectedGeneration);
      console.log('Calculated Reference Year:', referenceYear);

      try {
        errorMessage = ''; // Clear any previous errors
        const query = `year = "${referenceYear}"`;
        console.log('Database Query:', query);

        const records = await pb.collection('fashion_colours').getList(1, 50, {
          filter: query,
          sort: 'priority'
        });
        
        console.log('Database Response:', records);
        fashionColors = /** @type {any} */ (records.items);
      } catch (/** @type {any} */ error) {
        console.error('Error fetching fashion colors:', error);
        errorMessage = error?.message || 'Failed to fetch fashion colors';
        fashionColors = [];
      }
    }
  }

  // Load data when component mounts
  $: if (selectedYear && selectedGeneration) {
    loadFashionColors();
  }

  /**
   * Format the year/season string to be more readable
   * @param {string} yearStr - The year and season string in format "ssYYYY" or "fwYYYY"
   * @returns {string} Formatted string like "2024 Spring Summer" or "2024 Fall Winter"
   */
  function formatYearSeason(yearStr) {
    // Extract season and year from format like "fw2025"
    const season = yearStr.substring(0, 2);
    const year = yearStr.substring(2);
    if (!season || !year || !['ss', 'fw'].includes(season)) return yearStr;
    const seasonText = season === 'ss' ? 'Spring Summer' : 'Fall Winter';
    return `${year} ${seasonText}`;
  }
</script>

<div class="page-layout">
  <nav class="nav-column nav-left">
    <Nav position="left" />
  </nav>

  <main class="main-content p-60">
    <section class="forecast-results glass p-30">
      <h2>Fashion Color Forecast</h2>
      
      {#if data.error}
        <div class="error-message glass">
          <p>Error: {data.error.message}</p>
          {#if data.error.status === 401}
            <p>Please <a href="/login">log in</a> to view forecasts.</p>
          {/if}
        </div>
      {:else if errorMessage}
        <div class="error-message glass">
          <p>{errorMessage}</p>
        </div>
      {:else}
        <div class="selection-info mb-40">
          <div class="info-grid">
            <div class="info-card glass">
              <h3>Category</h3>
              <p class="text-md">{category}</p>
            </div>
            <div class="info-card glass">
              <h3>Select Year</h3>
              <select
                bind:value={selectedYear}
                on:change={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set('year', selectedYear);
                  // Preserve the generation parameter if it exists
                  if (selectedGeneration) {
                    url.searchParams.set('generation', selectedGeneration);
                  }
                  window.location.href = url.toString();
                }}
                class="year-select"
              >
                <option value="">Choose a year</option>
                {#each data.availableYears as year}
                  <option value={year}>{formatYearSeason(year)}</option>
                {/each}
              </select>
            </div>
            <div class="info-card glass">
              <h3>Generation</h3>
              <p class="text-md">{selectedGeneration.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>
        </div>

        {#if fashionColors.length > 0}
          <div class="colors-grid">
            {#each fashionColors as color}
              <div class="color-card glass">
                <div class="color-preview" style="background-color: {color.hex}"></div>
                <h4>{color.colour_name}</h4>
                <p class="hex-code">{color.hex}</p>
                {#if color.pieces}
                  <div class="pieces">
                    {#each color.pieces as piece}
                      <span class="piece-tag">{piece}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <div class="no-results glass">
            <p>No color data found for the selected year.</p>
          </div>
        {/if}
      {/if}
    </section>
  </main>

  <nav class="nav-column nav-right">
    <Nav position="right" />
  </nav>
</div>

<style>
  .page-layout {
    display: flex;
    width: 100%;
    min-height: 100vh;
    gap: 2rem;
  }

  .nav-column {
    flex: 0 0 200px;
    padding: 2rem 1rem;
  }

  .main-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 30px;
    color: var(--text-color);
    font-family: var(--font-heading);
  }

  .error-message {
    text-align: center;
    padding: 2rem;
    margin: 2rem 0;
    color: var(--error-color, #ff3e3e);
  }

  .error-message a {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .selection-info {
    width: 100%;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .info-card {
    text-align: center;
  }

  .info-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .colors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .color-card {
    padding: 1.5rem;
    text-align: center;
  }

  .color-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto 1rem;
    border: 2px solid var(--glass-border);
  }

  .color-card h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .hex-code {
    font-family: monospace;
    color: var(--text-color-light);
    margin-bottom: 1rem;
  }

  .pieces {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .piece-tag {
    background: var(--glass-background);
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    color: var(--text-color-light);
  }

  .no-results {
    text-align: center;
    padding: 3rem;
  }

  .year-select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--glass-background);
    border: 1px solid var(--glass-border);
    color: var(--text-color);
    font-size: 1rem;
    cursor: pointer;
    outline: none;
  }

  .year-select option {
    background: var(--background-color);
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    .page-layout {
      flex-direction: column;
    }

    .nav-column {
      display: none;
    }

    .nav-left {
      display: block;
    }

    .main-content {
      padding: var(--content-padding);
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .colors-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
