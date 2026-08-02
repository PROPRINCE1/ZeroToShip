# ZeroToShip

A student collaboration platform that connects university students with projects based on their skills, interests, and collaboration goals.

ZeroToShip allows students to discover projects, create their own ideas, find teammates, and collaborate through a centralized university project marketplace.

---

# Repository Structure

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
│   ├── util/
│   ├── app.py
│   └── config.py
│
├── PHASE_3/
│   ├── Output/
│   ├── routes/
│   ├── app.py
│   └── API documentation
│
├── PHASE_4/
│   └── Uni_Collab/
│       ├── frontend/
│       │   ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── context/
│       │   └── data/
│       │
│       └── backend/
│           ├── routes/
│           ├── middleware/
│           ├── util/
│           ├── app.py
│           └── config.py
│
└── README.md
```

---

# Phase 1 – Database Design

## Deliverables

* 📁 **Output** – Database screenshots
* 📁 **DB** – PostgreSQL schema and connection scripts
* 🧩 **UNIcolab.drawio** – Entity Relationship Diagram
* 🐍 **seed.py** – Database test data generation

## Tech Stack

* PostgreSQL (Supabase)
* Python
* psycopg2
* Draw.io

## Database Features

* User management
* Skills system
* User skill tracking
* Project management
* Required project skills
* Application management

---

# Phase 2 – Authentication & Authorization

## Features

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* Authorization Middleware
* Project Ownership Validation

---

# Phase 3 – Project Management API

## Features

* Project CRUD Operations
* Create, Read, Update, Delete Projects
* Skill-Based Project Filtering
* Project Application System
* Duplicate Application Prevention
* Protected CRUD Endpoints
* Application Status Management

---

# Phase 4 – Frontend Application

## Features

### Project Marketplace

* Browse available university projects
* Search and filter projects by skills
* Responsive project cards
* Project status indicators

### Project Creation

* Create new projects
* Add required skills
* Define project difficulty
* Set deadlines
* Add required team positions
* Live project preview

### Project Details

* Detailed project overview
* Required roles
* Technologies section
* Team information
* Application system

### User Portal

* User statistics
* Project overview
* Achievements section
* Activity tracking

### Settings

* Account settings
* Notification preferences
* Appearance settings
* Project management
* Account controls

### Responsive Design

* Desktop layout
* Tablet support
* Mobile navigation
* Mobile-friendly components

---

# Integrated Application

The **Uni_Collab** application combines all completed phases into one platform.

## Integrated Features

* User Authentication & Authorization
* PostgreSQL Database Integration
* JWT Protected APIs
* Project Marketplace
* Project Creation System
* Skill-Based Discovery
* Application Workflow
* Responsive Frontend Interface
* User Dashboard/Portal

---

# Technologies Used

## Backend

* Python
* Flask
* PostgreSQL (Supabase)
* psycopg2
* JWT
* bcrypt

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Lucide React Icons

## Tools

* Git & GitHub
* Draw.io
* VS Code

---

# Future Improvements

* Real-time project collaboration
* Direct messaging between students
* Backend-connected frontend authentication
* Automated skill recommendation system
* Project progress tracking
* User profiles and portfolios

---

# Authors

Developed as part of the **ZeroToShip university project**.
