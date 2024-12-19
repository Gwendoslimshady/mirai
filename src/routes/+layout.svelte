<script>
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { getMetadata } from '$lib/config/metadata';
    
    /** @type {string | undefined} */
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
  
<div class="layout" transition:fade={{ duration: 500 }}>
    <slot />
</div>

<style>
    .layout {
        display: flex;
        min-height: 100vh;
        width: 100%;
    }

    @media (max-width: 768px) {
        .layout {
            flex-direction: column;
        }
    }
</style>
