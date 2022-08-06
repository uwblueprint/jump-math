#!/bin/bash

set -e

# https://stackoverflow.com/a/32981392/3761440
faketty () {
    script -qefc "$(printf "%q " "$@")" /dev/null
}


CONTAINER_NAME=
SERVICE_NAME=
if [[ "$1" = "belint" ]]; then
    CONTAINER_NAME=jump_math_ts_backend
    SERVICE_NAME=ts-backend
elif [[ "$1" = "felint" ]]; then
    CONTAINER_NAME=jump_math_frontend
    SERVICE_NAME=frontend
else
    echo "Unknown lint command \"$1\", must be one of: felint, belint" >&2
    exit 1
fi

if [ "$(docker ps --filter name=$CONTAINER_NAME -q)" ]; then
    docker exec -t $CONTAINER_NAME yarn fix
    exit
fi

echo "Warning: Docker services not running! Linting will be slow." >&2
echo "Run \`docker-compose up\` to speed this up." >&2

faketty docker-compose run --rm --entrypoint yarn $SERVICE_NAME fix
