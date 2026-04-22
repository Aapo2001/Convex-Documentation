<script>
  import { base } from '$app/paths';

  export let data;
</script>

<svelte:head>
  <title>Convex Documentation | QuickHabit</title>
  <meta
    name="description"
    content="Standalone documentation for the QuickHabit Convex runtime across web and native clients."
  />
</svelte:head>

<section class="convex-hub">
  <div class="convex-shell">
    <header class="convex-hero">
      <div class="convex-hero__copy">
        <span class="convex-chip">{data.caption}</span>
        <h1 class="convex-title">{data.title}</h1>
        <p class="convex-copy">{data.description}</p>

        <div class="convex-actions">
          <a class="convex-button convex-button--solid" href={`${base}${data.docsHref}`}>Browse Documentation</a>
          <a class="convex-button convex-button--ghost" href={`${base}/docs/operating-model`}>Open Operating Model</a>
        </div>
      </div>

      <div class="convex-cloud">
        <article class="convex-panel convex-panel--statement">
          <span class="convex-label">Runtime posture</span>
          <strong>{data.statement}</strong>
          {#if data.trackSummary}
            <p>{data.trackSummary.summary}</p>
          {/if}
        </article>

        <div class="convex-cloud__metrics">
          <article class="convex-panel">
            <span class="convex-label">Docs in scope</span>
            <strong>{data.stats.docsPages}</strong>
          </article>
          <article class="convex-panel">
            <span class="convex-label">Runtime repos</span>
            <strong>{data.stats.repositoryCount}</strong>
          </article>
          <article class="convex-panel">
            <span class="convex-label">Operating principles</span>
            <strong>{data.stats.principlesCount}</strong>
          </article>
        </div>
      </div>
    </header>

    <section class="convex-band">
      <div class="convex-section__head">
        <span class="convex-label">Track structure</span>
        <h2>The hosted runtime and the client surfaces that depend on it.</h2>
      </div>

      <div class="convex-repo-grid">
        {#each data.repositories as repository}
          <article class="convex-panel convex-repo-card">
            <span class="convex-chip convex-chip--soft">{repository.name}</span>
            <h3>{repository.role}</h3>
            <p>{repository.detail}</p>
            <div class="convex-meta">{repository.stack}</div>
          </article>
        {/each}
      </div>
    </section>

    <section class="convex-grid">
      <div>
        <div class="convex-section__head convex-section__head--tight">
          <span class="convex-label">Focus docs</span>
          <h2>Best places to reason about the Convex runtime.</h2>
        </div>

        <div class="convex-feature-grid">
          {#each data.highlightDocs as doc}
            <a class="convex-panel convex-feature-card" href={`${base}/docs/${doc.slug}`}>
              <span class="convex-chip convex-chip--soft">{doc.track}</span>
              <strong>{doc.title}</strong>
              <p>{doc.description}</p>
            </a>
          {/each}
        </div>
      </div>

      <div>
        <div class="convex-section__head convex-section__head--tight">
          <span class="convex-label">Reading lanes</span>
          <h2>Curated docs for the Convex project.</h2>
        </div>

        <div class="convex-reading-grid">
          {#each data.readingPaths as path}
            {#if path.docs.length > 0}
              <article class="convex-panel convex-reading-card">
                <div class="convex-reading-card__head">
                  <span class="convex-reading-card__number">{path.number}</span>
                  <div>
                    <span class="convex-label">{path.name}</span>
                    <h3>{path.lead?.title ?? path.name}</h3>
                  </div>
                </div>

                <p>{path.lead?.description}</p>

                <div class="convex-link-stack">
                  {#each path.docs as doc}
                      <a href={`${base}/docs/${doc.slug}`}>{doc.title}</a>
                  {/each}
                </div>
              </article>
            {/if}
          {/each}
        </div>
      </div>
    </section>

    <section class="convex-grid">
      <article class="convex-panel">
        <div class="convex-section__head convex-section__head--tight">
          <span class="convex-label">Signals</span>
          <h2>What must stay true in practice.</h2>
        </div>

        <div class="convex-signal-list">
          {#each data.signals as signal}
            <div class="convex-signal">
              <span>{signal.label}</span>
              <p>{signal.value}</p>
            </div>
          {/each}
        </div>
      </article>

      <article class="convex-panel">
        <div class="convex-section__head convex-section__head--tight">
          <span class="convex-label">Rules of motion</span>
          <h2>Principles for the Convex runtime.</h2>
        </div>

        <ol class="convex-principles">
          {#each data.principles as principle}
            <li>{principle}</li>
          {/each}
        </ol>
      </article>
    </section>
  </div>
</section>
