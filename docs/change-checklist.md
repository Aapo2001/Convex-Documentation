# Change Checklist

Use this checklist before considering a Convex runtime change complete.

## Runtime contract

- Confirm that changed queries, mutations, actions, or schema fields are documented.
- Confirm that every affected client surface still uses the expected names and payloads.

## Access and routing

- Confirm that hosted origins and redirect targets are still correct.
- Confirm that native deep links and auth return paths still work end to end.

## Release readiness

- Record any new environment values or deployment assumptions.
- Update docs in the same change batch instead of relying on follow-up cleanup.
- Recheck the runtime architecture page if the flow between client and backend changed.
