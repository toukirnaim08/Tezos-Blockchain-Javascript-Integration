#/bin/bash
######################################
# This script builds the docker image
######################################

set -e

PACKAGE_NAME=tezos-integration

DOCKER_REG_URL=toukir08/${PACKAGE_NAME}:latest

# build the docker image
docker build \
    --build-arg PACKAGE_NAME=${PACKAGE_NAME} \
    --tag $DOCKER_REG_URL \
    .

# tag the image with revision
docker tag ${DOCKER_REG_URL}

# docker push ${DOCKER_REG_URL}
