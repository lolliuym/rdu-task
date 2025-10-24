#!/bin/bash
echo "=== Настройка Grafana дашборда ==="

# Создаем простой дашборд
DASHBOARD_JSON='{
  "dashboard": {
    "id": null,
    "title": "RDU Monitoring",
    "tags": ["rdu"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "HTTP Responses",
        "type": "stat",
        "gridPos": {"h": 8, "w": 12, "x": 0, "y": 0},
        "targets": [
          {
            "expr": "sum(envoy_http_downstream_rq_xx{envoy_http_conn_manager_prefix=\"ingress_http\"}) by (envoy_response_code_class)",
            "legendFormat": "{{envoy_response_code_class}}xx"
          }
        ]
      },
      {
        "id": 2,
        "title": "Nginx Connections",
        "type": "stat", 
        "gridPos": {"h": 8, "w": 12, "x": 12, "y": 0},
        "targets": [
          {
            "expr": "nginx_connections_active",
            "legendFormat": "Active"
          }
        ]
      }
    ],
    "time": {"from": "now-1h", "to": "now"}
  }
}'

echo "Создаем дашборд..."
curl -s -X POST -H "Content-Type: application/json" -d "$DASHBOARD_JSON" \
  http://admin:admin@localhost:3000/api/dashboards/db | jq '.status'

echo ""
echo "Дашборд создан! Перейдите: http://localhost:3000"
