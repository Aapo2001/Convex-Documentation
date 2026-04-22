import { estimateReadTime, extractHeadings, renderMarkdown, type DocHeading } from '$lib/markdown';

export type DocGroup = 'Start Here' | 'Platform' | 'Deep Dive' | 'Execution';
export type Track = 'Convex';

type DocDefinition = {
  slug: string;
  title: string;
  description: string;
  sourcePath: string;
  sourceLabel: string;
  group: DocGroup;
  track: Track;
  order: number;
  spotlight?: string;
};

export type DocEntry = DocDefinition & {
  markdown: string;
  html: string;
  headings: DocHeading[];
  readTime: number;
};

export type DocSummary = Omit<DocEntry, 'markdown' | 'html' | 'headings'>;

const rootMarkdown = import.meta.glob('../../README.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const docMarkdown = import.meta.glob('../../docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const markdownFiles = {
  ...rootMarkdown,
  ...docMarkdown
};

const docDefinitions: DocDefinition[] = [
  {
    slug: 'convex-documentation',
    title: 'Convex Documentation',
    description: 'The landing page for the standalone Convex documentation project: runtime focus, reading order, and maintenance expectations.',
    sourcePath: '../../README.md',
    sourceLabel: 'README.md',
    group: 'Start Here',
    track: 'Convex',
    order: 1,
    spotlight: 'Best first read for orientation.'
  },
  {
    slug: 'repository-catalog',
    title: 'Repository Catalog',
    description: 'The current Convex repo inventory, deployment roles, and ownership boundaries.',
    sourcePath: '../../docs/repository-catalog.md',
    sourceLabel: 'docs/repository-catalog.md',
    group: 'Start Here',
    track: 'Convex',
    order: 2,
    spotlight: 'Read this before making cross-repo changes.'
  },
  {
    slug: 'runtime-architecture',
    title: 'Runtime Architecture',
    description: 'How hosted web, native clients, and Convex services fit together at runtime.',
    sourcePath: '../../docs/runtime-architecture.md',
    sourceLabel: 'docs/runtime-architecture.md',
    group: 'Platform',
    track: 'Convex',
    order: 3,
    spotlight: 'Best starting point for runtime design work.'
  },
  {
    slug: 'client-surfaces',
    title: 'Client Surfaces',
    description: 'What the web and native clients own, share, and expect from the Convex runtime.',
    sourcePath: '../../docs/client-surfaces.md',
    sourceLabel: 'docs/client-surfaces.md',
    group: 'Deep Dive',
    track: 'Convex',
    order: 4
  },
  {
    slug: 'operating-model',
    title: 'Operating Model',
    description: 'The practical rules for shipping, documenting, and validating the Convex lane.',
    sourcePath: '../../docs/operating-model.md',
    sourceLabel: 'docs/operating-model.md',
    group: 'Execution',
    track: 'Convex',
    order: 5,
    spotlight: 'Use this before release-facing work.'
  },
  {
    slug: 'change-checklist',
    title: 'Change Checklist',
    description: 'A release-oriented checklist for origin, auth, schema, and client-surface changes.',
    sourcePath: '../../docs/change-checklist.md',
    sourceLabel: 'docs/change-checklist.md',
    group: 'Execution',
    track: 'Convex',
    order: 6
  }
];

export const docGroupOrder: DocGroup[] = ['Start Here', 'Platform', 'Deep Dive', 'Execution'];

function requireMarkdown(path: string) {
  const markdown = markdownFiles[path];

  if (!markdown) {
    throw new Error(`Missing markdown source for ${path}`);
  }

  return markdown;
}

function toSummary(doc: DocEntry): DocSummary {
  const { markdown, html, headings, ...summary } = doc;
  return summary;
}

const docs: DocEntry[] = docDefinitions
  .slice()
  .sort((left, right) => left.order - right.order)
  .map((definition) => {
    const markdown = requireMarkdown(definition.sourcePath);

    return {
      ...definition,
      markdown,
      html: renderMarkdown(markdown),
      headings: extractHeadings(markdown),
      readTime: estimateReadTime(markdown)
    };
  });

export function getDocs() {
  return docs;
}

export function getDocSummaries() {
  return docs.map(toSummary);
}

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}

export function getDocGroups() {
  return docs.reduce(
    (groups, doc) => {
      if (!groups[doc.group]) {
        groups[doc.group] = [];
      }

      groups[doc.group].push(doc);
      return groups;
    },
    {} as Record<DocGroup, DocEntry[]>
  );
}

export function getDocGroupSummaries() {
  return docGroupOrder.reduce(
    (groups, group) => {
      groups[group] = docs.filter((doc) => doc.group === group).map(toSummary);
      return groups;
    },
    {} as Record<DocGroup, DocSummary[]>
  );
}

export function getFeaturedDocSummaries() {
  return docs.filter((doc) => doc.spotlight).map(toSummary);
}

export function getRelatedDocSummaries(slug: string) {
  const current = getDoc(slug);

  if (!current) {
    return [];
  }

  return docs
    .filter((doc) => doc.slug !== slug && (doc.group === current.group || doc.track === current.track))
    .slice(0, 4)
    .map(toSummary);
}

export function getDocSourceHref(_sourceLabel: string) {
  return null;
}
