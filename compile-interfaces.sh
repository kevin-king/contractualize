#!/usr/bin/env bash

# Now that we have a single swagger definition file (thanks to compile-joi + compile-swagger),
# we parse the whole Swagger definition file to automatically generate the TypeScript. In this
# case, `sta` is smart enough to parse the entire file, so we don't have do compile each
# individual schema like we did in the compile-joi step.

BASE_PATH=api-contracts/autogen/

for dir in ${BASE_PATH}*.json; do
  sta --path "$dir" \
      --name "$dir.ts" \
      --no-client \
      --type-prefix i
done

for dir in ${BASE_PATH}*.ts; do
  mv -- "$dir" "${dir%.json.ts}.ts"
done
