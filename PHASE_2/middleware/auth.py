from functools import wraps

from flask import request, jsonify, g

from util.jwt_handler import verify_token


def login_required(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"message":"Token missing"}),401

        if not auth_header.startswith("Bearer "):
            return jsonify({"message":"Invalid token"}),401

        token = auth_header.split(" ")[1]

        payload = verify_token(token)

        if payload is None:
            return jsonify({"message":"Invalid or expired token"}),401

        g.user_id = payload["user_id"]

        return func(*args, **kwargs)

    return wrapper