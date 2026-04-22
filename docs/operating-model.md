# Operating Model

## Version-control expectations

- Runtime-facing changes should land with matching documentation updates.
- Client work that changes auth, redirects, schema, or server-side action names should be treated as release-facing work.

## Validation expectations

- Verify hosted sign-in and primary authenticated flows after auth-related changes.
- Verify native sign-in and deep-link return after origin or redirect changes.
- Verify any feature that depends on changed queries, mutations, or actions.

## Documentation maintenance

- Update the repository catalog when runtime ownership changes.
- Update the runtime architecture document when request flow or backend boundaries change.
- Update the change checklist when releases require new manual validation steps.
