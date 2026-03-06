# Use Alpine-based Python image for minimal size
FROM python:3.12-alpine

# Install build dependencies for packages with C extensions (removed after pip install)
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy requirements first for better layer caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY agents/ agents/
COPY utils/ utils/
COPY app.py .

# Create graphs directory for save_graph output
RUN mkdir -p graphs

# Environment variables (override at runtime)
ENV PYTHONUNBUFFERED=1
ENV BACKEND_URL=http://localhost:3000

# Expose FastAPI port
EXPOSE 8000

# Run with uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
