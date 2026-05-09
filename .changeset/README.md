# Changesets

This folder is managed by [`@changesets/cli`](https://github.com/changesets/changesets) and is used to version and publish `@camkerber/typescript-dsa`.

## Workflow

1. **Make your changes** on a feature branch.

2. **Create a changeset** describing what changed and the bump type:

   ```bash
   pnpm changeset
   ```

   Select `patch`, `minor`, or `major` and write a short summary. This generates a `.changeset/*.md` file.

3. **Commit the changeset file** alongside your code changes and open a PR.

4. **Merge the PR to `main`** — the Changesets GitHub Action will automatically open a version-bump PR titled "chore: update versions" that increments the version in `package.json` and updates `CHANGELOG.md`.

5. **Merge the version-bump PR** — the action publishes the new version to npm automatically.

## Bump type guide

| Type    | When to use                                  |
| ------- | -------------------------------------------- |
| `patch` | Bug fixes, internal refactors, doc updates   |
| `minor` | New backwards-compatible features or exports |
| `major` | Breaking changes to the public API           |
