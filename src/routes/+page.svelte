<script>
  
	import HowItWorks from '../lib/components/HowItWorks.svelte';
  import Header from '$lib/components/Header.svelte';
  import About from '$lib/components/About.svelte';
  import Prices from '$lib/components/Prices.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import RevealOverlay from '$lib/components/RevealOverlay.svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';

  let gradient = generateRandomGradient(); // Generate a random gradient background
  let navWidth = '20%'; // adjustable nav width

  import { onMount } from 'svelte';
  import FontFaceObserver from 'fontfaceobserver';

  let fontsLoaded = false;

  onMount(() => {
    const fontWorkSans = new FontFaceObserver('Work Sans', { weight: 400 });
    const fontTeko = new FontFaceObserver('Teko', { weight: 400 });

    // Load both fonts asynchronously
    Promise.all([fontWorkSans.load(), fontTeko.load()])
      .then(() => {
        fontsLoaded = true;
        document.documentElement.classList.add('fonts-loaded'); // Add class when fonts are loaded
      })
      .catch((err) => {
        console.error('Font loading failed:', err);
      });
  });
  
</script>

<RevealOverlay gradient={gradient} />
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