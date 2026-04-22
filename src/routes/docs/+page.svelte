<script>
  export let data;

  let query = '';

  $: normalizedQuery = query.trim().toLowerCase();
  $: filteredGroups = data.groups
    .map((group) => ({
      ...group,
      docs: group.docs.filter((doc) => {
        const haystack = `${doc.title} ${doc.description} ${doc.group} ${doc.track}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    }))
    .filter((group) => group.docs.length > 0);
</script>

<svelte:head>
  <title>Convex Documentation | QuickHabit</title>
  <meta
    name="description"
    content="Local documentation index for the QuickHabit Convex runtime."
  />
</svelte:head>

<section class="convex-docs">
  <div class="convex-shell">
    <header class="convex-panel convex-docs__hero">
      <div>
        <span class="convex-chip">{data.hub.caption}</span>
        <h1 class="convex-title convex-title--docs">Convex documentation.</h1>
        <p class="convex-copy">
          This project keeps the hosted-runtime documents in one place so the Convex lane stays
          readable as a standalone system.
        </p>
      </div>

      <div class="convex-docs__controls">
        <div class="convex-actions">
          <a class="convex-button convex-button--solid" href="/">Back to Hub</a>
        </div>

        <label class="convex-search">
          <span class="sr-only">Search convex docs</span>
          <input bind:value={query} placeholder="Search documents, topics, or repos" type="search" />
        </label>
      </div>
    </header>

    <div class="convex-docs__layout">
      <aside class="convex-docs__aside">
        <article class="convex-panel">
          <span class="convex-label">In this view</span>
          <h2>{data.totalDocs} documents</h2>
          <p class="convex-copy">
            Runtime structure, repository ownership, client surfaces, and release-facing operating
            rules for the Convex lane.
          </p>
        </article>

        <article class="convex-panel">
          <span class="convex-label">Best first reads</span>
          <div class="convex-link-stack">
            {#each data.hub.highlightDocs as doc}
              <a href={`/docs/${doc.slug}`}>{doc.title}</a>
            {/each}
          </div>
        </article>
      </aside>

      <div class="convex-docs__groups">
        {#if filteredGroups.length === 0}
          <article class="convex-panel">
            <h2>No documents match that search.</h2>
            <p class="convex-copy">Try runtime, auth, clients, release, or repository.</p>
          </article>
        {:else}
          {#each filteredGroups as group}
            <section class="convex-panel convex-doc-group">
              <div class="convex-doc-group__head">
                <span class="convex-label">{group.name}</span>
                <span>{group.docs.length} docs</span>
              </div>

              <div class="convex-doc-group__list">
                {#each group.docs as doc, index}
                  <a class="convex-doc-row" href={`/docs/${doc.slug}`}>
                    <span class="convex-doc-row__index">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{doc.title}</strong>
                      <p>{doc.description}</p>
                      <small>{doc.track} · {doc.readTime} min · {doc.sourceLabel}</small>
                    </span>
                    <span class="convex-doc-row__arrow">↗</span>
                  </a>
                {/each}
              </div>
            </section>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>
