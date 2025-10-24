#!/bin/bash
echo "=== Генерация тестового трафика ==="

echo "Генерируем трафик для метрик..."
for i in {1..50}; do
  # Human трафик
  curl -s -H "User-Agent: Mozilla/5.0" http://localhost:8080/ > /dev/null
  
  # Bad bot трафик (будет 403)
  curl -s -H "User-Agent: BadBot/1.0" http://localhost:8080/ > /dev/null
  
  # Suspicious трафик (будет 302)
  curl -s -H "User-Agent: SuspiciousBot/1.0" http://localhost:8080/ > /dev/null
  
  echo -n "."
  sleep 0.5
done

echo ""
echo "Трафик сгенерирован! Проверяйте метрики в Grafana и Prometheus."
