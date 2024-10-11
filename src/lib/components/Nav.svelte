<script>
	export let width;
  
	let isMenuOpen = false; // State to track whether the menu is open or not
  
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
	  closeMenu(); // Close the menu after clicking a link
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
		<li><a class="nav-link" on:click={() => scrollToSection('footer')}>footer</a></li>
	  </ul>
	</div>
  {/if}
  
  <!-- Regular Sidebar Navigation (visible on desktop) -->
  <nav class="nav-container">
	<ul>
	  <li><a class="nav-link" on:click={() => scrollToSection('header')}>start a forecast</a></li>
	  <li><a class="nav-link" on:click={() => scrollToSection('how-it-works')}>how it works</a></li>
	  <li><a class="nav-link" on:click={() => scrollToSection('about')}>about</a></li>
	  <li><a class="nav-link" on:click={() => scrollToSection('prices')}>prices</a></li>
	  <li><a class="nav-link" on:click={() => scrollToSection('contact')}>contact</a></li>
	  <li><a class="nav-link" on:click={() => scrollToSection('footer')}>footer</a></li>
	</ul>
  </nav>
  
  <style>
	/* Mobile burger menu and close button styling */
	.menu-toggle {
	  display: block;
	  font-size: 2.5rem;
	  width: 60px;  /* Fixed width */
	  height: 60px; /* Fixed height */
	  position: fixed;
	  top: 20px;
	  left: 20px; /* Align on the left side */
	  z-index: 1001; /* Increase z-index to be on top */
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  cursor: pointer;
	  background-color: transparent;
	  border: none;
	}
  
	/* Style for burger and close icons */
	.burger-icon, .close-icon {
	  font-size: 2.5rem; /* Same font size */
	  display: block;
	  line-height: 1;
	}
  
	/* Fullscreen mobile menu styling */
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
	  padding: 80px; /* More padding for spacious feel */
	  z-index: 1000; /* Set z-index lower than the toggle */
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
  
	/* Regular Sidebar Navigation (for desktop) */
	.nav-container {
	  z-index: 10;
	  position: fixed;
	  top: 50%;
	  transform: translateY(-50%);
	  left: 0;
	  padding: 8rem;
	  width: var(--nav-width);
	  display: none;
	}
  
	ul {
	  list-style-type: none;
	  padding: 0;
	  margin: 0;
	  display: flex;
	  flex-direction: column;
	  gap: 15px;
	  text-align: right;
	}
  
	.nav-link {
	  font-size: 1.25rem;
	  font-weight: 500;
	  letter-spacing: .35rem;
	  color: #333;
	  cursor: pointer;
	  text-decoration: none;
	  transition: font-weight 0.3s ease, color 0.3s ease;
	  line-height: 2.5rem;
	}
  
	.nav-link:hover {
	  color: #000;
	}
  
	/* Responsive Styles */
	@media (max-width: 768px) {
	  /* Show the burger menu on mobile */
	  .nav-container {
		display: none;
	  }
	}
  
	@media (min-width: 769px) {
	  /* Show sidebar navigation on larger screens */
	  .nav-container {
		display: block;
	  }
	}
  </style>
  