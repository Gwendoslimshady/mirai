<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  // Get the data from page.js
  export let data;
  
  let navWidth = '20%';
  
  // Log the data to console
  console.log('Page Data:', data);
</script>

<main>
  <Nav width={navWidth} />
  <section class="forecast-section">
    <h2>Start Your Forecast</h2>
    <form class="forecast-form">
      <!-- Input for first and last name -->
      <div class="form-row">
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" placeholder="First Name" required>
        </div>
        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" placeholder="Last Name" required>
        </div>
      </div>

      <!-- Input for email and company -->
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label for="company">Company</label>
          <input type="text" id="company" name="company" placeholder="Company" required>
        </div>
      </div>

      <!-- Company size dropdown -->
      <div class="form-group">
        <label for="company-size">Company Size</label>
        <select id="company-size" name="company-size" required>
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
      <div class="form-group">
        <label for="category">Product Category</label>
        <select id="category" name="category" required>
          <option value="">Select a category</option>
          {#each data.categories || [] as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <!-- Select dropdown for year/season using years from fashion_colours -->
      <div class="form-group">
        <label for="season">Year/Season</label>
        <select id="season" name="season" required>
          <option value="">Select a year/season</option>
          {#each data.years || [] as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
      </div>

      <!-- Generation dropdowns using static values since we don't have a generations collection -->
      <div class="form-group">
        <label for="generation">Generation</label>
        <select id="generation" name="generation" required>
          <option value="">Select a generation</option>
          <option value="gen_z">Gen Z</option>
          <option value="millennial">Millennial</option>
          <option value="gen_x">Gen X</option>
          <option value="baby_boomer">Baby Boomer</option>
        </select>
      </div>

      <div class="form-group">
        <label for="target-generation">Target Customer Generation</label>
        <select id="target-generation" name="target-generation" required>
          <option value="">Select a target generation</option>
          <option value="gen_z">Gen Z</option>
          <option value="millennial">Millennial</option>
          <option value="gen_x">Gen X</option>
          <option value="baby_boomer">Baby Boomer</option>
        </select>
      </div>

      <!-- Submit button -->
      <div class="form-group">
        <button type="submit">Submit Forecast</button>
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
  }

  .forecast-section {
    width: 100%;
    max-width: 800px;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  h2 {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 48%;
  }

  .form-group label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .form-group textarea {
    resize: vertical;
    height: 150px;
  }

  button {
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }

  button:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
    }

    .form-group {
      width: 100%;
    }

    button {
      font-size: 18px;
    }
  }
</style>
