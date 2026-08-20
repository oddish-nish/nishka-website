#!/bin/bash
set -euo pipefail

ROOT="/Users/nishkaawasthi/Projects/Repos/website"
LOG="$HOME/Library/Logs/nishka-daily-push.log"

mkdir -p "$(dirname "$LOG")"
exec >>"$LOG" 2>&1
echo "---- $(date '+%Y-%m-%d %H:%M:%S') ----"

cd "$ROOT"

if [[ -d .git/rebase-merge || -d .git/rebase-apply || -f .git/MERGE_HEAD ]]; then
  echo "Skipping: a rebase or merge is in progress."
  exit 0
fi

git add -A
if ! git diff --cached --quiet; then
  git commit -m "Daily save of the house."
fi

if git status -sb | grep -q 'ahead'; then
  git -c http.version=HTTP/1.1 push
  echo "Pushed."
else
  echo "Nothing to push."
fi
