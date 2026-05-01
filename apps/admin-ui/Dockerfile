# ---------- Stage 1: Builder ----------
FROM node:22-alpine AS builder

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy app + shared packages metadata
COPY apps/admin-ui/package.json ./apps/admin-ui/
COPY packages/ui ./packages/ui
COPY packages/typescript-config ./packages/typescript-config

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy full source
COPY . .

# Build Next.js app
RUN pnpm --filter admin-ui build


# ---------- Stage 2: Runner ----------
FROM node:22-alpine AS runner

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy workspace metadata
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy admin-ui package metadata
COPY --from=builder /app/apps/admin-ui/package.json ./apps/admin-ui/package.json

# Install production deps only
RUN pnpm install --prod --frozen-lockfile --filter admin-ui

# Copy built output
COPY --from=builder /app/apps/admin-ui/.next ./apps/admin-ui/.next

# (optional but recommended)
COPY --from=builder /app/apps/admin-ui/next.config.js ./apps/admin-ui/next.config.js

# Permissions
RUN chown -R appuser:appgroup /app
USER appuser

WORKDIR /app/apps/admin-ui

EXPOSE 3001

CMD ["pnpm", "start"]