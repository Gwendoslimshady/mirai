<script>
      import Nav from '$lib/components/Nav.svelte';
      let navWidth = '20%'; // adjustable nav width
  </script>
  
  <Nav width={navWidth} />
  <section class="impressum-section">
    <div class="content">
      <h1>Impressum</h1>
      <p>
        Mirai Studio<br>
        Berlin, Germany<br>
        Email: contact@mirai.com<br>
        Phone: +49 (0)30 12345678
      </p>
      <p>
        Managing Director: John Doe<br>
        VAT ID: DE123456789
      </p>
      <p>
        Responsible for content according to § 55 Abs. 2 RStV:<br>
        John Doe, Address as above.
      </p>
    </div>
  </section>
  
  <style>
    .impressum-section {
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
  
    p {
      font-size: 18px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 20px;
    }
  </style>
  