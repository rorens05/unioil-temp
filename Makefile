dev-server:
	docker-compose up -d --build dev-build
.PHONY: test-server

dev-server-stop:
	docker-compose stop -t 1 dev-build
.PHONY: test-server-stop

test-server:
	docker-compose up -d --build test-build
.PHONY: test-server

test-server-stop:
	docker-compose stop -t 1 test-build
.PHONY: test-server-stop

prod-server:
	docker-compose -f docker-compose-prod.yml up -d --build
.PHONY: dockerBuild

prod-server-stop:
	docker-compose -f docker-compose-prod.yml down
.PHONY: dockerBuildStop


stop:
	docker-compose down
.PHONY: stop

clean:
	docker system prune --volumes -f