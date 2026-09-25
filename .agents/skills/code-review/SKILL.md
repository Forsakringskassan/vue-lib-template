---
name: code-review
description: Perform code review on changes in this repository.
---

# Code review

Guidelines for reviewing code changes in this repository.

This repository is a [Cloneman](https://github.com/Forsakringskassan/cloneman/) template.

The `.cloneman` folder holds the build script and hooks.

In the `.cloneman/build.mts` script ("the build script"), files are configured to be either:

- "managed" (present in `managedFiles` or `partiallyManagedFiles`)
- "ignored" (present in `ignoredFiles`)
- "boilerplate" (not present in any list).

List can be literal filenames or match glob patterns.

## Removed or renamed files

When a change removes or renames a managed file, the old filename must be added to the `removeFiles` property in the build script.

If the old filename is missing from `removeFiles`, flag this as a required change in the review.
