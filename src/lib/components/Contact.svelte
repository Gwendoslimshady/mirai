<script>
  let name = '';
  let email = '';
  let message = '';

  const handleSubmit = () => {
    alert(`Message from ${name} has been sent.`);
  };
</script>


<section class="contact-section">
  <div class="contact-card glass-card">
    <h2>Contact Us</h2>
    <form on:submit|preventDefault={handleSubmit}>
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

<style>
  .contact-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .contact-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    backdrop-filter: blur(15px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .contact-card h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .input-group label {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }

  .input-group input,
  .input-group textarea {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    outline: none;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .input-group input:focus,
  .input-group textarea:focus {
    border-color: #007bff;
  }

  .input-group textarea {
    resize: none;
    height: 120px;
  }

  .glass-button {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 15px 30px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #333;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .glass-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .glass-button {
      padding: 15px 40px;
    }
  }
</style>

