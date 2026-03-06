.PHONY: up down build clean

up:
	docker compose up -d --build

down:
	docker compose down

build:
	docker compose build

clean:
	docker compose down -v
	docker compose rm -f 2>/dev/null || true
	docker image prune -f
	rm -rf data/
