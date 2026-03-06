## Run in docker
docker run -p 8000:8000 \
  -e OPENROUTER_API_KEY="your-api-key" \
  -e BACKEND_URL="http://host.docker.internal:3000" \
  ai-agent

## Run in dev
flask dev app.py


## .env example
```
OPENROUTER_API_KEY="xxxx"
BACKEND_URL="http://localhost:3000"
```