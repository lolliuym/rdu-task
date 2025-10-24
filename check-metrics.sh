#!/bin/bash
echo "=== Проверка доступности метрик ==="

echo "1. Проверка Envoy метрик..."
curl -s http://localhost:9901/stats/prometheus | head -5

echo "2. Проверка Nginx метрик..."
curl -s http://localhost:8080/nginx_status

echo "3. Проверка Prometheus..."
curl -s http://localhost:9090/-/healthy

echo "4. Проверка Grafana..."
curl -s http://localhost:3000/api/health

echo "5. Проверка targets Prometheus..."
echo "Посетите: http://localhost:9090/targets"
