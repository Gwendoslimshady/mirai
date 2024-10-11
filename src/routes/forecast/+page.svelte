<script>
          import Nav from '$lib/components/Nav.svelte';
          import Footer from '$lib/components/Footer.svelte';
          let navWidth = '20%'; // adjustable nav width
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
  
        <!-- Select dropdown for random options (product category) -->
        <div class="form-group">
          <label for="category">Product Category</label>
          <select id="category" name="category" required>
            <option value="fashion">Fashion</option>
            <option value="automotive">Automotive</option>
            <option value="interior">Interior Design</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="technology">Technology</option>
          </select>
        </div>
  
        <!-- Select dropdown for year/season -->
        <div class="form-group">
          <label for="season">Year/Season</label>
          <select id="season" name="season" required>
            <option value="2024-winter">2024 - Winter</option>
            <option value="2024-spring">2024 - Spring</option>
            <option value="2024-summer">2024 - Summer</option>
            <option value="2024-fall">2024 - Fall</option>
            <option value="2025-winter">2025 - Winter</option>
            <option value="2025-spring">2025 - Spring</option>
          </select>
        </div>
  
        <!-- Textarea for additional message -->
        <div class="form-group">
          <label for="message">Additional Information</label>
          <textarea id="message" name="message" placeholder="Enter any additional information here..."></textarea>
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
      width: 48%; /* Ensures two columns fit side by side */
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
  