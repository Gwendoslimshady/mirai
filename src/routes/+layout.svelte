<script>
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { getMetadata } from '$lib/config/metadata';
    
    export let segment;
    
    $: metadata = getMetadata($page.url.pathname);
</script>
  
  <svelte:head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <meta name="keywords" content={metadata.keywords} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={metadata.url + $page.url.pathname} />
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:image" content={metadata.image} />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={metadata.url + $page.url.pathname} />
    <meta property="twitter:title" content={metadata.title} />
    <meta property="twitter:description" content={metadata.description} />
    <meta property="twitter:image" content={metadata.image} />
  </svelte:head>
  
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
  