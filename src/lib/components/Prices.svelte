<script>
  // Add any pricing-related logic here, if needed
</script>

<section class="pricing-section">
  <h2>Our Pricing Plans</h2>
  <div class="pricing-container">
    <div class="pricing-card">
      <h3>Basic Plan</h3>
      <p class="price">$9.99 / month</p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
      <button>Choose Plan</button>
    </div>

    <div class="pricing-card">
      <h3>Pro Plan</h3>
      <p class="price">$29.99 / month</p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
      <button>Choose Plan</button>
    </div>

    <div class="pricing-card">
      <h3>Enterprise Plan</h3>
      <p class="price">$99.99 / month</p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
      <button>Choose Plan</button>
    </div>
  </div>
</section>

<style>
  /* General layout for the pricing section */
  .pricing-section {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    text-align: center;
  }

  h2 {
    font-size: 48px;
    color: #333;
    margin-bottom: 40px;
  }

  /* Container to hold the pricing cards */
  .pricing-container {
    display: flex;
    gap: 40px;
    justify-content: center;
    align-items: flex-start;
  }

  /* Individual pricing card */
  .pricing-card {
    background-color: #fff;
    padding: 20px;
    width: 280px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
  }

  h3 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
  }

  .price {
    font-size: 24px;
    color: #007BFF;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }

  li {
    font-size: 18px;
    color: #666;
    margin-bottom: 10px;
  }

  button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  /* Responsive styling for smaller screens */
  @media (max-width: 768px) {
    .pricing-container {
      flex-direction: column;
      gap: 20px;
    }

    h2 {
      font-size: 36px;
    }
    
    h3 {
      font-size: 24px;
    }

    .price {
      font-size: 20px;
    }
  }
</style>
