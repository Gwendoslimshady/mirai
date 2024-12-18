<script>
  import { fade, slide } from 'svelte/transition';

  export let width;
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  /** @param {string} id */
  function scrollToSection(id) {
    const currentPath = window.location.pathname;
    const targetSection = `#${id}`;

    if (currentPath === '/') {
      const section = document.querySelector(targetSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/${targetSection}`;
    }
    closeMenu();
  }
</script>

<button class="nav-toggle" on:click={toggleMenu} aria-label="Toggle navigation menu">
  <div class="hamburger" class:open={isMenuOpen}>
    <span></span>
    <span></span>
    <span></span>
  </div>
</button>

{#if isMenuOpen}
  <div class="nav-fullscreen" transition:fade={{ duration: 200 }}>
    <nav class="mobile-nav">
      <ul class="nav-menu">
        {#each [
          { section: 'header', label: 'start a forecast' },
          { section: 'how-it-works', label: 'how it works' },
          { section: 'about', label: 'about' },
          { section: 'prices', label: 'prices' },
          { section: 'contact', label: 'contact' },
          { section: '', label: 'Start', href: '/' },
          { section: '', label: 'Forecast', href: '/forecast' },
          { section: '', label: 'Login', href: '/login' }
        ] as link}
          <li transition:slide={{ duration: 200, delay: 100 }}>
            <a 
              class="nav-link" 
              on:click={() => scrollToSection(link.section)} 
              href={link.href || 'javascript:void(0)'}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<nav class="nav-side left">
  <ul class="nav-menu">
    {#each [
      { section: 'header', label: 'mirai' },
      { section: 'how-it-works', label: 'how it works' },
      { section: 'about', label: 'about' },
      { section: 'prices', label: 'prices' },
      { section: 'contact', label: 'contact' }
    ] as link}
      <li>
        <a class="nav-link" on:click={() => scrollToSection(link.section)}>{link.label}</a>
      </li>
    {/each}
  </ul>
</nav>

<nav class="nav-side right">
  <ul class="nav-menu">
    {#each [
      { href: '/forecast', label: 'start forecast' },
      { href: '/login', label: 'Login' }
    ] as link}
      <li><a class="nav-link" href={link.href}>{link.label}</a></li>
    {/each}
  </ul>
</nav>

<style>
  .mobile-nav {
    width: 100%;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  .hamburger span {
    width: 24px;
    height: 2px;
    background-color: var(--nav-link-color);
    transition: all 0.3s ease-in-out;
    transform-origin: 1px;
  }

  .hamburger.open span:first-child {
    transform: rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:last-child {
    transform: rotate(-45deg);
  }
</style>
