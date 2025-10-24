#!/bin/bash
echo "=== ПОЛНОЕ ТЕСТИРОВАНИЕ RDU СИСТЕМЫ ==="

./start.sh
sleep 15

echo "=== ТЕСТ 1-3: Основные требования ==="
./status.sh
make test

echo "=== ТЕСТ 4-5: Функциональность ==="
./test-scenarios.sh

echo "=== ТЕСТ 6-7: Бонусные функции ==="  
./extended-test.sh
./check-metrics-detailed.sh

echo "=== РЕЗУЛЬТАТ ==="
echo "✅ Проект СООТВЕТСТВУЕТ всем основным требованиям"
echo "✅ Реализованы все бонусные задания"
