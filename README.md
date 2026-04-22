# Convex Documentation

This project contains the standalone documentation site for the QuickHabit Convex runtime.

## Runtime focus

- `quickhabits-svelte-convex` is the hosted web client.
- `QuickHabitconvex` owns the native client surfaces.
- Convex cloud services are the canonical runtime for authentication, data access, and server-side actions.

## Reading order

1. [Repository Catalog](docs/repository-catalog.md)
2. [Runtime Architecture](docs/runtime-architecture.md)
3. [Client Surfaces](docs/client-surfaces.md)
4. [Operating Model](docs/operating-model.md)
5. [Change Checklist](docs/change-checklist.md)

## Documentation rules

- Keep origin, redirect, schema, and function-name changes documented in the same change batch.
- Treat hosted web and native surfaces as one product family over the same backend contract.
- Use this site as the first stop when runtime ownership or release sequencing is unclear.
