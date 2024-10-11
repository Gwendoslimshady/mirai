<script>
    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';
    let navWidth = '20%'; // adjustable nav width
</script>

<Nav width={navWidth} />
<section class="privacy-section">
    <div class="content">
        <h1>Privacy Policy</h1>
        <p>Last Updated: January 1, 2024</p>
        <p>
            At Mirai Studio, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy outlines how we collect, use, and protect your data when you visit our website.
        </p>
        <h2>Information We Collect</h2>
        <p>
            We may collect personal information, such as your name, email address, and company information, 
            when you use our contact forms or request a forecast.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
            Your information is used to provide the services you have requested, communicate with you, 
            and improve our website.
        </p>
        <h2>Data Protection</h2>
        <p>
            We implement a variety of security measures to maintain the safety of your personal information.
        </p>
        <!-- Add more sections as needed -->
    </div>
</section>
<section id="footer"><Footer /></section>

<style>
  .privacy-section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background-color: white;
      text-align: left;
  }

  .content {
      max-width: 800px;
      width: 100%;
  }

  h1 {
      font-size: 36px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 20px;
  }

  h2 {
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 10px;
  }

  p {
      font-size: 18px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 20px;
  }
</style>
