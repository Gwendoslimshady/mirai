<script>
  // Add any additional script logic if needed
</script>

<section class="pricing-section">
  <div class="content">
    <h1>MIRAI'S MISSION IS TO MAKE COLOUR TREND PREDICTIONS AVAILABLE FOR AS MANY DESIGNERS AND COMPANIES AS POSSIBLE THROUGH A FAIR PRICING STRUCTURE</h1>
    <p>Often, trend forecasting can be very expensive and therefore inaccessible for many freelancers or small businesses.</p>
    <p>Mirai uses a structure of three different pricing models according to the size of your company:</p>
    
    <div class="pricing-container">
      <div class="pricing-card">
        <h3>Freelancers and Small Companies</h3>
        <p class="employee-range">0 - 49 employees</p>
        <p class="price">130€</p>
        <button>Choose Plan</button>
      </div>

      <div class="pricing-card">
        <h3>Medium Company</h3>
        <p class="employee-range">50 - 249 employees</p>
        <p class="price">250€</p>
        <button>Choose Plan</button>
      </div>

      <div class="pricing-card">
        <h3>Large Company</h3>
        <p class="employee-range">250+ employees</p>
        <p class="price">600€</p>
        <button>Choose Plan</button>
      </div>
    </div>

    <p>A physical printed colour card is available upon request</p>
    <p>50€ plus shipping</p>
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
    background-color: white;
  }

  /* Content container */
  .content {
    max-width: 800px;
    width: 100%;
  }

  /* Header styling */
  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    line-height: 1.4;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  /* Paragraph styling */
  p {
    font-size: 18px;
    color: #333;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  /* Pricing cards layout */
  .pricing-container {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  /* Individual pricing card */
  .pricing-card {
    background-color: #fff;
    padding: 20px;
    width: 240px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px; /* Ensures all cards are of the same height */
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .employee-range {
    font-size: 18px;
    color: #007BFF;
    margin-bottom: 5px;
  }

  .price {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
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

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    .pricing-container {
      flex-direction: column;
      align-items: center;
    }

    .pricing-card {
      width: 100%;
      max-width: 300px;
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
      font-size: 18px;
    }
  }
</style>
