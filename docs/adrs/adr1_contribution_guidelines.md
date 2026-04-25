# ADR 5: Contribution Guidelines

## Status

`Accepted`

## Context

We use a **monorepo** (Turborepo + pnpm). All applications and shared packages live in a single repository:

Frontend apps: Next.js (TypeScript) → apps/web, apps/admin-ui
Backend: Node.js + Express (TypeScript) → apps/api
Shared code: packages/ (UI, configs, types)
Tooling: Biome, Syncpack, TypeScript, Turbo

## Decision

### 1. Branching Strategy (Trunk-Based)

Always branch from the latest `main`:

```bash
git checkout main && git pull origin main
git checkout -b feat/201-enrollment-card
```

- Do **not** commit directly to `main`
- All changes go through a Pull Request
- Prefer small, incremental PRs over large ones

### 2. Branch Naming

```
<type>/<issue-number>-short-description
```

- **type**: one of the commit types below
- **issue-number**: required for all types **except** `chore`
- Use lowercase hyphens only — no uppercase, no underscores

```
feat/201-enrollment-card        ✓
fix/198-session-expiry          ✓
chore/update-docker-ports       ✓  (chore — issue number optional)
feat/enrollment-card            ✗  (missing issue number)
```

### 3. Commit Convention

Standard [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description> (#<issue>)
```

| Part            | Rule                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------- |
| **type**        | Required. See table below.                                                                |
| **scope**       | Optional. Free-form area: `web`, `admin-ui`, `api`, `auth`, `ui`, `infra`, `config`, etc. |
| **description** | Should be imperative and lowercase; keep to ~72 chars where practical.                    |
| **issue**       | Optional but encouraged. `(#123)` at the end.                                             |

#### Commit types

| Type       | Use for                                    |
| ---------- | ------------------------------------------ |
| `feat`     | New feature or user-facing behaviour       |
| `fix`      | Bug fix                                    |
| `refactor` | Code change with no behaviour change       |
| `docs`     | Documentation only                         |
| `ci`       | CI/CD configuration                        |
| `chore`    | Tooling, deps, config — no production code |
| `test`     | Adding or updating tests                   |

#### Examples

```
feat(courses): add enrollment card component (#201)
fix(auth): handle session expiry on redirect (#198)
refactor(admin-ui): extract table to reusable component
chore: update docker compose ports
docs: update ADR1 with simplified conventions
```

**Tip:** Run `git commit` without `-m` to open the pre-filled template.

### 4. Issue Conventions

Four GitHub issue templates are available when opening a new issue:

| Template        | Label         | Key fields                                                              |
| --------------- | ------------- | ----------------------------------------------------------------------- |
| Bug Report      | `bug`         | Steps to reproduce, expected vs actual, environment, screenshots        |
| Feature Request | `enhancement` | Problem, proposed solution, acceptance criteria                         |
| Developer Task  | `task`        | Area (client-ui / admin-ui / backend), description, acceptance criteria |
| Refactor        | `refactor`    | What, motivation, scope, risk                                           |

Issue **title format**: `<type>: <short description>` — e.g. `fix: course card not loading on mobile`

### 5. Pull Request Rules

- Title mirrors the commit format: `<type>(<scope>): <description> (#<issue>)`
- A PR should represent **one logical change**
- Aim for a reviewable size (~20–30 minutes max)
- At least **1 approval** required; for risky or architectural changes, request a second
- Automated checks must pass (build, tests, linters, conventional-commits CI)
- Add `Closes #<issue>` in the PR body — this auto-closes the issue on merge

The PR template (`.github/PULL_REQUEST_TEMPLATE.md`) pre-fills: **What / Why / How / Testing / Screenshots**.

### 6. Tooling Setup (one-time, after cloning)

```bash
./scripts/setup-hooks.sh
```

This configures:

- `.githooks/commit-msg` — validates your commit message format before the commit lands
- `.gitmessage` — pre-fills the commit editor with the convention skeleton

The CI workflow (`.github/workflows/conventional-commits.yml`) validates every commit
message and branch name on every PR. It is the safety net when the local hook is not set up.

### 7. Code Quality & Styling

#### Backend (Node.js / Express / TypeScript)

- Must pass TypeScript (tsc --noEmit)
- Must build successfully
- Follow clear structure (routes → controllers → services)
- Use environment variables safely

#### Frontend (Next.js / TypeScript)

- Must pass Biome (format + lint)
- No blocking lint errors
- Reuse shared components (packages/ui)

#### Monorepo rules

- Use workspace protocol for internal packages:

```
"@repo/ui": "workspace:*"
```

- Keep dependency versions consistent (Syncpack)
- Avoid duplicating logic - extract to **packages/**

### 8. UI Changes

If UI is affected, include **before/after screenshots** in the PR description.

## Consequences

**Positive:**

- Single, unambiguous commit style across all contributors (human and AI)
- Local hook + CI workflow catch violations early
- GitHub templates reduce friction for creating well-formed issues and PRs

**Negative:**

- Developers must run `./scripts/setup-hooks.sh` after cloning (documented in README)

## Compliance

Not applicable.

## Notes

- **Original authors:** Metin Abbaszade
- **Revised by:** Metin Abbaszade
- **Date proposed:** 2026-04-24
- **Date accepted:** 2026-04-24
- **Approvers:** Metin Abbaszade
- **Related:** [AGENTS.md](../../AGENTS.md) — agentic workflows for AI contributors
