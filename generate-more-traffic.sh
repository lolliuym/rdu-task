#!/bin/bash
echo "=== Генерация трафика для метрик ==="

for i in {1..100}; do
  # Случайный выбор User-Agent
  case $((RANDOM % 3)) in
    0) UA="Mozilla/5.0" ;;
    1) UA="BadBot/1.0" ;;
    2) UA="SuspiciousBot/1.0" ;;
  esac
  
  curl -s -H "User-Agent: $UA" http://localhost:8080/ > /dev/null
  echo -n "."
  sleep 0.1
done

echo ""
echo "Трафик сгенерирован!"
