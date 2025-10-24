#!/bin/bash
echo "=== Запросы к Prometheus API ==="

echo "1. Envoy HTTP responses:"
curl -s "http://localhost:9090/api/v1/query?query=envoy_http_downstream_rq_xx" | jq '.data.result[] | {status: .metric.envoy_response_code_class, value: .value[1]}'

echo ""
echo "2. Nginx активные соединения:"
curl -s "http://localhost:9090/api/v1/query?query=nginx_connections_active" | jq '.data.result[]'

echo ""
echo "3. Node память:"
curl -s "http://localhost:9090/api/v1/query?query=node_memory_MemTotal_bytes" | jq '.data.result[]'

echo ""
echo "4. Ссылки:"
echo "   Prometheus UI: http://localhost:9090/graph"
echo "   Targets: http://localhost:9090/targets"
