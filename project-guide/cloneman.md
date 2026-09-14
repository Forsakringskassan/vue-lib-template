# Cloneman and template updates

[← Back to project guide](./index.md)

[Cloneman](https://github.com/Forsakringskassan/cloneman/blob/main/README.md) creates a new component-library repository from a template and keeps files marked as managed in sync with later template updates.

The generated repository is a normal project owned by its team. Cloneman does not replace your source code or decide how a component should work. It provides a consistent foundation for configuration, tooling, documentation support, and common CI behavior.

## What is managed

Files selected by the template are managed centrally. In this template that includes build and lint configuration, Cypress support, documentation infrastructure, and this `project-guide/` directory. A generated repository also receives the template's dependency and script changes according to Cloneman's update rules.

A managed file may be updated when the template is updated. Treat local changes to managed configuration as a deliberate maintenance decision: understand the next template update before diverging from the shared setup.

## Updating a cloned repository

When a new template version is available:

1. Read the template release notes and identify configuration or dependency changes.
2. Run the update command `npx cloneman@latest update`.
3. Review the complete diff, especially package scripts, TypeScript configuration, test configuration, and CI files.
4. Resolve conflicts without discarding repository-specific components or tests.
5. Run lint, unit tests, component tests, builds, and documentation checks.
6. Commit the update separately when possible, so it is easy to review and revert.

## Working with managed files

Before editing a managed file, ask whether the change belongs in every library created from the template. If it does, improve the template and update the generated repositories through Cloneman. If it is specific to one component library, keep it in an appropriate consumer-owned file or add a documented local override.

The source template is available at [Forsakringskassan/vue-lib-template](https://github.com/Forsakringskassan/vue-lib-template). Use it to inspect the intended baseline, but follow the local repository's pinned versions and release notes when applying an update.
