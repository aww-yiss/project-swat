#!/bin/bash

docker run -it --privileged --shm-size=1gb -e GRAB_SITE=$1 -v $(pwd):/data:rw headless 