# Commits and releases

[← Back to project guide](./index.md)

Keep commits small enough to review and describe one coherent change. A component feature may still need several files, but its implementation, tests, examples, and documentation should tell one story.

Follow the [FKDS developer contribution guide](https://forsakringskassan.github.io/designsystem/latest/gettingstarted/contribute-to-fkds/contributing-developers.html#commit) for the commit convention and examples. Commit messages should make the intent clear to reviewers and release tooling. The prefix used (e.g., `feat:`, `fix:`, or `BREAKING CHANGE:`) determines the version bump (minor, patch, or major) via the automated release process.

A useful commit contains the implementation and its verification. Avoid mixing dependency upgrades, formatting churn, and unrelated refactors into a component change unless they are required.

## Release process

TODO: Document the release process.
