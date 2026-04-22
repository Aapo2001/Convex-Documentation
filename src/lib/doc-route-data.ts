import {
  docGroupOrder,
  getDoc,
  getDocGroupSummaries,
  getDocSourceHref,
  getDocSummaries,
  getRelatedDocSummaries
} from '$lib/docs';

export function getDocsIndexData() {
  const groupedDocs = getDocGroupSummaries();
  const summaries = getDocSummaries();

  return {
    groups: docGroupOrder.map((group) => ({
      name: group,
      docs: groupedDocs[group]
    })),
    totalDocs: summaries.length
  };
}

export function getDocEntries() {
  return getDocSummaries().map((doc) => ({ slug: doc.slug }));
}

export function getDocDetailData(slug: string) {
  const doc = getDoc(slug);

  if (!doc) {
    return null;
  }

  const summaries = getDocSummaries();
  const currentIndex = summaries.findIndex((entry) => entry.slug === doc.slug);
  const groupedDocs = getDocGroupSummaries();

  return {
    doc,
    groups: docGroupOrder.map((group) => ({
      name: group,
      docs: groupedDocs[group]
    })),
    nextDoc: currentIndex >= 0 ? summaries[currentIndex + 1] ?? null : null,
    previousDoc: currentIndex > 0 ? summaries[currentIndex - 1] : null,
    relatedDocs: getRelatedDocSummaries(doc.slug),
    sourceHref: getDocSourceHref(doc.sourceLabel)
  };
}
