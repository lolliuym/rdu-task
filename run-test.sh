#!/bin/bash
echo "³Ší Running test: $1"
docker run --rm -i --network rdu-task_rdu-network \
  -v "$(pwd)/tests:/tests" \
  grafana/k6:latest run "/tests/$1"
