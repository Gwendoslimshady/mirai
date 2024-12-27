<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ParticleTrail from '$lib/components/ParticleTrail.svelte';
  import LoginModal from '$lib/components/LoginModal.svelte';
  import { authStore } from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { updateForecastForm } from '$lib/stores/forecast';
  
  // Get the data from page.js
  export let data;

  let showLoginModal = false;
  let firstName = '';
  let lastName = '';
  let email = '';

  // Subscribe to auth store changes to populate form fields
  authStore.subscribe(value => {
    if (value) {
      firstName = value.first_name || '';
      lastName = value.last_name || '';
      email = value.email || '';
    }
  });
  /** @type {HTMLSelectElement | null} */
  let companySizeSelect = null;

  // Get employee count from URL parameter
  $: employeeCount = Number($page.url.searchParams.get('employees')) || 0;

  /**
   * Determine company size value based on employee count
   * @param {number} count - Number of employees
   * @returns {string} Company size value for select
   */
  function getCompanySizeValue(count) {
    if (count === 1) return 'freelancer';
    if (count <= 10) return '1-10';
    if (count <= 20) return '10-20';
    if (count <= 50) return '20-50';
    if (count <= 100) return '50-100';
    if (count <= 200) return '100-200';
    if (count <= 500) return '200-500';
    if (count <= 1000) return '500-1000';
    if (count <= 2500) return '1000-2500';
    return '2500+';
  }

  // Pre-select company size when employee count is provided
  $: if (employeeCount && companySizeSelect) {
    companySizeSelect.value = getCompanySizeValue(employeeCount);
  }

  // Track selected company size for price display
  let selectedCompanySize = '';

  /** @param {Event} event */
  function handleCompanySizeChange(event) {
    const select = /** @type {HTMLSelectElement} */ (event.target);
    selectedCompanySize = select.value;
  }

  function handleLoginSuccess() {
    showLoginModal = false;
  }

  /**
   * Handle form submission and redirect to forecasted page with params
   * @param {Event} event - Form submission event
   */
  function handleSubmit(event) {
    event.preventDefault();
    const form = /** @type {HTMLFormElement} */ (event.target);
    const formData = new FormData(form);
    
    const yearValue = /** @type {string} */ (formData.get('season'));
    const generation = /** @type {string} */ (formData.get('generation'));
    
    // Only proceed if year and generation are selected
    if (yearValue && generation) {
      // Format year with space (e.g., "ss2025" -> "ss 2025")
      const season = yearValue.substring(0, 2);
      const year = yearValue.substring(2);
      const formattedYear = `${season} ${year}`;

      // Save form data to session storage
      updateForecastForm({
        companySize: /** @type {string} */ (formData.get('company-size')),
        category: /** @type {string} */ (formData.get('category')),
        year: /** @type {string} */ (formattedYear),
        generation: /** @type {string} */ (generation)
      });

      // Use goto for client-side navigation
      const params = new URLSearchParams({
        year: /** @type {string} */ (yearValue), // Keep original format for URL
        generation: /** @type {string} */ (generation)
      });
      goto(`/forcasted?${params.toString()}`);
    }
  }

  /**
   * Format the year/season string to be more readable
   * @param {string} yearStr - The year and season string in format "ssYYYY" or "fwYYYY"
   * @returns {string} Formatted string like "2024 Spring Summer" or "2024 Fall Winter"
   */
  function formatYearSeason(yearStr) {
    const prefix = yearStr.substring(0, 2);
    const year = yearStr.substring(2);
    const season = prefix === 'ss' ? 'Spring Summer' : 'Fall Winter';
    return `${year} ${season}`;
  }

  /**
   * Get price based on company size selection
   * @param {string} size - Selected company size
   * @returns {number} Price for the selected company size
   */
  function getCompanySizePrice(size) {
    switch (size) {
      case 'freelancer':
        return 30;
      case '1-10':
        return 100;
      case '10-20':
        return 250;
      case '20-50':
        return 400;
      case '50-100':
        return 600;
      case '100-200':
        return 1000;
      case '200-500':
        return 1500;
      case '500-1000':
        return 2000;
      case '1000-2500':
        return 2500;
      case '2500+':
        return 3000;
      default:
        return 0;
    }
  }
</script>

<ParticleTrail />

<div class="page-layout">
  <nav class="nav-column nav-left">
    <Nav position="left" />
  </nav>
  
  <main class="main-content p-60">
    <section class="forecast-section glass p-30">
      <h2>Start Your Forecast</h2>
      
      {#if $authStore}
        <form class="forecast-form" on:submit={handleSubmit}>
          <!-- Personal Information Section -->
          <div class="form-section mb-40">
            <h3>Personal Information</h3>
            <div class="form-row">
              <div class="input-group">
                <label for="first-name">First Name</label>
              <input class="input-field" type="text" id="first-name" name="first-name" placeholder="First Name" bind:value={firstName} required>
              </div>
              <div class="input-group">
                <label for="last-name">Last Name</label>
              <input class="input-field" type="text" id="last-name" name="last-name" placeholder="Last Name" bind:value={lastName} required>
              </div>
            </div>

            <div class="form-row">
              <div class="input-group">
                <label for="email">Email</label>
              <input class="input-field" type="email" id="email" name="email" placeholder="Email" bind:value={email} required>
              </div>
              <div class="input-group">
                <label for="company">Company</label>
                <input class="input-field" type="text" id="company" name="company" placeholder="Company" required>
              </div>
            </div>

            <div class="input-group">
              <label for="company-size">Company Size</label>
              <select 
                bind:this={companySizeSelect}
                class="input-field" 
                id="company-size" 
                name="company-size"
                on:change={handleCompanySizeChange}
                required
              >
                <option value="">Select company size</option>
                <option value="freelancer">Freelancer</option>
                <option value="1-10">Less than 10 employees</option>
                <option value="10-20">10-20 employees</option>
                <option value="20-50">20-50 employees</option>
                <option value="50-100">50-100 employees</option>
                <option value="100-200">100-200 employees</option>
                <option value="200-500">200-500 employees</option>
                <option value="500-1000">500-1000 employees</option>
                <option value="1000-2500">1000-2500 employees</option>
                <option value="2500+">More than 2500 employees</option>
              </select>
            </div>
          </div>

          <!-- Category Information Section -->
          <div class="form-section mb-40">
            <h3>Category Information</h3>
            <div class="input-group">
              <label for="category">Product Category</label>
              <select class="input-field" id="category" name="category" required>
                <option value="">Select a category</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <div class="input-group">
              <label for="season">Year/Season</label>
              <select class="input-field" id="season" name="season" required>
                <option value="">Select a year/season</option>
                {#each data.years || [] as year}
                <option value={year}>{formatYearSeason(year)}</option>
                {/each}
              </select>
            </div>

            <div class="input-group">
              <label for="generation">Generation</label>
              <select class="input-field" id="generation" name="generation" required>
                <option value="">Select a generation</option>
                <option value="gen_z">Generation Z</option>
                <option value="millennial">Millennial</option>
                <option value="gen_x">Generation X</option>
                <option value="baby_boomer">Baby Boomer</option>
              </select>
            </div>
          </div>

          <!-- Price Display Section -->
          {#if selectedCompanySize}
            <div class="price-section mb-40 text-center">
              <h3>One-Time Payment</h3>
              <p class="price-display">€{getCompanySizePrice(selectedCompanySize)}</p>
            </div>
          {/if}

          <!-- Submit button -->
          <div class="input-group">
            <button type="submit" class="glass-button">Submit Forecast</button>
          </div>
        </form>
      {:else}
        <div class="login-prompt">
          <p class="text-md">Please log in to access the forecast tool</p>
          <button class="glass-button" on:click={() => showLoginModal = true}>
            Login
          </button>
        </div>
      {/if}
    </section>
  </main>

  <nav class="nav-column nav-right">
    <Nav position="right" />
  </nav>
</div>

{#if showLoginModal}
  <LoginModal 
    on:success={handleLoginSuccess}
    on:close={() => showLoginModal = false}
  />
{/if}

<style>
  /* Form Section Styles */
  .form-section {
    padding: 20px 0;
    border-bottom: 1px solid var(--glass-border);
  }

  .form-section:last-child {
    border-bottom: none;
  }

  .form-section h3 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    text-align: center;
    color: var(--text-color);
  }

  /* Price Section Styles */
  .price-section {
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--glass-border);
  }

  .price-section h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: var(--text-color);
  }

  .price-display {
    font-size: 4rem;
    font-family: var(--font-primary);
    color: var(--primary-color);
    margin: 0;
  }

  /* Style select dropdowns */
  select.input-field {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;
  }

  select.input-field option {
    padding: 0.8rem;
    font-size: 1rem;
    background: white;
    color: #333;
  }

  select.input-field option:first-child {
    color: #666;
    font-style: italic;
  }

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
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    min-height: 100vh;
  }

  .forecast-section {
    width: 100%;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 30px;
    color: var(--text-color);
    font-family: var(--font-heading);
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }

  .form-row .input-group {
    flex: 1;
  }

  .login-prompt {
    text-align: center;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .page-layout {
      flex-direction: column;
    }

    .nav-column {
      display: none;
    }

    /* Show only the left navigation on mobile */
    .nav-left {
      display: block;
    }

    .main-content {
      min-height: auto;
      padding: var(--content-padding);
    }

    .form-row {
      flex-direction: column;
      gap: 0;
    }

    h2 {
      font-size: 2rem;
    }

    .price-display {
      font-size: 3rem;
    }
  }
</style>
