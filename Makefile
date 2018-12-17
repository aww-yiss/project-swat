.phony: build

build:
	docker build --rm -f "Dockerfile" -t project-swat:latest .
