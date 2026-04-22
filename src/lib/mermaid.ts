type MermaidModule = {
  default: {
    initialize: (config: Record<string, unknown>) => void;
    run: (options: { nodes: HTMLElement[] }) => Promise<void>;
  };
};

let mermaidLoader: Promise<MermaidModule['default']> | null = null;

function getMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then((module) => {
      const mermaid = module.default;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        fontFamily: 'Manrope Variable, sans-serif',
        flowchart: {
          htmlLabels: true,
          useMaxWidth: true,
          curve: 'basis'
        },
        sequence: {
          useMaxWidth: true,
          mirrorActors: false
        },
        themeVariables: {
          background: 'transparent',
          primaryColor: '#201918',
          primaryTextColor: '#f6eee8',
          primaryBorderColor: '#d38a61',
          secondaryColor: '#181313',
          secondaryBorderColor: '#a86d4b',
          tertiaryColor: '#241d1d',
          tertiaryBorderColor: '#d38a61',
          mainBkg: '#1a1515',
          secondBkg: '#241d1d',
          tertiaryBkg: '#140f10',
          clusterBkg: '#171212',
          clusterBorder: '#a86d4b',
          lineColor: '#e8b08c',
          defaultLinkColor: '#e8b08c',
          textColor: '#f6eee8',
          nodeTextColor: '#f6eee8',
          edgeLabelBackground: '#171212',
          actorBkg: '#1a1515',
          actorBorder: '#d38a61',
          actorTextColor: '#f6eee8',
          actorLineColor: '#e8b08c',
          signalColor: '#e8b08c',
          signalTextColor: '#f6eee8',
          labelBoxBkgColor: '#1a1515',
          labelBoxBorderColor: '#d38a61',
          labelTextColor: '#f6eee8',
          noteBkgColor: '#241d1d',
          noteBorderColor: '#d38a61',
          noteTextColor: '#f6eee8',
          activationBkgColor: '#241d1d',
          activationBorderColor: '#d38a61',
          sectionBkgColor: '#171212',
          altSectionBkgColor: '#241d1d',
          gridColor: '#604737'
        }
      });

      return mermaid;
    });
  }

  return mermaidLoader;
}

export async function renderMermaidDiagrams(root: ParentNode) {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>('.mermaid-diagram')).filter(
    (node) => node.dataset.mermaidRendered !== 'done'
  );

  if (nodes.length === 0) {
    return;
  }

  const mermaid = await getMermaid();

  for (const node of nodes) {
    node.dataset.mermaidRendered = 'pending';
    node.removeAttribute('data-processed');
    node.closest('.mermaid-shell')?.classList.remove('is-error');
  }

  try {
    await mermaid.run({ nodes });

    for (const node of nodes) {
      node.dataset.mermaidRendered = 'done';
      node.closest('.mermaid-shell')?.classList.add('is-rendered');
    }
  } catch (error) {
    console.error('Failed to render Mermaid diagram.', error);

    for (const node of nodes) {
      node.dataset.mermaidRendered = 'error';
      node.closest('.mermaid-shell')?.classList.add('is-error');
    }
  }
}
