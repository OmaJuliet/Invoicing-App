# .justfile

# Default
default:
  just --list

# Build Docker Image
# docker build \
#     --build-arg NODE_ENV=production \
#     # --build-arg STRAPI_URL=https://api.example.com \ # Uncomment to set the Strapi Server URL
#     -t invoice-server:latest \ # Replace with your image name
#     -f Dockerfile.prod . 
build-image:
    docker build --build-arg NODE_ENV=production -t invoice-server:latest -f Dockerfile.prod .

# Run Docker Container
run-container:
    docker run -d -p 1337:1337 --network proxy-net --restart always --name invoice-backend invoice-server:latest  

# Docker compose 
run-compose:
    docker compose up -d

# Docker compose down
run-compose-down:
    docker compose down

