echo "[*] Creating the docker network"
docker network create app_network

echo "[*] Creating container UI"
docker-compose up
