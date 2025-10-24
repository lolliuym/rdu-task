#!/bin/bash
echo "=== Проверка Grafana ==="

echo "1. Проверка здоровья Grafana..."
curl -s http://localhost:3000/api/health | jq

echo ""
echo "2. Проверка datasources..."
curl -s -u admin:admin http://localhost:3000/api/datasources | jq

echo ""
echo "3. Проверка dashboards..."
curl -s -u admin:admin http://localhost:3000/api/search?query=RDU | jq

echo ""
echo "4. Ссылки для просмотра:"
echo "   - Grafana: http://localhost:3000 (admin/admin)"
echo "   - Prometheus: http://localhost:9090"
echo "   - Приложение: http://localhost:8080"
