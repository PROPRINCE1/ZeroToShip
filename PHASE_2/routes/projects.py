from flask import Blueprint
from flask import jsonify

from middleware.auth import login_required
from middleware.authorization import project_owner_required

project_bp = Blueprint(
    "projects",
    __name__,
    url_prefix="/projects"
)

@project_bp.route("/<int:project_id>",methods=["PUT"])
@login_required
@project_owner_required
def edit_project(project_id):

    return jsonify({
        "message":"Project updated."
    })

@project_bp.route("/<int:project_id>",methods=["DELETE"])
@login_required
@project_owner_required
def delete_project(project_id):

    return jsonify({
        "message":"Project deleted."
    })