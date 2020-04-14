#!/bin/bash

OUTPUT="$(node_modules/stylelint/bin/stylelint.js --cache --fix 'src/scss/**/*.scss' 'src/scss/*.scss' \
--max-warnings 0 --custom-formatter=node_modules/stylelint-formatter-pretty --syntax scss \
--config lint_configs/stylelint.config.js)"

if [ -n "$OUTPUT" ]; then
echo "${OUTPUT}"> lint_logs/stylelint_$(date +%Y%m%d_%H%M%S).log
exit 1
fi
