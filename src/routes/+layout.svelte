<script>
  import '../app.css';
  import '$lib/styles/convex.css';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
</script>

<div class="site-shell">
  <SiteHeader />
  <slot />
  <SiteFooter />
</div>
