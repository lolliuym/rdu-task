#!/bin/bash
echo "� Starting RDU Test Environment..."
docker-compose up -d
sleep 2
docker-compose ps
echo "���✅ Services started!"
echo "   Application: http://localhost:8080"
