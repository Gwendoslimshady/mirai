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
  main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
  }
  .sections {
    width: 100%;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .section-content {
    margin-left: var(--nav-width);
    width: calc(100% - var(--nav-width));
  }
</style>