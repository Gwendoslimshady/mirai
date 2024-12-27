<script>
  import { fade, slide } from 'svelte/transition';
  import { authStore } from '$lib/stores/auth';

  /** @type {'left' | 'right'} */
  export let position = 'left';

  let isMenuOpen = false;
  let isLoggedIn = false;

  // Subscribe to auth store changes
  authStore.subscribe(value => {
    isLoggedIn = !!value;
  });

  /** @typedef {{ section: string; label: string; href?: undefined }} SectionLink */
  /** @typedef {{ href: string; label: string; section?: undefined }} HrefLink */
  /** @typedef {SectionLink | HrefLink} NavLink */

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

  /** @type {NavLink[]} */
  const leftMenuItems = [
    { section: 'how-it-works', label: 'how it works' },
    { section: 'about', label: 'about' },
    { section: 'prices', label: 'prices' },
    { section: 'contact', label: 'contact' }
  ];

  /** @type {NavLink[]} */
  $: rightMenuItems = [
    { href: '/forecast', label: 'start forecast' },
    { href: '/login', label: isLoggedIn ? 'log out' : 'login' }
  ];

  /** @type {NavLink[]} */
  $: mobileMenuItems = [
    ...leftMenuItems,
    ...rightMenuItems
  ];

  /** @type {NavLink[]} */
  $: menuItems = position === 'left' ? leftMenuItems : rightMenuItems;
</script>

<button 
  class="nav-toggle {position}" 
  on:click={toggleMenu} 
  aria-label="Toggle navigation menu"
  aria-expanded={isMenuOpen}
>
  <div class="hamburger" class:open={isMenuOpen}>
    <span></span>
    <span></span>
    <span></span>
  </div>
</button>

{#if isMenuOpen}
  <div 
    class="nav-fullscreen" 
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-label="Navigation menu"
  >
    <nav class="mobile-nav">
      <ul class="nav-menu">
        {#each mobileMenuItems as link}
          <li transition:slide={{ duration: 200, delay: 100 }}>
            {#if 'href' in link}
              <a 
                class="nav-link" 
                href={link.href}
                role="menuitem"
              >
                {link.label}
              </a>
            {:else}
              <a 
                class="nav-link" 
                href="#{link.section}"
                on:click|preventDefault={() => scrollToSection(link.section)}
                role="menuitem"
              >
                {link.label}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<nav class="nav-side {position}" aria-label={position === 'left' ? 'Main navigation' : 'User navigation'}>
  <ul class="nav-menu" role="menubar">
    {#each menuItems as link}
      <li role="none">
        {#if 'href' in link}
          <a 
            class="nav-link" 
            href={link.href}
            role="menuitem"
          >
            {link.label}
          </a>
        {:else}
          <a 
            class="nav-link" 
            href="#{link.section}"
            on:click|preventDefault={() => scrollToSection(link.section)}
            role="menuitem"
          >
            {link.label}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style>
  .nav-side {
    position: fixed;
    top: 0;
    height: 100vh;
    width: var(--nav-width, 200px);
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    background-color: var(--nav-bg-color, transparent);
    z-index: 10;
  }

  .nav-side.left {
    left: 0;
    align-items: flex-start;
  }

  .nav-side.right {
    right: 0;
    align-items: flex-end;
  }

  .nav-side.right .nav-menu {
    text-align: right;
  }

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

  .nav-toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--burger-icon-padding);
  }

  .nav-toggle.left {
    left: var(--burger-icon-padding);
  }

  .nav-toggle.right {
    right: var(--burger-icon-padding);
  }

  .nav-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--fullscreen-bg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .nav-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .nav-menu li {
    margin-bottom: 1rem;
  }

  .nav-link {
    font-size: var(--nav-font-size);
    letter-spacing: var(--nav-link-spacing);
    text-decoration: none;
    color: var(--nav-link-color);
    transition: color 0.3s ease;
    padding: 0.25rem 0;
    display: inline-block;
  }

  .nav-link:hover {
    color: var(--nav-hover-color);
  }

  @media (max-width: 768px) {
    .nav-toggle {
      display: block;
      position: fixed;
      top: var(--burger-icon-padding);
      z-index: 1001;
    }

    .nav-side {
      display: none;
    }

    .nav-fullscreen .nav-menu {
      text-align: center;
    }

    .nav-fullscreen .nav-link {
      font-size: 1.2rem;
      padding: 0.5rem 0;
    }

    .nav-menu li {
      margin-bottom: 0.75rem;
    }
  }
</style>
