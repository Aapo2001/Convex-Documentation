import { error } from '@sveltejs/kit';
import { getDocDetailData, getDocEntries } from '$lib/doc-route-data';

export function entries() {
  return getDocEntries();
}

export function load({ params }) {
  const data = getDocDetailData(params.slug);

  if (!data) {
    throw error(404, 'Document not found');
  }

  return data;
}
