<script>
  import { base } from '$app/paths';
  import { browser } from '$app/environment';
  import DocSidebar from '$lib/components/DocSidebar.svelte';
  import DocToc from '$lib/components/DocToc.svelte';
  import { renderMermaidDiagrams } from '$lib/mermaid';
  import { tick } from 'svelte';

  export let data;

  let proseElement;
  let renderedHtml = '';

  async function hydrateMermaid(html) {
    if (!browser || !proseElement || !html || html === renderedHtml) {
      return;
    }

    const currentHtml = html;
    await tick();

    if (!proseElement || currentHtml !== data.doc.html) {
      return;
    }

    await renderMermaidDiagrams(proseElement);
    renderedHtml = currentHtml;
  }

  $: if (browser && proseElement && data.doc.html) {
    hydrateMermaid(data.doc.html);
  }
</script>

<svelte:head>
  <title>{data.doc.title} | Convex Documentation | QuickHabit</title>
  <meta name="description" content={data.doc.description} />
</svelte:head>

<section class="convex-doc">
  <div class="convex-shell">
    <header class="convex-panel convex-doc__header">
      <span class="convex-chip">{data.doc.track}</span>
      <h1 class="convex-title convex-title--docs">{data.doc.title}</h1>
      <p class="convex-copy">{data.doc.description}</p>

      <div class="convex-doc__meta">
        <span>{data.doc.group}</span>
        <span>{data.doc.readTime} min read</span>
        <span>{data.doc.sourceLabel}</span>
      </div>

      <div class="convex-actions">
        <a class="convex-button convex-button--solid" href={`${base}/docs`}>Back to Convex Documentation</a>
        {#if data.sourceHref}
          <a class="convex-button convex-button--ghost" href={data.sourceHref} target="_blank" rel="noreferrer">
            View Source
          </a>
        {/if}
      </div>
    </header>

    <div class="convex-doc__layout">
      <div class="convex-doc__nav">
        <DocSidebar groups={data.groups} currentSlug={data.doc.slug} basePath={`${base}/docs`} />
      </div>

      <article class="convex-panel convex-doc__content">
        <div bind:this={proseElement} class="prose prose--convex">
          {@html data.doc.html}
        </div>

        <div class="convex-doc__pager">
          {#if data.previousDoc}
            <a class="convex-panel convex-doc__pager-card" href={`${base}/docs/${data.previousDoc.slug}`}>
              <span class="convex-label">Previous</span>
              <strong>{data.previousDoc.title}</strong>
            </a>
          {/if}

          {#if data.nextDoc}
            <a class="convex-panel convex-doc__pager-card" href={`${base}/docs/${data.nextDoc.slug}`}>
              <span class="convex-label">Next</span>
              <strong>{data.nextDoc.title}</strong>
            </a>
          {/if}
        </div>

        {#if data.relatedDocs.length > 0}
          <section class="convex-doc__related">
            <div class="convex-section__head convex-section__head--tight">
              <span class="convex-label">Related reading</span>
              <h2>Nearby Convex documents.</h2>
            </div>

            <div class="convex-feature-grid">
              {#each data.relatedDocs as doc}
                <a class="convex-panel convex-feature-card" href={`${base}/docs/${doc.slug}`}>
                  <span class="convex-chip convex-chip--soft">{doc.track}</span>
                  <strong>{doc.title}</strong>
                  <p>{doc.description}</p>
                </a>
              {/each}
            </div>
          </section>
        {/if}
      </article>

      <div class="convex-doc__toc">
        <DocToc headings={data.doc.headings} />
      </div>
    </div>
  </div>
</section>
