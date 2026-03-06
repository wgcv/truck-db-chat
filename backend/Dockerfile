# syntax=docker/dockerfile:1
FROM oven/bun:1-alpine

WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

EXPOSE 3000

ENV NODE_ENV=production

# Run migrations then start the server
CMD ["sh", "-c", "bun run db:migrate && exec bun run src/index.ts"]
