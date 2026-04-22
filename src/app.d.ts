declare global {
  namespace App {}
}

declare module '*.svelte' {
  import type { ComponentType } from 'svelte';

  const component: ComponentType;
  export default component;
}

declare module '$lib/components/*.svelte' {
  import type { ComponentType } from 'svelte';

  const component: ComponentType;
  export default component;
}

export {};
