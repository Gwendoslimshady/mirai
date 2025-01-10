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

  <main class="main-content">
    <section class="forecast-results">
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
    padding: 4rem 2rem;
  }

  .forecast-results {
    width: 100%;
  }

  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-color);
    font-family: var(--font-heading);
    letter-spacing: 1px;
  }

  .error-message {
    text-align: center;
    padding: 2rem;
    margin: 2rem 0;
    color: var(--error-color, #ff3e3e);
    backdrop-filter: blur(10px);
  }

  .error-message a {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .selection-info {
    width: 100%;
    margin-bottom: 4rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .info-card {
    text-align: center;
    padding: 2.5rem 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px var(--glass-shadow-hover);
  }

  .info-card h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-family: var(--font-heading);
    letter-spacing: 0.5px;
  }

  .colors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .color-card {
    padding: 3rem 2rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .color-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px var(--glass-shadow-hover);
  }

  .color-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto;
    border: 3px solid var(--glass-border);
    box-shadow: 0 4px 12px var(--glass-shadow);
    transition: transform 0.3s ease;
  }

  .color-card:hover .color-preview {
    transform: scale(1.05);
  }

  .color-card h4 {
    font-size: 1.4rem;
    color: var(--text-color);
    font-family: var(--font-heading);
    letter-spacing: 0.5px;
  }

  .hex-code {
    font-family: var(--font-primary);
    color: var(--text-color-light);
    font-size: 0.9rem;
    letter-spacing: 1px;
    background: var(--glass-bg);
    padding: 0.4rem 1rem;
    border-radius: 4px;
    display: inline-block;
  }

  .pieces {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    justify-content: center;
  }

  .combo-color {
    margin: 0;
    padding: 2rem 0;
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
  }

  .combo-color h5,
  .mood h5 {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    font-family: var(--font-heading);
    letter-spacing: 0.5px;
  }

  .color-preview.small {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
    border-width: 2px;
  }

  .mood {
    margin: 0;
    padding: 2rem 0;
    border-bottom: 1px solid var(--glass-border);
  }

  .mood-description {
    font-size: 0.95rem;
    color: var(--text-color-light);
    margin-top: 1rem;
    line-height: 1.6;
    padding: 0 1rem;
  }

  .piece-tag {
    background: var(--glass-bg);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--text-color);
    border: 1px solid var(--glass-border);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .piece-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--glass-shadow);
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
    backdrop-filter: blur(10px);
  }

  @media (max-width: 1024px) {
    .colors-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
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
      padding: 3rem 1.5rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .colors-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }

    .color-card {
      padding: 2.5rem 1.5rem;
    }

    .info-card {
      padding: 2rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      padding: 2rem 1rem;
    }

    .color-preview {
      width: 100px;
      height: 100px;
    }

    .color-card h4 {
      font-size: 1.2rem;
    }

    .piece-tag {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
    }
  }
</style>
