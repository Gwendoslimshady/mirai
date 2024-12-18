<script>
  import { fade } from 'svelte/transition'; 

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

<div class="nav-toggle" on:click={toggleMenu}>
  {#if !isMenuOpen}
    <span>&#9776;</span>
  {:else}
    <span>✕</span>
  {/if}
</div>

{#if isMenuOpen}
  <div class="nav-fullscreen">
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
        <li>
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
