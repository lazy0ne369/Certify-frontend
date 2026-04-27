# Railway Deployment

This repo should be deployed to Railway as two services from the same monorepo:

- `certify-backend`
- `certify-frontend`

Railway monorepo docs: https://docs.railway.com/guides/monorepo

## 1. Backend Service

Create a service from this repo and set:

- Root Directory: `/certify-backend`
- Watch Paths:
  - `/certify-backend/**`

Railway can build the Spring Boot backend automatically from the root directory.

Recommended backend variables:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:3306/<db>?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
SPRING_DATASOURCE_USERNAME=<db-user>
SPRING_DATASOURCE_PASSWORD=<db-password>

APP_JWT_SECRET=<long-random-secret>
APP_CORS_ALLOWED_ORIGIN_PATTERNS=https://<your-frontend-domain>

SPRING_MAIL_USERNAME=certify431@gmail.com
SPRING_MAIL_PASSWORD=<gmail-app-password>
APP_MAIL_FROM=certify431@gmail.com
APP_MAIL_ENABLED=true
SPRING_MAIL_TEST_CONNECTION=true
```

Notes:

- Railway injects `PORT`, and the backend now reads `server.port=${PORT:8080}`
- If you add a Railway MySQL service, use its connection details for the datasource variables

## 2. Frontend Service

Create a second service from the same repo and set:

- Root Directory: `/certify-frontend`
- Watch Paths:
  - `/certify-frontend/**`

The frontend includes a `Dockerfile` and `Caddyfile` so Railway can:

- build the Vite app
- serve `dist/`
- support SPA route refreshes like `/login`, `/profile`, `/dashboard`

Frontend variable:

```env
VITE_API_BASE_URL=https://<your-backend-domain>/api
```

Because Vite variables are build-time values, redeploy the frontend after changing `VITE_API_BASE_URL`.

## 3. Railway Domains

Generate a public domain for:

- backend service
- frontend service

Then:

1. Copy the backend public URL into frontend `VITE_API_BASE_URL`
2. Copy the frontend public URL into backend `APP_CORS_ALLOWED_ORIGIN_PATTERNS`
3. Redeploy both services

## 4. Recommended Order

1. Deploy backend
2. Add database variables
3. Generate backend domain
4. Deploy frontend
5. Set frontend `VITE_API_BASE_URL`
6. Set backend `APP_CORS_ALLOWED_ORIGIN_PATTERNS`
7. Redeploy both

## 5. Official Railway References

- Monorepo setup: https://docs.railway.com/guides/monorepo
- Build and start commands: https://docs.railway.com/reference/build-and-start-commands
- Variables: https://docs.railway.com/variables
- SPA routing with Caddy: https://docs.railway.com/guides/spa-routing-configuration
