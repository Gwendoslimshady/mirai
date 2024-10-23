<script>
  import { fade } from 'svelte/transition'; 

  // Configurable variables
  export let width;
  let isMenuOpen = false;

  // Function to toggle the mobile menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Function to close the menu
  function closeMenu() {
    isMenuOpen = false;
  }

  // Function to scroll to a section smoothly
  function scrollToSection(id) {
    const currentPath = window.location.pathname;
    const targetSection = `#${id}`;

    if (currentPath === '/') {
      const section = document.querySelector(targetSection);
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${targetSection}`;
    }
    closeMenu();
  }
</script>

<!-- Burger Menu Button (visible on mobile only) -->
<div class="menu-toggle" on:click={toggleMenu}>
  {#if !isMenuOpen}
    <span class="burger-icon">&#9776;</span> <!-- Burger Icon -->
  {:else}
    <span class="close-icon">✕</span> <!-- Close Icon -->
  {/if}
</div>

<!-- Fullscreen Mobile Navigation Menu -->
{#if isMenuOpen}
  <div class="fullscreen-menu">
    <ul>
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

<!-- Left Sidebar Navigation -->
<nav class="left-nav">
  <ul>
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

<!-- Right Sidebar Navigation -->
<nav class="right-nav">
  <ul>
    {#each [
      { href: '/forecast', label: 'start forecast' },
      { href: '/login', label: 'Login' }
    ] as link}
      <li><a class="nav-link" href={link.href}>{link.label}</a></li>
    {/each}
  </ul>
</nav>

<style>
  /* Variables */
  :root {
    --menu-toggle-size: 2.5rem;
    --nav-font-size: 1rem;
    --nav-link-spacing: .35rem;
    --nav-link-color: #333;
    --nav-hover-color: #979797;
    --burger-icon-padding: 20px;
    --fullscreen-bg: rgba(255, 255, 255, 0.95);
    --menu-padding: 80px;
  }

  /* Mobile burger menu button styling */
  .menu-toggle {
    display: none;
    font-size: var(--menu-toggle-size);
    width: 60px;
    height: 60px;
    position: fixed;
    top: var(--burger-icon-padding);
    left: var(--burger-icon-padding);
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  /* Fullscreen mobile menu */
  .fullscreen-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--fullscreen-bg);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: var(--menu-padding);
    z-index: 1000;
  }

  .fullscreen-menu ul, .left-nav ul, .right-nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .fullscreen-menu li, .left-nav li, .right-nav li {
    margin-bottom: 20px;
  }

  .nav-link {
    font-size: var(--nav-font-size);
    letter-spacing: var(--nav-link-spacing);
    text-decoration: none;
    color: var(--nav-link-color);
    transition: color 0.3s ease;
    position: relative;
    font-family: 'Tako', sans-serif;
    line-height: 1rem;
    cursor: pointer; /* Add pointer cursor to indicate clickable link */
  }

  .nav-link:hover {
    color: var(--nav-hover-color);
  }

  /* Hover effect */
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    background-color: var(--nav-hover-color);
    left: 50%;
    bottom: -5px;
    transition: width 0.3s ease, left 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
    left: 0;
  }

  /* Left and right navigation styles */
  .left-nav, .right-nav {
    position: fixed;
    top: 20px;
    z-index: 10;
  }

  .left-nav {
    left: 20px;
    padding-top: 100px;
    padding-left: 100px;
  }

  .right-nav {
    right: 20px;
    padding-top: 100px;
    padding-right: 100px;
    text-align: right;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }

    .left-nav, .right-nav {
      display: none;
    }
  }

  @media (min-width: 769px) {
    .menu-toggle {
      display: none;
    }

    .left-nav, .right-nav {
      display: block;
    }
  }
</style>
