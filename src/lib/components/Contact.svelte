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
  /* General layout for the contact section */
  .contact-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #ffffff; /* Light off-white background similar to pricing page */
  }

  .content {
    max-width: 800px;
    width: 100%;
    text-align: center;
  }

  /* Header styling */
  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #333;
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  /* Contact form styling */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #ffffff; /* White background for neumorphic effect */
    padding: 30px;
    border-radius: 20px;
    box-shadow: 
      8px 8px 16px rgba(0, 0, 0, 0.1),
      -8px -8px 16px rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .contact-form:hover {
    transform: translateY(-5px); /* Slight lift on hover */
    box-shadow: 
      10px 10px 20px rgba(0, 0, 0, 0.15),
      -10px -10px 20px rgba(255, 255, 255, 0.8);
  }

  /* Form groups for grouping input fields */
  .form-group {
    display: flex;
    gap: 20px;
  }

  .input-field {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }

  input, textarea {
    padding: 12px;
    font-size: 16px;
    border: none;
    background-color: #ffffff; /* Neumorphic background */
    border-radius: 12px;
    box-shadow: 
      inset 4px 4px 8px rgba(0, 0, 0, 0.1),
      inset -4px -4px 8px rgba(255, 255, 255, 0.8);
    transition: box-shadow 0.3s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    box-shadow: 
      inset 6px 6px 12px rgba(0, 0, 0, 0.2),
      inset -6px -6px 12px rgba(255, 255, 255, 0.8);
  }

  .textarea-group {
    display: flex;
    flex-direction: column;
  }

  /* Submit button styling */
  button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 12px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }

  /* Footer section */
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
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

    .contact-form {
      padding: 20px;
    }

    .content {
      padding: 0 20px;
    }
  }
</style>
