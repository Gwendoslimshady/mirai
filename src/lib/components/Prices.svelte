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
  <h1 class="text-xl mb-20">Select Employee Count</h1>
  <p class="text-md mb-40">Slide to choose the number of employees and view the corresponding price.</p>
  
  <div class="glass-card">
    <div class="slider-container mb-30">
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
        <span class="text-md">1</span>
        <span class="text-md">10</span>
        <span class="text-md">30</span>
        <span class="text-md">60+</span>
      </div>
    </div>

    <div class="price-display" on:click={handlePayment}>
      <h2 class="text-xl mb-20">{employeeCount > 60 ? 'Over 60 Employees' : `${employeeCount} Employees`}</h2>
      <p class="text-huge">${price}</p>
      <p class="text-md">USD/month</p>
    </div>
  </div>
</section>

<style>
  .slider-container {
    width: 100%;
    padding: 0 20px;
  }

  .slider {
    width: 100%;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    outline: none;
    -webkit-appearance: none;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 10px;
  }

  .price-display {
    cursor: pointer;
    padding: 20px;
    transition: transform 0.2s ease;
  }

  .price-display:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    .slider-container {
      padding: 0 10px;
    }

    .slider-labels span {
      font-size: 0.9rem;
    }

    :global(.text-huge) {
      font-size: 4rem;
    }
  }

  @media (max-width: 480px) {
    .slider-labels span {
      font-size: 0.8rem;
    }

    :global(.text-huge) {
      font-size: 3rem;
    }
  }
</style>
