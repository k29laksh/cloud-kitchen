pip freeze > requirements.txt
docker-compose up -d --build
docker-compose down
docker exec -it django /bin/sh