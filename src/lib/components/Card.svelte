<script>
    export let title;
    export let description;
  </script>
  
  <div class="card">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
  
  <style>
    .card {
      background: rgba(255, 255, 255, 0.15); /* Light glass effect */
      border-radius: 20px;
      padding: 30px;
      backdrop-filter: blur(15px); /* Blur for glassmorphism */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Soft shadow */
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid rgba(255, 255, 255, 0.2); /* Very light border */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .card:hover {
      transform: scale(1.05); /* Subtle hover effect */
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
  
    h2 {
      font-size: 1.8rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
  
    p {
      font-size: 1.2rem;
      color: #555;
      text-align: center;
    }
  </style>
  