# ========================
# Random Data Entry Script
# ========================

import random
from datetime import date, timedelta
from faker import Faker
from PHASE_1.db.connection import get_connection

fake = Faker()

NUM_USERS = 10
NUM_PROJECTS = 6
NUM_TASKS = 10
NUM_APPLICATIONS = 12

SKILLS = [
    "Python",
    "C++",
    "Java",
    "JavaScript",
    "React",
    "Flutter",
    "SQL",
    "Machine Learning",
    "UI/UX",
    "Git",
    "Node.js",
    "TensorFlow"
]

DEPARTMENTS = [
    "CSIT",
    "Software Engineering",
    "Computer Engineering",
    "Artificial Intelligence",
    "Electrical Engineering",
    "Mechanical Engineering"
]

PROJECTS = [
    "AI Resume Analyzer",
    "Campus Navigation System",
    "Smart Attendance",
    "IoT Parking System",
    "Hackathon Team Finder",
    "Drone Surveillance",
    "Hospital Management",
    "Fitness Tracker",
    "Food Delivery Robot",
    "Online Judge"
]

TASKS = [
    "Frontend Development",
    "Backend API",
    "Authentication",
    "Database Design",
    "Machine Learning Model",
    "Dashboard",
    "Testing",
    "Deployment",
    "Documentation",
    "UI Design"
]


def level_from_xp(xp):
    if xp < 100:
        return 1
    elif xp < 250:
        return 2
    elif xp < 500:
        return 3
    elif xp < 800:
        return 4
    elif xp < 1200:
        return 5
    return 6


conn = get_connection()
cur = conn.cursor()

skill_ids = []

for skill in SKILLS:
    cur.execute(
        """
        INSERT INTO skills(skill_name)
        VALUES(%s)
        RETURNING skill_id;
        """,
        (skill,),
    )

    skill_ids.append(cur.fetchone()[0])

user_ids = []

for _ in range(NUM_USERS):

    cur.execute(
        """
        INSERT INTO users
        (name,email,password_hash,department)

        VALUES(%s,%s,%s,%s)

        RETURNING user_id;
        """,
        (
            fake.name(),
            fake.unique.email(),
            fake.sha256(),
            random.choice(DEPARTMENTS),
        ),
    )

    user_ids.append(cur.fetchone()[0])

for user in user_ids:

    selected = random.sample(skill_ids, random.randint(3, 6))

    for skill in selected:

        xp = random.randint(0, 1500)

        cur.execute(
            """
            INSERT INTO user_skills

            (user_id,skill_id,skill_points,skill_level,verified)

            VALUES(%s,%s,%s,%s,%s)
            """,
            (
                user,
                skill,
                xp,
                level_from_xp(xp),
                random.choice([True, False]),
            ),
        )

project_ids = []

for _ in range(NUM_PROJECTS):

    deadline = date.today() + timedelta(days=random.randint(20, 120))

    cur.execute(
        """
        INSERT INTO projects

        (creator_id,title,description,status,project_deadline)

        VALUES(%s,%s,%s,%s,%s)

        RETURNING project_id;
        """,
        (
            random.choice(user_ids),
            random.choice(PROJECTS),
            fake.paragraph(nb_sentences=5),
            random.choice(["Open", "Closed"]),
            deadline,
        ),
    )

    project_ids.append(cur.fetchone()[0])

for project in project_ids:

    required = random.sample(skill_ids, random.randint(2, 4))

    for skill in required:

        cur.execute(
            """
            INSERT INTO project_required_skills

            (project_id,skill_id,minimum_level,importance)

            VALUES(%s,%s,%s,%s)
            """,
            (
                project,
                skill,
                random.randint(1, 5),
                random.choice(
                    ["Primary", "Secondary", "Optional"]
                ),
            ),
        )

for _ in range(NUM_APPLICATIONS):

    cur.execute(
        """
        INSERT INTO applications

        (project_id,applicant_id,status)

        VALUES(%s,%s,%s)
        """,
        (
            random.choice(project_ids),
            random.choice(user_ids),
            random.choice(
                ["Pending", "Approved", "Rejected"]
            ),
        ),
    )

task_ids = []

for _ in range(NUM_TASKS):

    cur.execute(
        """
        INSERT INTO tasks

        (project_id,title,description,difficulty,status)

        VALUES(%s,%s,%s,%s,%s)

        RETURNING task_id;
        """,
        (
            random.choice(project_ids),
            random.choice(TASKS),
            fake.sentence(),
            random.choice(["Easy", "Medium", "Hard"]),
            random.choice(
                ["Open", "Assigned", "Completed"]
            ),
        ),
    )

    task_ids.append(cur.fetchone()[0])

for task in task_ids:

    used = random.sample(skill_ids, random.randint(1, 3))

    for skill in used:

        cur.execute(
            """
            INSERT INTO task_skills

            (task_id,skill_id,xp_reward)

            VALUES(%s,%s,%s)
            """,
            (
                task,
                skill,
                random.randint(20, 120),
            ),
        )

for task in task_ids:

    status = random.choice(
        ["Assigned", "Completed", "Rejected"]
    )

    completed = None

    if status == "Completed":
        completed = fake.date_time_this_year()

    cur.execute(
        """
        INSERT INTO task_assignments

        (task_id,user_id,status,completed_at)

        VALUES(%s,%s,%s,%s)
        """,
        (
            task,
            random.choice(user_ids),
            status,
            completed,
        ),
    )

conn.commit()

cur.close()
conn.close()

print("Database seeded successfully!")
