<script>
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';
</script>

<section class="header-section">
  <div class="content">
    <h1>mirai</h1>
    <!-- Neumorphic Button -->
    <a href="/forecast" class="neumorphic-button">start forecast</a>
  </div>
</section>

<style>
  .header-section {
      position: relative;
      height: 100vh;
      width: 100vw;
      background-size: cover;
      overflow: hidden;
  }

  /* Center the content vertically and horizontally */
  .content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
  }

  h1 {
      font-size: 15rem;
      margin-bottom: 30px;
      color: #000; /* Ensure the text stands out */
  }

  /* Neumorphic styling for the button */
  .neumorphic-button {
    display: inline-block;
    padding: 30px 60px;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 8px 8px 16px #a3a3a3, -8px -8px 16px #ffffff;
    font-size: 32px;
    color: #333;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
    text-align: center;
    font-family: 'Teko', sans-serif;
  }

  .neumorphic-button:hover {
    box-shadow: 4px 4px 8px #a3a3a3, -4px -4px 8px #ffffff;
    transform: translateY(-2px);
  }

  .neumorphic-button:active {
    box-shadow: inset 8px 8px 16px #a3a3a3, inset -8px -8px 16px #ffffff;
    transform: translateY(2px);
  }
</style>
