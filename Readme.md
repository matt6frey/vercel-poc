# Vercel POC - Veterinary API

A Node.js REST API built with Fastify and SQLite, deployable to Vercel. This app provides endpoints for managing users, pets, clinics, and appointments with seeded test data.

## Features

- **Fastify** web framework for high-performance routing
- **SQLite** database with better-sqlite3 for data persistence
- **Modular architecture** with separate route handlers
- **Seeded data** ready for testing
- **Vercel-ready** serverless deployment configuration

## Project Structure

```
vercel-poc/
├── api/
│   └── index.js          # Main Fastify app and Vercel handler
├── db/
│   └── init.js           # Database initialization and seeding
├── routes/
│   ├── users.js          # User endpoints
│   ├── pets.js           # Pet endpoints
│   ├── clinics.js        # Clinic endpoints
│   └── health-check.js   # Health check endpoint
├── package.json
├── vercel.json           # Vercel configuration
└── .gitignore
```

## API Endpoints

All endpoints are open (no authentication required).

### Root
- `GET /` - API information and available endpoints

### Health Check
- `GET /health-check` - Returns server health status and uptime

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID with their pets

### Pets
- `GET /pets` - List all pets with owner information
- `GET /pets/:id` - Get pet by ID with appointments

### Clinics
- `GET /clinics` - List all clinics
- `GET /clinics/:id` - Get clinic by ID with appointments

## Database Schema

### Main Tables
- **users** - id, name, email
- **pets** - id, name, age, status (healthy|sick), owner_id
- **clinics** - id, name, address
- **appointments** - id, treatment_type (check up|surgery|null), completed_date

### Pivot Tables
- **users_pets** - Links users to their pets
- **clinics_appointments** - Links clinics to appointments
- **pets_appointments** - Links pets to their appointments

## Seeded Data

The database is automatically seeded with:
- 4 users
- 6 pets (mix of healthy and sick statuses)
- 3 clinics
- 5 appointments (various treatment types)
- Related pivot table entries

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Access the API:**
   ```
   http://localhost:3000
   ```

## Deployment to Vercel

1. **Install Vercel CLI (if not already installed):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** to link your project and deploy

The app is configured via [vercel.json](vercel.json) to use serverless functions.

## Example API Responses

### GET /users
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  ]
}
```

### GET /pets/1
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Max",
    "age": 3,
    "status": "healthy",
    "owner_id": 1,
    "owner_name": "John Doe",
    "owner_email": "john.doe@example.com",
    "appointments": [
      {
        "id": 1,
        "treatment_type": "check up",
        "completed_date": "2024-01-15"
      }
    ]
  }
}
```

## Technologies

- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - SQLite3 bindings for Node.js
- [Vercel](https://vercel.com/) - Deployment platform for serverless functions

## License

ISC
