<script>
  export let groups = [];
  export let currentSlug = '';
  export let basePath = '/docs';
</script>

<aside class="doc-sidebar">
  <span class="eyebrow">Document Map</span>

  {#each groups as group}
    <div class="doc-nav-group">
      <h2 class="docs-group__title">{group.name}</h2>
      <div class="doc-nav-list">
        {#each group.docs as doc}
          <a
            class:is-active={doc.slug === currentSlug}
            class="doc-nav-link"
            href={`${basePath}/${doc.slug}`}
          >
            {doc.title}
          </a>
        {/each}
      </div>
    </div>
  {/each}
</aside>
