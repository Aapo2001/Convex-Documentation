import { getDocsIndexData } from '$lib/doc-route-data';
import { getSiteHubData } from '$lib/site-data';

export function load() {
  return {
    ...getDocsIndexData(),
    hub: getSiteHubData()
  };
}
