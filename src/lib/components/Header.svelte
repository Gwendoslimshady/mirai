<script>
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';
</script>

<section class="header-section">
  <div class="content">
    <h1>mirai</h1>
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


</style>
