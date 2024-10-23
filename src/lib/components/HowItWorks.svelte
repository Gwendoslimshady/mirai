<script>
	import Card from './Card.svelte';
</script>

<section class="how-it-works-section">
	<div class="content">
		<h1>Explore Trend Colours 4 Years Ahead</h1>
		<p>
			Receive a personalized prediction of the colours that will be trending for your product
			category.
		</p>

		<div class="cards-container">
			<Card
				title="20 Different Shades"
				description="Explore up to 20 unique shades for each season."
			/>
			<Card
				title="Key, Accent, and Base Colours"
				description="Find key, accent, and base colours tailored to your preferences."
			/>
			<Card
				title="Printed Colour Card"
				description="Get a physical colour card delivered upon request."
			/>
		</div>
	</div>
</section>

<style>
	.how-it-works-section {
		padding: 60px 20px;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.how-it-works-section h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 20px;
		color: #333;
	}

	.how-it-works-section p {
		font-size: 1.2rem;
		margin-bottom: 40px;
		color: #666;
	}

	.cards-container {
		display: grid;
		grid-template-columns: 1fr; /* One column layout */
		gap: 30px;
	}

	@media (min-width: 768px) {
		/* Keeping it 1 column even for larger screens */
		.cards-container {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 768px) {
		.cards-container {
			grid-template-columns: repeat(3, 1fr); /* 3 columns for larger screens */
		}
	}

	/* Smooth animations */
	.card {
		animation: fadeInUp 0.6s ease-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
