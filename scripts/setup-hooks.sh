#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"

echo "Configuring git hooks..."
git config core.hooksPath "$REPO_ROOT/.githooks"
chmod +x "$REPO_ROOT/.githooks/commit-msg"

echo "Configuring commit message template..."
git config commit.template "$REPO_ROOT/.gitmessage"

echo ""
echo "Done."
echo "  - Commit hook:     .githooks/commit-msg"
echo "  - Commit template: .gitmessage (used when you run 'git commit' without -m)"
echo ""
echo "See docs/adrs/adr5_contribution_guidelines.md for the full convention."
