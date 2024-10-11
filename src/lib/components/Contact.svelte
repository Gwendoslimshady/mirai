<script>
  // Add any additional script logic if needed
</script>

<section class="contact-section">
  <div class="content">
    <h1>GET IN TOUCH</h1>
    
    <form class="contact-form">
      <div class="form-group">
        <div class="input-field">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required>
        </div>
        <div class="input-field">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required>
        </div>
      </div>
      
      <div class="form-group">
        <div class="input-field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="input-field">
          <label for="company">Company</label>
          <input type="text" id="company" name="company">
        </div>
      </div>
      
      <div class="textarea-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  </div>
  
  <footer class="footer">
    <p>MIRAI © 2024</p>
    <p><a href="/impressum">Impressum</a></p>
  </footer>
</section>

<style>
  /* Section layout */
  .contact-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: white;
  }

  .content {
    max-width: 800px;
    width: 100%;
  }

  /* Header styling */
  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    text-align: center;
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  /* Contact form layout */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #333;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Form groups */
  .form-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  label {
    font-size: 14px;
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

  .textarea-group {
    display: flex;
    flex-direction: column;
  }

  button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 100%;
  }

  button:hover {
    background-color: #333;
  }

  /* Footer section */
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
  }

  .footer p {
    font-size: 14px;
    color: #333;
  }

  .footer a {
    color: #333;
    text-decoration: none;
  }

  /* Responsive layout for smaller screens */
  @media (max-width: 768px) {
    .form-group {
      flex-direction: column;
    }

    .content {
      padding: 0 20px;
    }
  }
</style>
