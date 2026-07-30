# ZeroToShip

A student collaboration platform that connects university students with projects based on their skills and interests.

---

## Repository Structure

```
ZeroToShip/
│
├── PHASE_1/
│   ├── Output/
│   ├── DB/
│   ├── UNIcolab.drawio
│   └── seed.py
│
├── PHASE_2/
│   ├── Output/
│   ├── middleware/
│   ├── routes/
│   └── util/
│
├── PHASE_3/
│   ├── Output/
│   ├── routes/
│   └── app.py
│
└── Uni_Collab/
    ├── db/
    ├── middleware/
    ├── routes/
    ├── util/
    ├── app.py
    └── config.py
```

---

## Phase 1 – Database Design

### Deliverables

* 📁 **Output** – Database screenshots
* 📁 **DB** – PostgreSQL schema and connection script
* 🧩 **UNIcolab.drawio** – ER diagram
* 🐍 **seed.py** – Random data generation

### Tech Stack

* PostgreSQL (Supabase)
* Python
* psycopg2
* Draw.io

---

## Phase 2 – Authentication & Authorization

### Features

* User Registration
* User Login
* JWT Authentication
* Password Hashing
* Protected Routes
* Project Ownership Authorization

---

## Phase 3 – Project Management API

### Features

* Project CRUD Operations
* Skill-Based Project Search
* Project Applications
* Duplicate Application Prevention
* Protected CRUD Endpoints

---

## Integrated Application

The **`Uni_Collab`** folder contains the fully integrated backend, combining the functionality from all completed phases into a single application.

### Integrated Features

* User Authentication & Authorization
* Database Integration (Supabase PostgreSQL)
* Project Management API
* Skill-Based Project Filtering
* Project Application System
* JWT-Protected Routes

---

## Technologies Used

* Python
* Flask
* PostgreSQL (Supabase)
* psycopg2
* JWT
* bcrypt
* Draw.io

---

## Authors

Developed as part of the **ZeroToShip** university project.
