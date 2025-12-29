# Web Rest Server

This repository contains an implementation of a REST server using Node.js, TypeScript, and Prisma.

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma** (ORM)
- **PostgreSQL** (Database)
- **Docker** (Containerization)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) & Docker Compose

## Getting Started

### 1. Environment Setup

Copy the template environment file to create your local `.env` file:

```bash
cp .env.template .env
```

Review the `.env` file and adjust the variables if needed (e.g., database credentials, port).

### 2. Installation

Install the project dependencies:

```bash
npm install
```

### 3. Database Setup

Start the PostgreSQL database container:

```bash
docker-compose up -d
```

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

## Running the Application

### Development Mode

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

### Production Mode

To build and run the server for production:

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Start the server:
    ```bash
    npm start
    ```