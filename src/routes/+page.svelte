<script>
    // You can add any necessary script logic here
  </script>
  
  <style>
    @keyframes rotate {
      0% {
        transform: rotate(0deg) scale(1);
        color: red;
      }
      25% {
        transform: rotate(90deg) scale(1.2);
        color: blue;
      }
      50% {
        transform: rotate(180deg) scale(1);
        color: green;
      }
      75% {
        transform: rotate(270deg) scale(0.8);
        color: yellow;
      }
      100% {
        transform: rotate(360deg) scale(1);
        color: red;
      }
    }
  
    .rotating-text {
      display: inline-block;
      font-size: 2em;
      animation: rotate 4s infinite;
    }
  
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
  </style>
  
  <div class="container">
    <div class="rotating-text">Mirai Systems</div>
  </div>
  