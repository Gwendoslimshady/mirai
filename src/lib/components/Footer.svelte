<script>
  // Any additional footer-related logic can go here
</script>

<footer class="footer">
  <div class="footer-content">
    <p>&copy; 2023 Mirai. All rights reserved.</p>
    <ul class="footer-links">
      <li><a href="/terms">Terms of Service</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/contact">Contact Us</a></li>
    </ul>
  </div>
</footer>

<style>
  /* Footer styling */
  .footer {
    width: 100vw;
    padding: 20px;
    text-align: center;
    position: relative;
    bottom: 0;
  }

  /* Content inside the footer */
  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  p {
    font-size: 16px;
    margin: 0;
  }

  /* Footer links */
  .footer-links {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 15px;
  }

  .footer-links li {
    display: inline;
  }

  .footer-links a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #ccc;
  }

  /* Responsive footer for smaller screens */
  @media (max-width: 768px) {
    p {
      font-size: 14px;
    }

    .footer-links a {
      font-size: 14px;
    }
  }
</style>
