dev-server:
    docker-compose up -d --build dev-build
.PHONY: dev-server
dev-server-stop:
    docker-compose stop -t 1 dev-build
.PHONY: dev-server-stop
test-server:
    docker-compose up -d --build test-build
.PHONY: test-server
test-server-stop:
    docker-compose stop -t 1 test-build
.PHONY: test-server-stop
prod-server:
    docker-compose -f docker-compose-prod.yml up -d --build
.PHONY: prod-server
prod-server-stop:
    docker-compose -f docker-compose-prod.yml down
.PHONY: prod-server-stop
dev-public-callback-server:
    docker-compose up -d --build public-dev-build
.PHONY: dev-public-callback-server
dev-public-callback-server-stop:
    docker-compose stop -t 1 public-dev-build
.PHONY: dev-public-callback-server-stop
test-public-callback-server:
    docker-compose up -d --build public-test-build 
.PHONY: test-public-callback-server
test-public-callback-server-stop:
    docker-compose stop -t 1 public-test-build 
.PHONY: test-public-callback-server-stop
prod-public-callback-server:
    docker-compose -f docker-compose-public.yml up -d --build
.PHONY: prod-public-callback-server
prod-public-callback-server-stop:
    docker-compose -f docker-compose-public.yml down
.PHONY: prod-public-callback-server-stop
stop:
    docker-compose down
.PHONY: stop
clean:
    docker system prune --volumes -f