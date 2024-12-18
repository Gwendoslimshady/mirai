<script context="module">
  /** @param {{ status: number }} params */
  export function load({ status }) {
    return { status };
  }
</script>

<script>
  import Nav from '$lib/components/Nav.svelte';
  let navWidth = '20%';
  /** @type {number} */
  export let status;
</script>

<main class="flex flex-row">
  <Nav width={navWidth} />
  
  <section class="error-section">
    <div class="container-sm text-center">
      <h1 class="text-error">{status === 404 ? '404 - Page Not Found' : 'Error Occurred'}</h1>
      <p class="text-large">{status === 404 ? 'Sorry, the page you are looking for does not exist.' : 'Something went wrong.'}</p>
      <a href="/" class="button-primary">Go back to the homepage</a>
    </div>
  </section>
</main>
