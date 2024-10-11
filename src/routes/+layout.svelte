<script>
    import { fade } from 'svelte/transition';
    export let segment; // Tracks the current page segment
  </script>
  
  <!-- Wrap the page content with transition -->
  <div transition:fade="{{ duration: 500 }}">
    <slot />
  </div>
  
  <style>
    /* Optional: You can customize the body fade styles */
    .fade-enter {
      opacity: 0;
    }
    
    .fade-enter-active {
      opacity: 1;
      transition: opacity 0.5s ease-in-out;
    }
  
    .fade-leave {
      opacity: 1;
    }
  
    .fade-leave-active {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
  </style>
  