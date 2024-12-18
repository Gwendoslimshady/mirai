<script>
  let employeeCount = 1;
  let price = 50; // Starting price for 1 employee

  /** @param {number} count */
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

  const handlePayment = () => {
    alert(`Proceeding to pay $${price} USD for ${employeeCount} employees.`);
  };

  /** @param {Event} event */
  const handleInput = (event) => {
    const input = /** @type {HTMLInputElement} */ (event.target);
    updatePrice(Number(input.value));
  };
</script>

<section class="container p-60 text-center">
  <h1 class="text-xl">Select Employee Count</h1>
  <p class="text-md">Slide to choose the number of employees and view the corresponding price.</p>
  
  <div class="slider-container">
    <input 
      type="range" 
      min="1" 
      max="70" 
      step="1" 
      value={employeeCount} 
      on:input={handleInput}
      class="slider" 
    />
    
    <div class="slider-labels">
      <span>1</span>
      <span>10</span>
      <span>30</span>
      <span>60+</span>
    </div>
  </div>

  <div class="price-display" on:click={handlePayment}>
    <h2>{employeeCount > 60 ? 'Over 60 Employees' : `${employeeCount} Employees`}</h2>
    <p>${price} USD/month</p>
  </div>
</section>
