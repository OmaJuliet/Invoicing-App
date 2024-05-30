# .justfile

# Default
default:
  just --list

# Build Docker Image
build-image:
    docker build -t invoice-client:latest . 

# Run Docker Container
run-container:
    docker run -d -p 3333:3000 --network proxy-net --restart always --name invoice-client invoice-client:latest  

# Docker compose 
run-compose:
    docker compose up -d

# Docker compose down
run-compose-down:
    docker compose down

