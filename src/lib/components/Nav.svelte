<script>
	export let width;

	function scrollToSection(id) {
		const section = document.querySelector(`#${id}`);
		section.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav class="nav-container">
	<!-- nav content here -->
	<ul>
		<li><a class="nav-link" on:click={() => scrollToSection('header')}>Start a forecast</a></li>
		<li><a class="nav-link" on:click={() => scrollToSection('about')}>How it Works</a></li>
		<li><a class="nav-link" on:click={() => scrollToSection('services')}>Services</a></li>
		<li><a class="nav-link" on:click={() => scrollToSection('footer')}>Footer</a></li>
	</ul>
</nav>

<style>
	:global(main) {
		--nav-width: ${width};
	}
	.nav-container {
		z-index: 10;
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		padding: 20px;
		width: var(--nav-width);
	}
	.nav-link {
		cursor: pointer;
	}
</style>
