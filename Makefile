.PHONY: start test stop clean monitor logs status unit e2e perf extended load

status:
	docker-compose ps

start:
	docker-compose up -d

stop:
	docker-compose down

clean:
	docker-compose down -v

test:
	./run-test.sh simple.test.js

unit:
	./run-test.sh unit/validation.test.js

e2e:
	./run-test.sh e2e/scenarios.js

perf:
	./run-test.sh e2e/performance.js

extended:
	./run-test.sh e2e/extended-scenarios.js

load:
	./run-test.sh e2e/load-test.js

monitor:
	@echo "� URLs ��мониторинга:"
	@echo "   - Приложение:  http://localhost:8080"
	@echo "   - Prometheus:  http://localhost:9090"
	@echo "   - Grafana:     http://localhost:3000 (admin/admin)"

logs:
	docker-compose logs -f
