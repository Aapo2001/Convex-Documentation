import {
  docGroupOrder,
  getDocGroupSummaries,
  getDocSummaries,
  getFeaturedDocSummaries
} from '$lib/docs';

type RepositoryCard = {
  name: string;
  stack: string;
  role: string;
  detail: string;
};

type HubSignal = {
  label: string;
  value: string;
};

const siteMeta = {
  key: 'convex',
  label: 'Convex',
  name: 'Convex Documentation',
  caption: 'Hosted runtime lane',
  title: 'Standalone documentation for the QuickHabit Convex runtime.',
  description:
    'This project documents the hosted Convex runtime across the web application, native clients, and the services that keep authentication, data, and AI features aligned.',
  statement: 'Hosted functions, event-driven data flow, and one runtime contract for every Convex client.',
  href: '/',
  docsHref: '/docs',
  repositories: [
    {
      name: 'quickhabits-svelte-convex',
      stack: 'Svelte 5 + Vite',
      role: 'Hosted web client',
      detail: 'Implements the browser experience directly against the Convex runtime for session-aware data and action flows.'
    },
    {
      name: 'QuickHabitconvex',
      stack: 'Android Compose + desktop surfaces',
      role: 'Native client package',
      detail: 'Owns the native user experience and keeps host configuration, deep links, and runtime assumptions aligned with the hosted Convex surface.'
    },
    {
      name: 'Convex cloud runtime',
      stack: 'Auth, database, functions, AI actions',
      role: 'Hosted service layer',
      detail: 'Owns the canonical runtime behavior that every Convex client reads from and writes to.'
    }
  ] satisfies RepositoryCard[],
  principles: [
    'Keep the Convex runtime readable as one hosted system with shared auth, data, and function contracts.',
    'Treat web and native experiences as product surfaces over the same backend rules, not separate feature branches.',
    'Update documentation whenever origins, redirects, schema, or function names change.'
  ],
  signals: [
    {
      label: 'Runtime truth',
      value: 'Convex owns authentication, data access, mutations, queries, and AI-facing actions for this lane.'
    },
    {
      label: 'Client pair',
      value: 'The hosted web app and native clients are documented as one coordinated product surface.'
    },
    {
      label: 'Operational discipline',
      value: 'Origin, auth, and schema changes are treated as release-level events and updated in docs immediately.'
    },
    {
      label: 'Best operating lens',
      value: 'Repository catalog, runtime architecture, and change checklist are the fastest way to reason about this lane.'
    }
  ] satisfies HubSignal[],
  highlightSlugs: ['convex-documentation', 'repository-catalog', 'runtime-architecture', 'operating-model'],
  trackSummary: {
    name: 'Convex',
    caption: 'Hosted runtime lane',
    summary:
      'A hosted web application and native clients share the same Convex auth, data, function, and AI runtime.',
    points: [
      'quickhabits-svelte-convex is the hosted web client.',
      'QuickHabitconvex owns the native client surfaces.',
      'Convex cloud services are the canonical backend contract for this lane.',
      'Origin, auth, and schema changes should land with documentation updates.'
    ]
  }
} as const;

export function getSiteHubData() {
  const docs = getDocSummaries();
  const groupedDocs = getDocGroupSummaries();

  return {
    ...siteMeta,
    docs,
    featuredDocs: getFeaturedDocSummaries().slice(0, 4),
    highlightDocs: siteMeta.highlightSlugs
      .map((slug) => docs.find((doc) => doc.slug === slug))
      .filter(Boolean),
    readingPaths: docGroupOrder.map((group, index) => ({
      name: group,
      number: String(index + 1).padStart(2, '0'),
      docs: groupedDocs[group],
      lead: groupedDocs[group][0] ?? null
    })),
    stats: {
      docsPages: docs.length,
      repositoryCount: siteMeta.repositories.length,
      principlesCount: siteMeta.principles.length
    }
  };
}
