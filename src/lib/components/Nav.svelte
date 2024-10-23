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
        <li><a class="nav-link" on:click={() => scrollToSection('header')}>start a forecast</a></li>
        <li><a class="nav-link" on:click={() => scrollToSection('how-it-works')}>how it works</a></li>
        <li><a class="nav-link" on:click={() => scrollToSection('about')}>about</a></li>
        <li><a class="nav-link" on:click={() => scrollToSection('prices')}>prices</a></li>
        <li><a class="nav-link" on:click={() => scrollToSection('contact')}>contact</a></li>
        <!-- New links for mobile -->
        <li><a class="nav-link" href="/">Start</a></li>
        <li><a class="nav-link" href="/forecast">Forecast</a></li>
        <li><a class="nav-link" href="/login">Login</a></li>
      </ul>
    </div>
{/if}

<!-- Regular Sidebar Navigation (Left) -->
<nav class="left-nav">
    <ul>
      <li><a class="nav-link" on:click={() => scrollToSection('header')}>mirai</a></li>
      <li><a class="nav-link" on:click={() => scrollToSection('how-it-works')}>how it works</a></li>
      <li><a class="nav-link" on:click={() => scrollToSection('about')}>about</a></li>
      <li><a class="nav-link" on:click={() => scrollToSection('prices')}>prices</a></li>
      <li><a class="nav-link" on:click={() => scrollToSection('contact')}>contact</a></li>
    </ul>
</nav>

<!-- Right-side fixed links -->
<nav class="right-nav">
    <ul>
      <li><a class="nav-link" href="/forecast">start forecastt</a></li>
      <li><a class="nav-link" href="/login">Login</a></li>
    </ul>
</nav>

<style>
    /* Burger Menu and Mobile Styles */
    .menu-toggle {
      display: none;
      font-size: 2.5rem;
      width: 60px;
      height: 60px;
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    .fullscreen-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.95);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 80px;
      z-index: 1000;
    }

    .fullscreen-menu ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    .fullscreen-menu li {
      margin-bottom: 20px;
    }

    .fullscreen-menu .nav-link {
      font-size: 2rem;
      font-weight: 600;
      text-decoration: none;
      color: #333;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .fullscreen-menu .nav-link:hover {
      color: #000;
    }

    /* Left-side Navigation Styling */
    .left-nav {
      position: fixed;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      z-index: 10;
      background-color: transparent;
      padding-left: 100px; /* Added left padding */
    }

    .left-nav ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .left-nav li {
      display: inline-block;
    }

    .left-nav a {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: .35rem;
      color: #333;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .left-nav a:hover {
      color: #000;
    }

    /* Right-side Navigation Styling */
    .right-nav {
      position: fixed;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      z-index: 10;
      background-color: transparent;
      padding-right: 100px; /* Added right padding */
    }

    .right-nav ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 15px;
      text-align: right;
    }

    .right-nav li {
      display: inline-block;
    }

    .right-nav a {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: .35rem;
      color: #333;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .right-nav a:hover {
      color: #000;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }

      .left-nav, .right-nav {
        display: none; /* Hide both navs on mobile */
      }
    }

    @media (min-width: 769px) {
      .menu-toggle {
        display: none;
      }

      .left-nav, .right-nav {
        display: block; /* Show both navs on larger screens */
      }
    }
</style>
