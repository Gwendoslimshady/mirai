<script>
  import HowItWorks from '../lib/components/HowItWorks.svelte';
  import Header from '$lib/components/Header.svelte';
  import About from '$lib/components/About.svelte';
  import Prices from '$lib/components/Prices.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import ParticleTrail from '$lib/components/ParticleTrail.svelte';
  import { generateRandomGradient } from '$lib/helpers/mouseHelpers.js';

  let gradient = generateRandomGradient();
  let navWidth = '20%';
</script>

<ParticleTrail />
<main class="flex flex-row">
  <Nav width={navWidth} />
  <div class="sections">
      <section id="header" class="section"><Header /></section>
      <section id="how-it-works" class="section"><div class="section-content"><HowItWorks /></div></section>
      <section id="about" class="section"><div class="section-content"><About /></div></section>
      <section id="prices" class="section"><div class="section-content"><Prices/></div></section>
      <section id="contact" class="section"><div class="section-content"><Contact /></div></section>
      <section id="footer" class="section"><Footer /></section>
  </div>
</main>

<style>
  .sections {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% - var(--nav-width));
  }

  .section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100%;
  }
</style>
