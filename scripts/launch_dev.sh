#!/bin/bash

set -e

HOOK_PATH=".git/hooks"
if [ "$1" == "-p" ]; then
    HOOK_PATH="$2"
    shift 2
fi
PRECOMMIT_PATH="$HOOK_PATH/pre-commit"

if ! [ -f "$PRECOMMIT_PATH" ] || ! grep "exec pre-commit" "$PRECOMMIT_PATH" > /dev/null; then
    echo "Pre-commit hooks not installed!" >&2
    echo "Please install \`pre-commit\`: https://pre-commit.com/#install" >&2
    echo "Once installed, run \`pre-commit install\` from this repository and try again." >&2
    exit 1
fi

exec "$@"
