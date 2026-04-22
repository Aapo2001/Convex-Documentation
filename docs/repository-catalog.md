# Repository Catalog

## Repositories in scope

### `quickhabits-svelte-convex`

- Role: hosted web application
- Stack: Svelte 5, Vite, Convex integrations
- Owns: browser UI, route structure, session-aware client behavior, hosted presentation

### `QuickHabitconvex`

- Role: native client package
- Stack: Android Compose, desktop surfaces, shared native state holders
- Owns: device-native user experience, deep links, host configuration, native release packaging

### Convex cloud runtime

- Role: canonical service layer
- Owns: authentication, data model, queries, mutations, and server-side actions used by every client

## Ownership boundaries

- Product behavior should be described in terms of the Convex runtime contract, not duplicated per client.
- Client-specific UX decisions belong in the relevant client repository.
- Schema, auth, or function changes should be documented here before they are treated as complete.
