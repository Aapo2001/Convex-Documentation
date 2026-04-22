<script>
  export let headings = [];
</script>

<aside class="doc-toc">
  <span class="eyebrow">On This Page</span>

  {#if headings.length === 0}
    <p class="doc-toc__empty">This page is short enough that it does not need a table of contents.</p>
  {:else}
    <div class="doc-toc-list">
      {#each headings as heading}
        <a
          class="doc-toc-link"
          href={`#${heading.id}`}
          style={`padding-left: ${0.72 + (heading.depth - 1) * 0.55}rem;`}
        >
          {heading.text}
        </a>
      {/each}
    </div>
  {/if}
</aside>
