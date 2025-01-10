<script>
  import Nav from '$lib/components/Nav.svelte';
  import { page } from '$app/stores';
  import { pb } from '$lib/services/pocketbase';

  /**
   * @typedef {Object} ColourCombo
   * @property {string} id
   * @property {string} hex
   * @property {string} colour_name
   * 
   * @typedef {Object} Mood
   * @property {string} id
   * @property {string} name
   * @property {string} description
   * 
   * @typedef {Object} HistoricalColor
   * @property {string} id
   * @property {string} hex
   * @property {string} colour_name
   * @property {string[]} pieces
   * @property {string} year
   * @property {number} priority
   * @property {ColourCombo|null} colour_combo
   * @property {Mood|null} mood
   * 
   * @typedef {Object} PageData
   * @property {string} year
   * @property {string} generation
   * @property {HistoricalColor[]} historicalData
   * @property {{message: string, status: number}|null} error
   */

  /** @type {PageData} */
  export let data;

  /** @type {string} */
  let selectedYear = data.year || '';
  /** @type {string} */
  let selectedGeneration = data.generation || '';
  /** @type {string} */
  let category = 'Fashion';

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
          {#if data.error.status === 401}
            <p>Please <a href="/login">log in</a> to view forecasts.</p>
          {:else}
            <p>{data.error}</p>
          {/if}
        </div>
      {:else}
        <div class="selection-info mb-40">
          <div class="info-grid">
            <div class="info-card glass">
              <h3>Category</h3>
              <p class="text-md">{category}</p>
            </div>
            <div class="info-card glass">
              <h3>Year</h3>
              <p class="text-md">{formatYearSeason(selectedYear)}</p>
            </div>
            <div class="info-card glass">
              <h3>Generation</h3>
              <p class="text-md">{selectedGeneration.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>
        </div>

        {#if data.historicalData.length > 0}
          <div class="colors-grid">
            {#each data.historicalData as color}
              <div class="color-card glass">
                <div class="color-preview" style="background-color: {color.hex}"></div>
                <h4>{color.colour_name}</h4>
                <p class="hex-code">{color.hex}</p>
                {#if color.colour_combo}
                  <div class="combo-color">
                    <h5>Complementary Color</h5>
                    <div class="color-preview small" style="background-color: {color.colour_combo.hex}"></div>
                    <p>{color.colour_combo.colour_name}</p>
                    <p class="hex-code">{color.colour_combo.hex}</p>
                  </div>
                {/if}
                
                {#if color.mood}
                  <div class="mood">
                    <h5>Mood</h5>
                    <p>{color.mood.name}</p>
                    <p class="mood-description">{color.mood.description}</p>
                  </div>
                {/if}

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

  .combo-color {
    margin: 1rem 0;
    padding: 1rem 0;
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
  }

  .combo-color h5,
  .mood h5 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .color-preview.small {
    width: 50px;
    height: 50px;
    margin-bottom: 0.5rem;
  }

  .mood {
    margin: 1rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid var(--glass-border);
  }

  .mood-description {
    font-size: 0.9rem;
    color: var(--text-color-light);
    margin-top: 0.5rem;
  }

  .piece-tag {
    background: var(--glass-background);
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    color: var(--text-color-light);
  }

  .section-title {
    font-size: 1.8rem;
    text-align: center;
    margin: 2rem 0;
    color: var(--text-color);
    font-family: var(--font-heading);
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
