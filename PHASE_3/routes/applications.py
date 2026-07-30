from flask import Blueprint, jsonify, request, g

from db.connection import get_connection
from middleware.auth import login_required

application_bp = Blueprint(
    "applications",
    __name__,
    url_prefix="/api"
)


# =====================================================
# APPLY TO PROJECT
# POST /api/apply
# =====================================================

@application_bp.route("/apply", methods=["POST"])
@login_required
def apply_to_project():

    data = request.get_json()

    project_id = data.get("project_id")

    if project_id is None:

        return jsonify({
            "message": "Project ID is required."
        }), 400

    conn = get_connection()
    cur = conn.cursor()

    try:

        # Check whether project exists
        cur.execute("""
            SELECT creator_id
            FROM projects
            WHERE project_id=%s;
        """, (project_id,))

        project = cur.fetchone()

        if project is None:

            return jsonify({
                "message": "Project not found."
            }), 404

        creator_id = project[0]

        # Prevent creator from applying to own project
        if creator_id == g.user_id:

            return jsonify({
                "message": "You cannot apply to your own project."
            }), 403

        # Insert application
        cur.execute("""
            INSERT INTO applications
            (
                project_id,
                applicant_id
            )
            VALUES
            (
                %s,
                %s
            );
        """, (
            project_id,
            g.user_id
        ))

        conn.commit()

        return jsonify({

            "message": "Application submitted successfully."

        }), 201

    except Exception as e:

        conn.rollback()

        # Duplicate application
        if "unique_application" in str(e):

            return jsonify({
                "message": "You have already applied to this project."
            }), 409

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        cur.close()
        conn.close()