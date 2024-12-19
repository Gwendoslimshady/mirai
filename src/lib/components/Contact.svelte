<script>
  let name = '';
  let email = '';
  let message = '';

  const handleSubmit = () => {
    alert(`Message from ${name} has been sent.`);
  };
</script>

<section class="container p-60">
  <div class="glass-card">
    <h2 class="text-xl mb-30">Contact Us</h2>
    <form on:submit|preventDefault={handleSubmit} class="flex-column gap-20">
      <div class="input-group">
        <label for="name" class="text-md">Name</label>
        <input type="text" id="name" bind:value={name} placeholder="Your Name" required />
      </div>
      <div class="input-group">
        <label for="email" class="text-md">Email</label>
        <input type="email" id="email" bind:value={email} placeholder="Your Email" required />
      </div>
      <div class="input-group">
        <label for="message" class="text-md">Message</label>
        <textarea id="message" bind:value={message} placeholder="Your Message" required></textarea>
      </div>
      <button type="submit" class="glass-button">Send Message</button>
    </form>
  </div>
</section>
