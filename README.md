
# Тестовый стенд для веб-приложения

Этот проект представляет собой тестовый стенд для веб-приложения, включающий в себя Nginx в качестве веб-сервера, Envoy в качестве обратного прокси и K6 для тестирования. Также настроен мониторинг с использованием Prometheus и Grafana.

## Запуск, тестирование и остановка

### Запуск стенда
Для запуска всех сервисов стенда используйте скрипт:
```bash
./start.sh
```
Или команду `make`:
```bash
make start
```

### Запуск тестов
Для запуска базовых тестов (simple.test.js):
```bash
make test
```

### Остановка
Для остановки всех сервисов стенда:
```bash
./stop.sh
```
Или команду `make`:
```bash
make stop
```

## 📁 Структура проекта

```
.
├── configs/                    # Конфигурационные файлы
│   ├── envoy.yaml             # Основная конфигурация Envoy
│   ├── envoy-*.yaml           # Альтернативные конфигурации
│   ├── nginx.conf             # Конфигурация Nginx
│   ├── prometheus.yml         # Конфигурация Prometheus
│   └── healthcheck.html       # Файл healthcheck
├── static/                    # Статические файлы HTML
│   ├── index.html            # Главная страница
│   ├── challenge.html        # Страница проверки
│   ├── dashboard.html        # Dashboard приложения
│   └── healthcheck.html      # Healthcheck страница
├── tests/                     # Тесты (k6)
│   ├── simple.test.js        # Базовые тесты
│   ├── e2e/                  # End-to-end тесты
│   │   ├── scenarios.js      # Основные сценарии
│   │   ├── extended-scenarios.js # Расширенные сценарии
│   │   ├── performance.js    # Тесты производительности
│   │   └── load-test.js      # Нагрузочные тесты
│   └── unit/                 # Юнит тесты
├── dashboard/                 # Конфигурация Grafana
│   ├── dashboards/            # Дашборды Grafana
│   ├── grafana.ini            # Настройки Grafana
│   └── provisioning/          # Провижининг источников данных и дашбордов
├── *.sh                      # Скрипты управления
└── Makefile                  # Алиасы команд
```

## 🧪 Сценарии классификации

| Сценарий    | User-Agent        | Ожидаемый ответ |
|-------------|-------------------|-----------------|
| Human       | `Mozilla/5.0`     | `200 OK`        |
| Bad Bot     | `BadBot/1.0`      | `403 Forbidden` |
| Suspicious  | `SuspiciousBot/1.0`| `302 Redirect`  |

## 🛠 Команды управления

### Основные скрипты
```bash
./start.sh          # Запуск всего стенда
./stop.sh           # Остановка стенда
./status.sh         # Статус сервисов
./test.sh           # Базовые тесты (simple.test.js)
```

### Расширенное тестирование
```bash
./extended-test.sh  # Расширенные тесты (extended-scenarios.js)
./load-test.sh      # Нагрузочное тестирование (load-test.js)
./run-test.sh       # Универсальный запускатель тестов (принимает путь к файлу теста)
```

### Мониторинг и диагностика
```bash
./monitor-info.sh           # Информация о мониторинге (ссылки)
./check-metrics.sh          # Базовая проверка метрик Prometheus
./check-metrics-detailed.sh # Детальная проверка метрик Prometheus
./check-prometheus-query.sh # Запросы к Prometheus API
./check-grafana-setup.sh    # Проверка настройки Grafana
./check-nginx-metrics.sh    # Проверка метрик Nginx (через Nginx Exporter)
./check-prometheus-metrics.sh # Проверка доступности метрик Prometheus
./check-grafana.sh          # Проверка доступности Grafana
```

### Утилиты
```bash
./generate-traffic.sh       # Генерация тестового трафика для наблюдения за метриками
./generate-more-traffic.sh  # Генерация большего объема трафика
./setup-grafana-dashboard.sh # Настройка дашборда Grafana (если требуется ручная установка)
./full-test.sh             # Полное тестирование системы (включает разные виды тестов)
```

### Makefile команды
```bash
make start     # Запуск стенда
make stop      # Остановка стенда
make test      # Базовые тесты (simple.test.js)
make unit      # Юнит тесты (validation.test.js)
make e2e       # End-to-end тесты (scenarios.js)
make perf      # Тесты производительности (performance.js)
make extended  # Расширенные тесты (extended-scenarios.js)
make load      # Нагрузочные тесты (load-test.js)
make monitor   # Информация о мониторинге
make logs      # Просмотр логов всех сервисов
make status    # Статус сервисов
make clean     # Очистка (удаление остановленных контейнеров и томов)
```

## 📊 Мониторинг

После запуска стенда вы можете получить доступ к следующим интерфейсам:

*   **🌐 Приложение:** [http://localhost:8080](http://localhost:8080)
*   **📈 Prometheus:** [http://localhost:9090](http://localhost:9090)
*   **📊 Grafana:** [http://localhost:3000](http://localhost:3000) (логин: `admin`, пароль: `admin`)
*   **🎯 Prometheus Targets:** [http://localhost:9090/targets](http://localhost:9090/targets)
*   **📡 Node Exporter:** [http://localhost:9100](http://localhost:9100)
*   **🔧 Nginx Exporter:** [http://localhost:9113](http://localhost:9113)

## 🐳 Сервисы

| Сервис         | Описание                                  | Порты          |
|----------------|-------------------------------------------|----------------|
| `server`       | Nginx веб-сервер, обслуживающий статические файлы | 80             |
| `rdu`          | Envoy reverse proxy, маршрутизация и фильтрация трафика | 8080, 9901 (admin) |
| `client`       | Окружение для запуска тестов `k6`           | (нет открытых) |
| `prometheus`   | Сбор и хранение метрик                       | 9090           |
| `grafana`      | Визуализация метрик и дашборды              | 3000           |
| `node-exporter`| Экспортер метрик операционной системы        | 9100           |
| `nginx-exporter`| Экспортер метрик Nginx                      | 9113           |

## ✅ Соответствие требованиям

### Основные требования:
*   **3 контейнера:** `server`, `rdu`, `client`
*   **Одна команда запуска:** `./start.sh`
*   **Одна команда тестов:** `make test`
*   **3 сценария классификации запросов:** Human, Bad Bot, Suspicious

### Бонусные задания:
*   **Разные сценарии с заголовками:** Реализовано более 7 различных User-Agent для тестирования.
*   **Тесты производительности:** Используется `k6` для нагрузочного и перформанс-тестирования.
*   **Observability:** Полностью настроены Prometheus и Grafana для сбора и визуализации метрик.
*   **Правила reverse-proxy работают корректно:** Проверено и подтверждено тестовыми сценариями.

## 🧪 Тестовые сценарии (Ручное тестирование)

Вы можете вручную проверить логику маршрутизации и классификации запросов с помощью `curl`:

```bash
# → 200 OK (Human)
curl -H "User-Agent: Mozilla/5.0" http://localhost:8080

# → 403 Forbidden (Bad Bot)
curl -H "User-Agent: BadBot/1.0" http://localhost:8080

# → 302 Redirect (Suspicious)
curl -H "User-Agent: SuspiciousBot/1.0" http://localhost:8080

# Дополнительные сценарии (бонусное задание)
curl -H "User-Agent: Googlebot/2.1" http://localhost:8080 # → 200 OK (Good Bot)
curl -H "User-Agent: AhrefsBot/7.0" http://localhost:8080 # → 200 OK (Good Bot)
curl -H "User-Agent: SomeScanner/1.0" http://localhost:8080 # → 403 Forbidden (Known Scanner)
curl -H "User-Agent: CustomApp/1.0" http://localhost:8080 # → 200 OK (Default/Custom App)
```
