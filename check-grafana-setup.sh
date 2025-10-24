#!/bin/bash
echo "=== Проверка настройки Grafana ==="

echo "1. Проверка здоровья:"
curl -s http://localhost:3000/api/health | jq

echo ""
echo "2. Проверка datasources:"
curl -s -u admin:admin http://localhost:3000/api/datasources | jq '.[] | {name, type, url}'

echo ""
echo "3. Поиск дашбордов:"
curl -s -u admin:admin http://localhost:3000/api/search | jq '.[] | {title, type}'

echo ""
echo "4. Ссылки:"
echo "   Grafana: http://localhost:3000"
echo "   Логин: admin/admin"
echo "   После входа создайте дашборд или импортируйте готовый"
