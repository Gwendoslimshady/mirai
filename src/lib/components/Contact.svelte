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
    <h2>Contact Us</h2>
    <form on:submit|preventDefault={handleSubmit} class="flex-column gap-20">
      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={name} placeholder="Your Name" required />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} placeholder="Your Email" required />
      </div>
      <div class="input-group">
        <label for="message">Message</label>
        <textarea id="message" bind:value={message} placeholder="Your Message" required></textarea>
      </div>
      <button type="submit" class="glass-button">Send Message</button>
    </form>
  </div>
</section>
