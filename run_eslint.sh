#!/bin/bash

OUTPUT="$(node_modules/eslint/bin/eslint.js --cache --fix --ext .ts,.tsx --format pretty \
--max-warnings 0 -c lint_configs/.eslintrc.js src entry)"

if [ -n "$OUTPUT" ]; then
echo "${OUTPUT}"> lint_logs/eslint_$(date +%Y%m%d_%H%M%S).log
exit 1
fi
