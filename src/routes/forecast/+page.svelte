<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ParticleTrail from '$lib/components/ParticleTrail.svelte';
  
  // Get the data from page.js
  export let data;
  
  let navWidth = '20%';
  
  // Log the data to console
  console.log('Page Data:', data);
</script>

<ParticleTrail />

<main>
  <Nav width={navWidth} />
  <section class="forecast-section glass-card">
    <h2>Start Your Forecast</h2>
    <form class="forecast-form">
      <!-- Input for first and last name -->
      <div class="form-row">
        <div class="input-group">
          <label for="first-name">First Name</label>
          <input class="input-field" type="text" id="first-name" name="first-name" placeholder="First Name" required>
        </div>
        <div class="input-group">
          <label for="last-name">Last Name</label>
          <input class="input-field" type="text" id="last-name" name="last-name" placeholder="Last Name" required>
        </div>
      </div>

      <!-- Input for email and company -->
      <div class="form-row">
        <div class="input-group">
          <label for="email">Email</label>
          <input class="input-field" type="email" id="email" name="email" placeholder="Email" required>
        </div>
        <div class="input-group">
          <label for="company">Company</label>
          <input class="input-field" type="text" id="company" name="company" placeholder="Company" required>
        </div>
      </div>

      <!-- Company size dropdown -->
      <div class="input-group">
        <label for="company-size">Company Size</label>
        <select class="input-field" id="company-size" name="company-size" required>
          <option value="">Select company size</option>
          <option value="freelancer">Freelancer</option>
          <option value="1-10">&lt; 10 employees</option>
          <option value="10-20">&gt; 10 employees</option>
          <option value="20-50">&gt; 20 employees</option>
          <option value="50-100">&gt; 50 employees</option>
          <option value="100-200">&gt; 100 employees</option>
          <option value="200-500">&gt; 200 employees</option>
          <option value="500-1000">&gt; 500 employees</option>
          <option value="1000-2500">&gt; 1000 employees</option>
          <option value="2500+">&gt; 2500 employees</option>
        </select>
      </div>

      <!-- Product Category dropdown using pieces from fashion_colours -->
      <div class="input-group">
        <label for="category">Product Category</label>
        <select class="input-field" id="category" name="category" required>
          <option value="">Select a category</option>
          {#each data.categories || [] as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <!-- Select dropdown for year/season using years from fashion_colours -->
      <div class="input-group">
        <label for="season">Year/Season</label>
        <select class="input-field" id="season" name="season" required>
          <option value="">Select a year/season</option>
          {#each data.years || [] as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
      </div>

      <!-- Generation dropdowns using static values since we don't have a generations collection -->
      <div class="input-group">
        <label for="generation">Generation</label>
        <select class="input-field" id="generation" name="generation" required>
          <option value="">Select a generation</option>
          <option value="gen_z">Gen Z</option>
          <option value="millennial">Millennial</option>
          <option value="gen_x">Gen X</option>
          <option value="baby_boomer">Baby Boomer</option>
        </select>
      </div>

      <div class="input-group">
        <label for="target-generation">Target Customer Generation</label>
        <select class="input-field" id="target-generation" name="target-generation" required>
          <option value="">Select a target generation</option>
          <option value="gen_z">Gen Z</option>
          <option value="millennial">Millennial</option>
          <option value="gen_x">Gen X</option>
          <option value="baby_boomer">Baby Boomer</option>
        </select>
      </div>

      <!-- Submit button -->
      <div class="input-group">
        <button type="submit" class="glass-button">Submit Forecast</button>
      </div>
    </form>
  </section>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: transparent;
  }

  .forecast-section {
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 30px;
    color: #333;
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

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
      gap: 0;
    }

    .forecast-section {
      margin: 20px;
    }

    h2 {
      font-size: 2rem;
    }
  }
</style>
