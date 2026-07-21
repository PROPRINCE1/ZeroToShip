-- =========================================================
-- CAMPUS PROJECT COLLABORATION PLATFORM DATABASE SCHEMA
-- PostgreSQL / Supabase
-- =========================================================

-- ===========================
-- USERS
-- ===========================
CREATE TABLE users (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================
-- SKILLS
-- ===========================
CREATE TABLE skills (
    skill_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_name VARCHAR(50) UNIQUE NOT NULL
);

-- ===========================
-- USER SKILLS
-- ===========================
CREATE TABLE user_skills (
    user_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,

    skill_points INTEGER DEFAULT 0 CHECK (skill_points >= 0),
    skill_level INTEGER DEFAULT 1 CHECK (skill_level >= 1),
    verified BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (user_id, skill_id),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES skills(skill_id)
        ON DELETE CASCADE
);

-- ===========================
-- PROJECTS
-- ===========================
CREATE TABLE projects (
    project_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    creator_id INTEGER NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,

    status VARCHAR(20)
        DEFAULT 'Open'
        CHECK (status IN ('Open','Closed')),

    project_deadline DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (creator_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- ===========================
-- PROJECT REQUIRED SKILLS
-- ===========================
CREATE TABLE project_required_skills (

    project_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,

    minimum_level INTEGER DEFAULT 1 CHECK (minimum_level >= 1),

    importance VARCHAR(20)
        DEFAULT 'Primary'
        CHECK (importance IN ('Primary','Secondary','Optional')),

    PRIMARY KEY(project_id, skill_id),

    FOREIGN KEY(project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY(skill_id)
        REFERENCES skills(skill_id)
        ON DELETE CASCADE
);

-- ===========================
-- APPLICATIONS
-- ===========================
CREATE TABLE applications (

    application_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    project_id INTEGER NOT NULL,
    applicant_id INTEGER NOT NULL,

    status VARCHAR(20)
        DEFAULT 'Pending'
        CHECK (status IN ('Pending','Approved','Rejected')),

    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY(applicant_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- ===========================
-- TASKS
-- ===========================
CREATE TABLE tasks (

    task_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    project_id INTEGER NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT,

    difficulty VARCHAR(20)
        DEFAULT 'Easy'
        CHECK (difficulty IN ('Easy','Medium','Hard')),

    status VARCHAR(20)
        DEFAULT 'Open'
        CHECK (status IN ('Open','Assigned','Completed')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);

-- ===========================
-- TASK SKILLS
-- ===========================
CREATE TABLE task_skills (

    task_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,

    xp_reward INTEGER NOT NULL CHECK (xp_reward >= 0),

    PRIMARY KEY(task_id, skill_id),

    FOREIGN KEY(task_id)
        REFERENCES tasks(task_id)
        ON DELETE CASCADE,

    FOREIGN KEY(skill_id)
        REFERENCES skills(skill_id)
        ON DELETE CASCADE
);

-- ===========================
-- TASK ASSIGNMENTS
-- ===========================
CREATE TABLE task_assignments (

    assignment_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    status VARCHAR(20)
        DEFAULT 'Assigned'
        CHECK (status IN ('Assigned','Completed','Rejected')),

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,

    FOREIGN KEY(task_id)
        REFERENCES tasks(task_id)
        ON DELETE CASCADE,

    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- =========================================================
-- FUNCTION TO UPDATE SKILL LEVEL FROM XP
-- =========================================================

CREATE OR REPLACE FUNCTION calculate_skill_level()
RETURNS TRIGGER AS
$$
BEGIN

    IF NEW.skill_points < 100 THEN
        NEW.skill_level := 1;

    ELSIF NEW.skill_points < 250 THEN
        NEW.skill_level := 2;

    ELSIF NEW.skill_points < 500 THEN
        NEW.skill_level := 3;

    ELSIF NEW.skill_points < 800 THEN
        NEW.skill_level := 4;

    ELSIF NEW.skill_points < 1200 THEN
        NEW.skill_level := 5;

    ELSE
        NEW.skill_level := 6;

    END IF;

    RETURN NEW;

END;
$$
LANGUAGE plpgsql;

-- =========================================================
-- TRIGGER
-- =========================================================

CREATE TRIGGER update_skill_level
BEFORE INSERT OR UPDATE
ON user_skills
FOR EACH ROW
EXECUTE FUNCTION calculate_skill_level();