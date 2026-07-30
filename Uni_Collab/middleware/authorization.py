from functools import wraps

from flask import jsonify, g

from db.connection import get_connection


def project_owner_required(func):

    @wraps(func)
    def wrapper(project_id,*args,**kwargs):

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT creator_id
            FROM projects
            WHERE project_id=%s
            """,
            (project_id,)
        )

        project = cur.fetchone()

        cur.close()
        conn.close()

        if project is None:
            return jsonify({"message":"Project not found"}),404

        if project[0] != g.user_id:
            return jsonify({
                "message":"Forbidden"
            }),403

        return func(project_id,*args,**kwargs)

    return wrapper