# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the Next.js application for static export
RUN npm run build

# Stage 2: Serve with Nginx (unprivileged)
FROM nginxinc/nginx-unprivileged:alpine AS production

# Copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the static export from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 8080 (unprivileged port)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start nginx (already runs as non-root in nginxinc/nginx-unprivileged)
CMD ["nginx", "-g", "daemon off;"]
