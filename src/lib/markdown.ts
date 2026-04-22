import { base } from '$app/paths';
import { marked } from 'marked';

export type DocHeading = {
  depth: number;
  id: string;
  text: string;
};

type MarkdownToken = {
  type: string;
  raw?: string;
  text?: string;
  depth?: number;
  tokens?: MarkdownToken[];
  items?: Array<{ tokens?: MarkdownToken[] }>;
};

type MarkdownCodeToken = {
  text: string;
  lang?: string;
};

const githubRepoUrl = 'https://github.com/Aapo2001/Convex-Documentation/blob/main';
const availableDocSlugs = new Set([
  'architecture-hub',
  'executive-summary',
  'repository-catalog',
  'operating-model',
  'convex-track-strategy',
  'doc-drift-maintenance',
  'project-doc-sync',
  'logic-flow-map',
  'feature-parity-matrix',
  'convex-android-alignment',
  'lane-work-packets'
]);
const sourceLabelBySlug: Record<string, string> = {
  'architecture-hub': 'README.md',
  'executive-summary': 'docs/executive-summary.md',
  'repository-catalog': 'docs/repository-catalog.md',
  'operating-model': 'docs/operating-model.md',
  'convex-track-strategy': 'docs/convex-track-strategy.md',
  'doc-drift-maintenance': 'docs/doc-drift-maintenance.md',
  'project-doc-sync': 'docs/project-doc-sync.md',
  'logic-flow-map': 'docs/logic-flow-map.md',
  'feature-parity-matrix': 'docs/feature-parity-matrix.md',
  'convex-android-alignment': 'docs/convex-android-alignment.md',
  'lane-work-packets': 'docs/lane-work-packets.md'
};
const slugCounts = new Map<string, number>();

function resetSlugCounts() {
  slugCounts.clear();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(value: string) {
  const base = value
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();

  const next = slugCounts.get(base) ?? 0;
  slugCounts.set(base, next + 1);

  return next === 0 ? base : `${base}-${next}`;
}

function resolveDocLink(slug: string, hash?: string) {
  const localDocHref = `${base}/docs/${slug}${hash ? `#${hash}` : ''}`;

  if (availableDocSlugs.has(slug)) {
    return localDocHref;
  }

  const sourceLabel = sourceLabelBySlug[slug];

  if (!sourceLabel) {
    return localDocHref;
  }

  return `${githubRepoUrl}/${sourceLabel}${hash ? `#${hash}` : ''}`;
}

function resolveInternalDocHref(href: string) {
  const normalizedHref = href.replace(/\\/g, '/');
  const [path, hash] = normalizedHref.split('#');
  const normalizedPath = path.replace(/^\.\//, '').replace(/^\/+/, '');

  if (normalizedPath === 'README.md' || normalizedPath === '../README.md') {
    return resolveDocLink('architecture-hub', hash);
  }

  const docsMatch = normalizedPath.match(/(?:^|\/)(?:docs\/)?([a-z0-9-]+)\.md$/i);

  if (!docsMatch) {
    return href;
  }

  const [, slug] = docsMatch;
  return resolveDocLink(slug, hash);
}

function tokensToText(tokens: MarkdownToken[]): string {
  return tokens
    .map((token) => {
      if ('text' in token && typeof token.text === 'string') {
        return token.text;
      }

      if ('tokens' in token && Array.isArray(token.tokens)) {
        return tokensToText(token.tokens);
      }

      return token.raw ?? '';
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function walkHeadingTokens(tokens: MarkdownToken[], headings: DocHeading[]) {
  for (const token of tokens) {
    if (token.type === 'heading' && typeof token.depth === 'number' && Array.isArray(token.tokens)) {
      const text = tokensToText(token.tokens);
      const id = slugify(text);
      headings.push({
        depth: token.depth,
        id,
        text
      });
      continue;
    }

    if ('tokens' in token && Array.isArray(token.tokens)) {
      walkHeadingTokens(token.tokens, headings);
    }

    if ('items' in token && Array.isArray(token.items)) {
      for (const item of token.items) {
        if (Array.isArray(item.tokens)) {
          walkHeadingTokens(item.tokens, headings);
        }
      }
    }
  }
}

const renderer = new marked.Renderer();
const defaultCodeRenderer = renderer.code.bind(renderer) as (token: MarkdownCodeToken) => string;

renderer.heading = function ({ tokens, depth }) {
  const text = tokensToText(tokens as MarkdownToken[]);
  const id = slugify(text);
  const content = this.parser.parseInline(tokens);
  return `<h${depth} id="${id}">${content}</h${depth}>`;
};

renderer.code = function (token: MarkdownCodeToken) {
  const language = token.lang?.trim().toLowerCase();

  if (language === 'mermaid') {
    return `<div class="mermaid-shell"><div class="mermaid mermaid-diagram">${escapeHtml(token.text)}</div></div>`;
  }

  return defaultCodeRenderer(token);
};

renderer.link = function ({ href = '', title, tokens }) {
  const content = this.parser.parseInline(tokens);
  const resolvedHref = /^https?:\/\//.test(href) ? href : resolveInternalDocHref(href);
  const isExternal = /^https?:\/\//.test(resolvedHref);
  const attrs = [
    `href="${resolvedHref}"`,
    title ? `title="${title}"` : '',
    isExternal ? 'target="_blank"' : '',
    isExternal ? 'rel="noreferrer"' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return `<a ${attrs}>${content}</a>`;
};

marked.use({
  gfm: true,
  renderer
});

export function renderMarkdown(markdown: string) {
  resetSlugCounts();
  return marked.parse(markdown) as string;
}

export function extractHeadings(markdown: string) {
  resetSlugCounts();
  const headings: DocHeading[] = [];
  const tokens = marked.lexer(markdown);
  walkHeadingTokens(tokens, headings);
  return headings.filter((heading) => heading.depth <= 3);
}

export function estimateReadTime(markdown: string) {
  const words = markdown
    .replace(/[`*_#>-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}
