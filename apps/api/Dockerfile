# ---------- Stage 1: Builder ----------
FROM node:22-alpine AS builder

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy only necessary files for dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/typescript-config ./packages/typescript-config

# Install dependencies (workspace-aware)
RUN pnpm install --frozen-lockfile

# Copy full source
COPY . .

# Build only API
RUN pnpm --filter api build


# ---------- Stage 2: Runtime ----------
FROM node:22-alpine AS runner

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy root workspace files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy api package metadata
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

# Install only production dependencies for api
RUN pnpm install --prod --frozen-lockfile --filter api

# Copy compiled API output
COPY --from=builder /app/apps/api/dist ./apps/api/dist

RUN chown -R appuser:appgroup /app

USER appuser

WORKDIR /app/apps/api

EXPOSE 4000

CMD ["node", "dist/server.js"]