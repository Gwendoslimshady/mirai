<script>
	import Card from './Card.svelte';
</script>

<section class="container-lg p-60 text-center">
	<h1 class="text-xl">Explore Trend Colours 4 Years Ahead</h1>
	<p class="text-md">
		Receive a personalized prediction of the colours that will be trending for your product
		category.
	</p>

	<div class="grid grid-1 grid-3 gap-30">
		<div class="fade-in-up">
			<Card
				title="20 Different Shades"
				content="Explore up to 20 unique shades for each season."
			/>
		</div>
		<div class="fade-in-up">
			<Card
				title="Key, Accent, and Base Colours"
				content="Find key, accent, and base colours tailored to your preferences."
			/>
		</div>
		<div class="fade-in-up">
			<Card
				title="Printed Colour Card"
				content="Get a physical colour card delivered upon request."
			/>
		</div>
	</div>
</section>
