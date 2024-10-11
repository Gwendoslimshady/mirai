<script>
	export let width;
  
	function scrollToSection(id) {
	  const currentPath = window.location.pathname;
	  const targetSection = `#${id}`;
	  
	  if (currentPath === '/') {
		// If already on the landing page, scroll smoothly
		const section = document.querySelector(targetSection);
		section.scrollIntoView({ behavior: 'smooth' });
	  } else {
		// If not on the landing page, redirect to index with the section ID
		window.location.href = `/${targetSection}`;
	  }
	}
  </script>
  
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
	/* Global CSS variable for width, passed as a prop */
	:global(main) {
	  --nav-width: ${width};
	}
  
	/* Styling the container */
	.nav-container {
	  z-index: 10;
	  position: fixed;
	  top: 50%;
	  transform: translateY(-50%);
	  left: 0;
	  padding: 8rem;
	  width: var(--nav-width);
	}
  
	/* Styling the list */
	ul {
	  list-style-type: none;
	  padding: 0;
	  margin: 0;
	  display: flex;
	  flex-direction: column; /* Vertical list */
	  gap: 15px;
	  text-align: right;
	}
  
	/* Styling individual links */
	.nav-link {
	  font-size: 1.25rem; /* Larger text */
	  font-weight: 500; /* Regular weight initially */
	  letter-spacing: .35rem;
	  color: #333; /* Default color */
	  cursor: pointer;
	  text-decoration: none;
	  transition: font-weight 0.3s ease, color 0.3s ease;
	  line-height: 2.5rem;
	  
	}
  
	/* On hover, make the text bold and change color */
	.nav-link:hover {
	  color: #000; /* Darker color on hover */
	}
  </style>
  