#!/bin/bash
echo "=== Детальная проверка метрик ==="

echo "1. Проверка Envoy Admin API..."
curl -s http://localhost:9901/ready && echo " - READY" || echo " - NOT READY"

echo "2. Проверка Envoy метрик..."
curl -s http://localhost:9901/stats/prometheus | head -10

echo "3. Проверка Nginx статуса..."
curl -s http://localhost:8080/nginx_status

echo "4. Проверка Prometheus targets..."
echo "Targets page: http://localhost:9090/targets"

echo "5. Проверка Node Exporter..."
curl -s http://localhost:9100/metrics | head -5

echo "6. Проверка Grafana..."
curl -s http://localhost:3000/api/health | jq

echo "7. Проверка доступности приложения..."
curl -s -I http://localhost:8080 | head -1
