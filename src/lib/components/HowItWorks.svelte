<script>
  // Add any necessary script logic here
</script>

<section class="how-it-works">
  <h2>How It Works</h2>
  <div class="steps-container">
    <div class="step">
      <h3>Step 1: Sign Up</h3>
      <p>Create an account to get started. Signing up is easy and only takes a few minutes.</p>
    </div>
    <div class="step">
      <h3>Step 2: Customize Your Preferences</h3>
      <p>Set your preferences and configure your personalized dashboard based on your needs.</p>
    </div>
    <div class="step">
      <h3>Step 3: Start Forecasting</h3>
      <p>Enter the relevant data to generate accurate forecasts and insights instantly.</p>
    </div>
    <div class="step">
      <h3>Step 4: Review and Take Action</h3>
      <p>Analyze the forecasts and make informed decisions to drive success in your projects or business.</p>
    </div>
  </div>
</section>

<style>
  /* General styling for the How It Works section */
  .how-it-works {
    height: 100vh; /* Full viewport height */
    width: 100vw; /* Full viewport width */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
    padding: 20px; /* Add padding to avoid edge collisions */
    text-align: center;
  }

  h2 {
    font-size: 48px;
    color: #333;
    margin-bottom: 40px; /* Space below the heading */
  }

  /* Container for the steps */
  .steps-container {
    display: flex;
    flex-direction: column; /* Stack steps vertically */
    gap: 30px; /* Space between steps */
  }

  /* Individual step styling */
  .step {
    max-width: 800px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  h3 {
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #555;
    line-height: 1.6;
  }

  /* Responsive styling for smaller screens */
  @media (max-width: 768px) {
    h2 {
      font-size: 32px;
    }

    h3 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }
</style>
