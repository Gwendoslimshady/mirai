<script>
  // Logic for form handling, if needed, can be added here
</script>

<section class="contact-section">
  <h2>Contact Us</h2>
  <p>If you have any questions or would like to get in touch, please fill out the form below.</p>
  
  <form class="contact-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>

    <button type="submit">Send Message</button>
  </form>
</section>

<style>
  /* General layout for the contact section */
  .contact-section {
    height: 100vh; /* Full viewport height */
    width: 100vw; /* Full viewport width */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center vertically */
    align-items: center; /* Center horizontally */
    padding: 20px;
    text-align: center;
  }

  h2 {
    font-size: 48px;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    color: #555;
    margin-bottom: 40px;
  }

  /* Styling for the contact form */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space between form fields */
    width: 100%;
    max-width: 600px; /* Restrict width for better readability */
  }

  /* Individual form groups */
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  label {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
  }

  input, textarea {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  textarea {
    resize: vertical;
  }

  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    h2 {
      font-size: 36px;
    }

    p {
      font-size: 18px;
    }

    button {
      font-size: 16px;
    }
  }
</style>
