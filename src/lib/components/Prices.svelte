<script>
  import { goto } from '$app/navigation';
  
  let employeeCount = 1;
  let price = 50; // Starting price for 1 employee

  /** @param {number} count */
  const updatePrice = (count) => {
    employeeCount = count;
    if (count === 1) {
      price = 30; // Freelancer
    } else if (count <= 10) {
      price = 100;
    } else if (count <= 20) {
      price = 250;
    } else if (count <= 50) {
      price = 400;
    } else if (count <= 100) {
      price = 600;
    } else if (count <= 200) {
      price = 1000;
    } else if (count <= 500) {
      price = 1500;
    } else if (count <= 1000) {
      price = 2000;
    } else if (count <= 2500) {
      price = 2500;
    } else {
      price = 3000; // More than 2500 employees
    }
  };

  const handleStartForecast = () => {
    goto(`/forecast?employees=${employeeCount}`);
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
        max="3000" 
        step={employeeCount <= 10 ? "1" : "10"} 
        value={employeeCount} 
        on:input={handleInput}
        class="slider" 
      />
      
      <div class="slider-labels">
        <span class="text-md">1</span>
        <span class="text-md">100</span>
        <span class="text-md">500</span>
        <span class="text-md">2500+</span>
      </div>
    </div>

    <div class="price-display">
      <h2 class="text-xl mb-20">
        {employeeCount === 1 ? 'Freelancer' : 
         employeeCount > 2500 ? 'Over 2500 Employees' : 
         `${employeeCount} Employees`}
      </h2>
      <p class="text-huge">€{price}</p>
    </div>
    
    <button class="glass-button mt-20" on:click={handleStartForecast}>
      Start Forecast
    </button>
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

  .mt-20 {
    margin-top: 20px;
  }
</style>
