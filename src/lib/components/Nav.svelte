<script>
	export let width;

	function scrollToSection(id) {
		const section = document.querySelector(`#${id}`);
		section.scrollIntoView({ behavior: 'smooth' });
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
	}

	/* Styling individual links */
	.nav-link {
		font-size: 1.5rem; /* Larger text */
		font-weight: 400; /* Regular weight initially */
		color: #333; /* Default color */
		cursor: pointer;
		text-decoration: none;
		transition: font-weight 0.3s ease, color 0.3s ease;
	}

	/* On hover, make the text bold and change color */
	.nav-link:hover {
		font-weight: 700; /* Bold on hover */
		color: #000; /* Darker color on hover */
	}
</style>
