#!/usr/bin/env bash

rm -rf ./api-contracts/autogen/

node ./compile-joi
node ./compile-swagger
compile-interfaces.sh
compile-postman.sh
node ./compile-postman

#for dir in modules/*; do
#  rm -rf "./$dir/src/autogen/"
#  cp -r ./api-contracts/ "./$dir/src/autogen/"
#done

#lerna exec -- tsc --build tsconfig.json
#lerna exec -- cp package.json package-lock.json built/
#node ./compile-aws-infrastructure --market us