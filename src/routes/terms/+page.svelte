<script>
    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';
    let navWidth = '20%'; // adjustable nav width
</script>

<Nav width={navWidth} />
<section class="terms-section">
    <div class="content">
        <h1>Terms of Use</h1>
        <p>Last Updated: January 1, 2024</p>
        <p>
            These Terms of Use ("Terms") govern your access to and use of Mirai Studio's services, 
            including any content, functionality, and services offered on or through our website.
        </p>
        <h2>Acceptance of Terms</h2>
        <p>
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree to the Terms, 
            please do not use the website.
        </p>
        <h2>Changes to the Terms</h2>
        <p>
            Mirai Studio reserves the right to modify or replace these Terms at any time. 
            Your continued use of the website after any such changes constitutes your acceptance of the new Terms.
        </p>
        <h2>Use of Services</h2>
        <p>
            You agree to use our website for lawful purposes only and not to engage in any activity that may harm the 
            website or interfere with other users' experience.
        </p>
        <!-- Add more sections as needed -->
    </div>
</section>
<section id="footer"><Footer /></section>

<style>
  .terms-section {
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
