#!/bin/sh

rm -f ./bindings/index.ts

for file in ./bindings/*.ts
do
  basefile=$(basename "$file" .ts)
  if [ "$basefile" != "index" ]
  then
    echo "export * from './$basefile'" >> ./bindings/index.ts
  fi
done
