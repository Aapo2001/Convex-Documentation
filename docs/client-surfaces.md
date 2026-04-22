# Client Surfaces

## Hosted web

The hosted web application is the fastest-moving user surface. It is responsible for browser navigation, session-aware presentation, and direct use of Convex-backed data and actions.

## Native clients

The native client package owns device-oriented interaction, deep linking, and release packaging. It should stay aligned with the same origin, auth, and function expectations used by the hosted web application.

## Shared expectations

- Auth assumptions must match across web and native entry points.
- Runtime-backed feature names should stay consistent across UI surfaces.
- Documentation should be updated whenever a client adds a new required environment value, route, or backend dependency.
