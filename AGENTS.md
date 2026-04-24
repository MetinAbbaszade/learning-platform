# AGENTS.md

This file is read by AI agents (OpenAI Codex, Claude Code, etc.) working in this repository.

## Contribution Conventions

All commits, branches, issues, and PRs follow the conventions defined in
[ADR5](docs/adrs/adr5_contribution_guidelines.md).

Quick reference below. Read ADR5 for full rationale, edge cases, and examples.

### Commit format

```
<type>(<scope>): <description> (#<issue>)
```

- **type** (required): `feat` | `fix` | `refactor` | `docs` | `ci` | `chore` | `test`
- **scope** (optional): free-form area, e.g. `web`, `admin-ui` , `api`, `auth`, `ui`, `infra`, `config` 
- **description**: imperative, lowercase, max ~72 chars
- **issue** (encouraged): `(#123)` at end

### Branch format

```
<type>/<issue-number>-short-description
```

Issue number is **required** for all types except `chore`.

### Types

| Type | Use for |
|---|---|
| `feat` | New feature or user-facing behaviour |
| `fix` | Bug fix |
| `refactor` | Code change with no behaviour change |
| `docs` | Documentation only |
| `ci` | CI/CD configuration |
| `chore` | Tooling, deps, config — no production code |
| `test` | Adding or updating tests |

---

## Agentic Workflows

### Creating a commit

Before committing, do not use `git commit -m`. Instead:

1. Review staged changes: `git diff --cached`
2. Choose the correct **type** from the table above
3. Choose an optional **scope** that describes the area changed
4. Write the **description** in imperative lowercase (e.g. "add", "fix", "remove")
5. Append `(#<issue>)` if the work is linked to a GitHub issue
6. Run `git commit` (no `-m` flag) — the template opens; fill it in and save
7. The commit-msg hook validates automatically; fix the message if it rejects

> For the full convention, see [ADR5 § Commit Convention](docs/adrs/adr5_contribution_guidelines.md#3-commit-convention).

### Opening an issue

1. Identify the issue type: `fix` / `feat` / `task` / `refactor`
2. Navigate to GitHub Issues → New Issue → select the matching template
3. Title format: `<type>: <short description>` (imperative, lowercase)
4. Fill all template fields — do not leave acceptance criteria empty

> For field definitions, see [ADR5 § Issue Conventions](docs/adrs/adr5_contribution_guidelines.md#4-issue-conventions).

### Opening a PR

1. Verify the branch name matches the convention (`<type>/<issue-number>-description`)
2. PR title: `<type>(<scope>): <description> (#<issue>)`
3. Fill in the PR template: **What / Why / How / Testing / Screenshots**
4. Add `Closes #<issue>` in the **What** section body — this auto-closes the issue on merge
5. Request at least **1 reviewer**
6. Do not merge until CI passes

> For full PR rules, see [ADR5 § Pull Request Rules](docs/adrs/adr5_contribution_guidelines.md#5-pull-request-rules).

### Monorepo Rules

- Do not duplicate logic across apps — extract reusable code to `packages/`
- Use `workspace:*` for internal dependencies (e.g. `@repo/ui`)
- Prefer shared types/configs over redefining them
- Respect app boundaries:
  - `apps/web` and `apps/admin-ui` are frontend (Next.js)
  - `apps/api` is backend (Node.js / Express)

### Code Review Expectations

When reviewing PRs, ensure:

- Commit messages follow the convention
- Branch name matches required format
- PR includes `Closes #<issue>`
- No duplicated logic across apps
- Shared packages are used where appropriate
- No unsafe environment variable usage
- Backend follows layered structure (routes → controllers → services)
- Frontend reuses shared UI components when possible


### CI Expectations

All Pull Requests must pass:

- Biome (format + lint)
- TypeScript type checks
- Build (`turbo build`)
- Dependency consistency (Syncpack)

Do not merge if CI fails.