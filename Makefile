dockerDev:
	docker-compose up -d --build
.PHONY: dockerDev

dockerDevStop:
	docker-compose down
.PHONY: dockerDevStop

dockerBuild:
	docker-compose -f docker-compose-prod.yml up -d --build
.PHONY: dockerBuild

dockerBuildStop:
	docker-compose -f docker-compose-prod.yml down
.PHONY: dockerBuildStop

clean:
	docker system prune -a -f