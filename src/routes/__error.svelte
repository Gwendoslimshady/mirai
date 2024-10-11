<script context="module">
  export function load({ status }) {
    return { status };
  }
</script>

<script>
  import Nav from '$lib/components/Nav.svelte'; // Import the Nav component
  let navWidth = '20%'; // Set a default width for the navigation bar
  export let status;
</script>

<main>
  <Nav width={navWidth} />
  
  <section class="error-section">
    <div class="content">
      <h1>{status === 404 ? '404 - Page Not Found' : 'Error Occurred'}</h1>
      <p>{status === 404 ? 'Sorry, the page you are looking for does not exist.' : 'Something went wrong.'}</p>
      <a href="/" class="back-link">Go back to the homepage</a>
    </div>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }

  .error-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: white;
    text-align: center;
    width: calc(100% - var(--nav-width)); /* Adjust for nav width */
  }

  .content {
    max-width: 600px;
    width: 100%;
  }

  h1 {
    font-size: 36px;
    font-weight: bold;
    color: #e74c3c;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 20px;
  }

  .back-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }

  .back-link:hover {
    background-color: #0056b3;
  }
</style>
