#!/bin/bash
echo "=== Проверка Nginx метрик ==="

echo "1. Проверка nginx_status..."
curl -s http://localhost:8080/nginx_status

echo ""
echo "2. Проверка nginx-exporter метрик..."
curl -s http://localhost:9113/metrics | grep nginx | head -10

echo ""
echo "3. Проверка Prometheus targets..."
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {job, health, lastError}'
