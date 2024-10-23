<script>
  let employeeCount = 1;
  let price = 50; // Starting price for 1 employee

  const updatePrice = (count) => {
    employeeCount = count;
    if (count === 1) {
      price = 50;
    } else if (count === 10) {
      price = 400;
    } else if (count === 30) {
      price = 900;
    } else if (count === 60) {
      price = 1500;
    } else if (count > 60) {
      price = 2500; // Fixed price for "over 60"
    }
  };

  // Define the handlePayment function
  const handlePayment = () => {
    alert(`Proceeding to pay $${price} USD for ${employeeCount} employees.`);
    // Payment logic or redirection goes here
  };
</script>



<section class="pricing-section">
  <div class="content">
    <h1>Select Employee Count</h1>
    <p>Slide to choose the number of employees and view the corresponding price.</p>
    
    <!-- Slider -->
    <div class="slider-container">
      <input type="range" min="1" max="70" step="1" value={employeeCount} on:input={(e) => updatePrice(e.target.value)} class="slider" />
      
      <!-- Display employee ranges -->
      <div class="slider-labels">
        <span>1</span>
        <span>10</span>
        <span>30</span>
        <span>60+</span>
      </div>
    </div>

    <!-- Price Display (Clickable) -->
    <div class="price-display glass-button" on:click={handlePayment}>
      <h2>{employeeCount > 60 ? 'Over 60 Employees' : `${employeeCount} Employees`}</h2>
      <p>${price} USD/month</p>
    </div>
  </div>
</section>


<style>
  .pricing-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .pricing-section h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  .pricing-section p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 40px;
  }

  .slider-container {
    width: 100%;
    margin-bottom: 30px;
  }

  .slider {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .slider-labels span {
    font-size: 1rem;
    color: #333;
  }

  /* Clickable Price Section */
  .price-display {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 15px 30px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #333;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .price-display:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .price-display h2, .price-display p {
    margin: 0;
    color: #333;
  }

  /* Responsive Design */
  @media (min-width: 768px) {
    .slider-labels span {
      font-size: 1.2rem;
    }
  }
</style>


