# FSAD Certify

FSAD Certify is a full-stack certification management system with:

- `certify-frontend`: React + Vite frontend
- `certify-backend`: Spring Boot backend
- MySQL database
- JWT-based authentication
- Role-based access for user and admin

## Core Features

- User login and registration
- Admin login
- Certificate CRUD operations
- User dashboard for managing personal certifications
- Admin dashboard for managing users, certificates, and expiry visibility
- Axios-based frontend API integration
- MySQL-backed persistent storage

## Tech Stack

- Frontend: React, Vite, Zustand, Axios, Tailwind CSS, Framer Motion
- Backend: Spring Boot, Spring Security, Spring Data JPA, Flyway
- Database: MySQL
- Authentication: JWT

## Project Structure

```text
FSAD_CERTIFY/
├── certify-frontend/
├── certify-backend/
├── README.md
└── RUBRIC_EXPLANATION.md
```

## Database Setup

MySQL should run on:

- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `root`
- Database: `fsad_certify`

Optional SQL:

```sql
CREATE DATABASE fsad_certify;
```

The backend is already configured to use:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fsad_certify?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
spring.datasource.username=root
spring.datasource.password=root
```

## How to Run

### 1. Start MySQL

Make sure MySQL server is running on `localhost:3306`.

### 2. Run Backend

You can run the backend from Eclipse or terminal.

Terminal:

```powershell
cd e:\FSAD_CERTIFY\certify-backend
.\mvnw.cmd spring-boot:run
```

Eclipse:

1. Import `certify-backend` as an existing Maven project
2. Make sure Java 17+ is configured
3. Open `CertifyBackendApplication.java`
4. Run as `Spring Boot App` or `Java Application`

Backend URL:

```text
http://localhost:8080
```

### 3. Run Frontend

```powershell
cd e:\FSAD_CERTIFY\certify-frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

## Demo Credentials

### User

- Email: `ashish@gmail.com`
- Password: `user123`

### Admin

- Email: `admin@gmail.com`
- Password: `admin123`

## Public Flow

- Landing page with a consistent public navbar
- Login page with shared public navigation
- Register page for new users
- Material-inspired responsive UI for public entry pages

## Notes

- Admin registration is not exposed publicly
- New registrations create only normal user accounts
- Backend seed data inserts demo users and sample certificates
- Frontend uses Axios instead of `fetch`

## Verification

Verified during implementation:

- Frontend production build passed
- Backend Maven compile/package passed
- Backend login endpoint responded successfully

## Submission Reference

For rubric mapping, see:

- [RUBRIC_EXPLANATION.md](e:\FSAD_CERTIFY\RUBRIC_EXPLANATION.md)
