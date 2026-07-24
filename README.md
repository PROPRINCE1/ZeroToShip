# ZeroToShip

A student collaboration platform that connects university students with projects based on their skills and interests.

---

# Phase 1 – Database Design

## Deliverables

### 📁 Output
Screenshots of the database setup and successful execution.

### 📁 DB
- `db.pgsql` – Database schema
- `connection.py` – Database connection

### 🧩 UNIcolab
ER Diagram (`.drawio`) showing entities and relationships.

### 🐍 seed.py
Python script to populate the database with random sample data.

---

# Phase 2 – Backend Authentication & Security

## Deliverables

### 📁 Output
Screenshots demonstrating:
- Server running
- User registration
- User login
- Unauthorized project edit (403)
- Authorized project edit (200)

### ⚙️ Backend
- `app.py` – Flask application entry point
- `config.py` – Environment configuration
- `database.py` – PostgreSQL connection
- `requirements.txt` – Project dependencies

### 📂 Routes
- `auth.py`
  - `/register`
  - `/login`
- `projects.py`
  - Protected project routes

### 🔒 Middleware
- `auth.py` – JWT authentication middleware
- `authorization.py` – Project ownership verification

### 🛠 Utilities
- `hashing.py` – bcrypt password hashing
- `jwt_handler.py` – JWT generation and verification

---

## Tech Stack

- PostgreSQL (Supabase)
- Python
- Flask
- bcrypt
- JWT (PyJWT)
- psycopg
- Draw.io
