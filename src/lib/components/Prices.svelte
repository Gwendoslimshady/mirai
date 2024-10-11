<script>
  // Add any additional script logic if needed
</script>

<section class="pricing-section">
  <div class="content">
    <h1>MIRAI'S MISSION IS TO MAKE COLOUR TREND PREDICTIONS AVAILABLE FOR AS MANY DESIGNERS AND COMPANIES AS POSSIBLE THROUGH A FAIR PRICING STRUCTURE</h1>
    <p class="intro-text">Trend forecasting is often expensive and inaccessible for freelancers or small businesses. Mirai offers three pricing models to fit the size of your company:</p>
    
    <div class="pricing-container">
      <div class="pricing-card">
        <h3>Freelancers & Small Companies</h3>
        <p class="employee-range">0 - 49 employees</p>
        <div class="price-wrapper">
          <p class="price">130€</p>
          <p class="price-note">per forecast</p>
        </div>
        <button>Choose Plan</button>
      </div>

      <div class="pricing-card">
        <h3>Medium Companies</h3>
        <p class="employee-range">50 - 249 employees</p>
        <div class="price-wrapper">
          <p class="price">250€</p>
          <p class="price-note">per forecast</p>
        </div>
        <button>Choose Plan</button>
      </div>

      <div class="pricing-card">
        <h3>Large Companies</h3>
        <p class="employee-range">250+ employees</p>
        <div class="price-wrapper">
          <p class="price">600€</p>
          <p class="price-note">per forecast</p>
        </div>
        <button>Choose Plan</button>
      </div>
    </div>

    <p class="note">* A printed colour card is available upon request for an additional 50€ plus shipping.</p>
  </div>
</section>

<style>
  /* General layout for the pricing section */
  .pricing-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    text-align: left;
    background-color: #ffffff; /* Slight off-white background */
  }

  /* Content container */
  .content {
    max-width: 900px;
    width: 100%;
    text-align: center;
  }

  /* Header styling */
  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #333;
    line-height: 1.4;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  /* Introductory text */
  .intro-text {
    font-size: 18px;
    color: #555;
    margin-bottom: 30px;
  }

  /* Pricing cards layout */
  .pricing-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-bottom: 30px;
  }

  /* Individual pricing card */
  .pricing-card {
    background-color: #ffffff; /* White background for cards */
    padding: 30px;
    width: 280px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 350px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  /* Hover effect for pricing card */
  .pricing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #333;
  }

  /* Employee range text */
  .employee-range {
    font-size: 16px;
    color: #007BFF;
    margin-bottom: 15px;
  }

  /* Price wrapper */
  .price-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .price {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .price-note {
    font-size: 14px;
    color: #777;
    margin-top: 5px;
  }

  /* Button styling */
  button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }

  /* Additional note */
  .note {
    font-size: 14px;
    color: #777;
    margin-top: 30px;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    .pricing-container {
      flex-direction: column;
      align-items: center;
    }

    .pricing-card {
      width: 100%;
      max-width: 320px;
    }

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 16px;
    }

    h3 {
      font-size: 20px;
    }

    .price {
      font-size: 24px;
    }
  }
</style>
