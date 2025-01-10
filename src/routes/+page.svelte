<script>
  import HowItWorks from '../lib/components/HowItWorks.svelte';
  import Header from '$lib/components/Header.svelte';
  import About from '$lib/components/About.svelte';
  import Prices from '$lib/components/Prices.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';

  let gradient = generateRandomGradient();
</script>

<main class="layout">
  <Nav position="left" />
  <div class="content-wrapper">
    <div class="sections">
      <section id="header" class="section"><Header /></section>
      <section id="how-it-works" class="section"><div class="section-content"><HowItWorks /></div></section>
      <section id="about" class="section"><div class="section-content"><About /></div></section>
      <section id="prices" class="section"><div class="section-content"><Prices/></div></section>
      <section id="contact" class="section"><div class="section-content"><Contact /></div></section>
      <section id="footer" class="section"><Footer /></section>
    </div>
  </div>
  <Nav position="right" />
</main>

<style>
  .layout {
    display: flex;
    min-height: 100vh;
    width: 100%;
    position: relative;
  }

  .content-wrapper {
    flex: 1;
    min-width: 0; /* Prevent flex item from overflowing */
    margin: 0 var(--nav-width);
  }

  .sections {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 0 var(--content-padding);
  }

  .section-content {
    width: 100%;
  }

  @media (max-width: 768px) {
    .content-wrapper {
      margin: 0;
      padding-top: 60px;
    }
  }
</style>
