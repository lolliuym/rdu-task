#!/bin/bash
echo "í Starting RDU Test Environment..."
docker-compose up -d
sleep 2
docker-compose ps
echo "º€í³Šâœ… Services started!"
echo "   Application: http://localhost:8080"
