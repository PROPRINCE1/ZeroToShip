from flask import Blueprint, jsonify, request, g

from db.connection import get_connection
from middleware.auth import login_required
from middleware.authorization import project_owner_required

project_bp = Blueprint(
    "projects",
    __name__,
    url_prefix="/api/projects"
)


# =====================================================
# CREATE PROJECT
# POST /api/projects
# =====================================================

@project_bp.route("", methods=["POST"])
@login_required
def create_project():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    deadline = data.get("project_deadline")

    required_skills = data.get("required_skills", [])

    if not title or not description or not deadline:

        return jsonify({
            "message": "Missing required fields."
        }), 400

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute("""
            INSERT INTO projects
            (
                creator_id,
                title,
                description,
                project_deadline
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            RETURNING project_id;
        """,
        (
            g.user_id,
            title,
            description,
            deadline
        ))

        project_id = cur.fetchone()[0]

        for skill in required_skills:

            cur.execute("""
                INSERT INTO project_required_skills
                (
                    project_id,
                    skill_id,
                    minimum_level,
                    importance
                )
                VALUES
                (
                    %s,
                    %s,
                    %s,
                    %s
                );
            """,
            (
                project_id,
                skill["skill_id"],
                skill.get("minimum_level", 1),
                skill.get("importance", "Primary")
            ))

        conn.commit()

        return jsonify({

            "message": "Project created successfully.",
            "project_id": project_id

        }), 201

    except Exception as e:

        conn.rollback()

        return jsonify({

            "message": str(e)

        }), 500

    finally:

        cur.close()
        conn.close()
# =====================================================
# GET ALL PROJECTS
# GET /api/projects
# GET /api/projects?skill=Python
# =====================================================

@project_bp.route("", methods=["GET"])
def get_projects():

    skill = request.args.get("skill")

    conn = get_connection()
    cur = conn.cursor()

    try:

        if skill:

            cur.execute("""
                SELECT DISTINCT

                    p.project_id,
                    p.creator_id,
                    p.title,
                    p.description,
                    p.status,
                    p.project_deadline,
                    p.created_at

                FROM projects p

                JOIN project_required_skills prs
                    ON p.project_id = prs.project_id

                JOIN skills s
                    ON prs.skill_id = s.skill_id

                WHERE LOWER(s.skill_name)=LOWER(%s)

                ORDER BY p.project_id;

            """, (skill,))

        else:

            cur.execute("""
                SELECT

                    project_id,
                    creator_id,
                    title,
                    description,
                    status,
                    project_deadline,
                    created_at

                FROM projects

                ORDER BY project_id;

            """)

        projects = []

        rows = cur.fetchall()

        for row in rows:

            project = {

                "project_id": row[0],
                "creator_id": row[1],
                "title": row[2],
                "description": row[3],
                "status": row[4],
                "project_deadline": str(row[5]),
                "created_at": str(row[6])

            }

            cur.execute("""

                SELECT

                    s.skill_id,
                    s.skill_name,
                    prs.minimum_level,
                    prs.importance

                FROM project_required_skills prs

                JOIN skills s
                    ON prs.skill_id=s.skill_id

                WHERE prs.project_id=%s

                ORDER BY s.skill_name;

            """, (row[0],))

            skills = []

            for skill_row in cur.fetchall():

                skills.append({

                    "skill_id": skill_row[0],
                    "skill_name": skill_row[1],
                    "minimum_level": skill_row[2],
                    "importance": skill_row[3]

                })

            project["required_skills"] = skills

            projects.append(project)

        return jsonify(projects)

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        cur.close()
        conn.close()


# =====================================================
# GET SINGLE PROJECT
# GET /api/projects/<id>
# =====================================================

@project_bp.route("/<int:project_id>", methods=["GET"])
def get_single_project(project_id):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute("""

            SELECT

                project_id,
                creator_id,
                title,
                description,
                status,
                project_deadline,
                created_at

            FROM projects

            WHERE project_id=%s;

        """, (project_id,))

        row = cur.fetchone()

        if row is None:

            return jsonify({

                "message": "Project not found."

            }), 404

        project = {

            "project_id": row[0],
            "creator_id": row[1],
            "title": row[2],
            "description": row[3],
            "status": row[4],
            "project_deadline": str(row[5]),
            "created_at": str(row[6])

        }

        cur.execute("""

            SELECT

                s.skill_id,
                s.skill_name,
                prs.minimum_level,
                prs.importance

            FROM project_required_skills prs

            JOIN skills s
                ON prs.skill_id=s.skill_id

            WHERE prs.project_id=%s

            ORDER BY s.skill_name;

        """, (project_id,))

        skills = []

        for row in cur.fetchall():

            skills.append({

                "skill_id": row[0],
                "skill_name": row[1],
                "minimum_level": row[2],
                "importance": row[3]

            })

        project["required_skills"] = skills

        return jsonify(project)

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        cur.close()
        conn.close()
# =====================================================
# UPDATE PROJECT
# PUT /api/projects/<project_id>
# =====================================================

@project_bp.route("/<int:project_id>", methods=["PUT"])
@login_required
@project_owner_required
def edit_project(project_id):

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    deadline = data.get("project_deadline")
    status = data.get("status")
    required_skills = data.get("required_skills", [])

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute("""
            UPDATE projects
            SET
                title=%s,
                description=%s,
                status=%s,
                project_deadline=%s
            WHERE project_id=%s;
        """, (
            title,
            description,
            status,
            deadline,
            project_id
        ))

        # Remove old required skills
        cur.execute("""
            DELETE FROM project_required_skills
            WHERE project_id=%s;
        """, (project_id,))

        # Insert updated required skills
        for skill in required_skills:

            cur.execute("""
                INSERT INTO project_required_skills
                (
                    project_id,
                    skill_id,
                    minimum_level,
                    importance
                )
                VALUES
                (
                    %s,
                    %s,
                    %s,
                    %s
                );
            """, (
                project_id,
                skill["skill_id"],
                skill.get("minimum_level", 1),
                skill.get("importance", "Primary")
            ))

        conn.commit()

        return jsonify({
            "message": "Project updated successfully."
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        cur.close()
        conn.close()


# =====================================================
# DELETE PROJECT
# DELETE /api/projects/<project_id>
# =====================================================

@project_bp.route("/<int:project_id>", methods=["DELETE"])
@login_required
@project_owner_required
def delete_project(project_id):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute("""
            DELETE FROM projects
            WHERE project_id=%s;
        """, (project_id,))

        if cur.rowcount == 0:

            return jsonify({
                "message": "Project not found."
            }), 404

        conn.commit()

        return jsonify({
            "message": "Project deleted successfully."
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        cur.close()
        conn.close()