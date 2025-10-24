#!/bin/bash
echo "=== Проверка метрик в Prometheus ==="

echo "1. Envoy метрики:"
curl -s http://localhost:9090/api/v1/query?query=envoy_http_downstream_rq_xx | jq '.data.result[] | {metric: .metric, value: .value[1]}'

echo ""
echo "2. Nginx метрики:"
curl -s http://localhost:9090/api/v1/query?query=nginx_connections_active | jq '.data.result[] | {metric: .metric, value: .value[1]}'

echo ""
echo "3. Node метрики:"
curl -s http://localhost:9090/api/v1/query?query=node_memory_MemTotal_bytes | jq '.data.result[] | {metric: .metric, value: .value[1]}'

echo ""
echo "4. Ссылки:"
echo "   - Prometheus UI: http://localhost:9090"
echo "   - Graph: http://localhost:9090/graph"
echo "   - Targets: http://localhost:9090/targets"
