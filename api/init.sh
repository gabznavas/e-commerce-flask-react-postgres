echo "[*] Creating the docker network"
docker network create app_network

echo "[*] Creating container API"
docker-compose up
