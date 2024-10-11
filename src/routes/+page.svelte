<script>
	import HowItWorks from '../lib/components/HowItWorks.svelte';
  import Header from '$lib/components/Header.svelte';
  import About from '$lib/components/About.svelte';
  import Prices from '$lib/components/Prices.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';

  let navWidth = '20%'; // adjustable nav width
</script>

<main>
  <Nav width={navWidth} />
  <div class="sections">
    <section id="header"><Header /></section>
    <section id="how-it-works"><div class="section-content"><HowItWorks /></div></section>
    <section id="about"><div class="section-content"><About /></div></section>
    <section id="prices"><div class="section-content"><Prices/></div></section>
    <section id="contact"><div class="section-content"><Contact /></div></section>
    <section id="footer"><Footer /></section>
  </div>
</main>

<style>
  /* Main layout: row with nav and sections */
  main {
    display: flex;
    flex-direction: row;
    min-height: 100vh; /* Ensure full height for vertical centering */
  }

  /* Navbar */
  .nav-container {
    width: var(--nav-width);
    background-color: #f0f0f0; /* Adjust as needed */
    position: fixed;
    height: 100vh; /* Full height navigation */
  }

  /* Sections container takes remaining width */
  .sections {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100% - var(--nav-width)); /* Remaining width next to the nav */
    padding: 20px;
  }

  /* Section setup to center content both horizontally and vertically */
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensure full height for vertical centering */
    width: 100%;
  }

</style>