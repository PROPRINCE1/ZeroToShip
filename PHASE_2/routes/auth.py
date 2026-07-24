from flask import Blueprint, request, jsonify

from PHASE_1.db.connection import get_connection   # Ignore Current Module Error as it'll be resolved in the final integration :)
from util.hashing import hash_password, verify_password
from util.jwt_handler import generate_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT user_id,password_hash
        FROM users
        WHERE email=%s
        """,
        (email,)
    )

    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:

        return jsonify({
            "message":"Invalid credentials."
        }),401

    user_id = user[0]
    password_hash = user[1]

    if not verify_password(password,password_hash):

        return jsonify({
            "message":"Invalid credentials."
        }),401

    token = generate_token(user_id)

    return jsonify({
        "token":token
    })

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]
    department = data["department"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT user_id FROM users WHERE email=%s",
        (email,)
    )

    if cur.fetchone():

        cur.close()
        conn.close()

        return jsonify({
            "message": "Email already exists."
        }), 400

    hashed = hash_password(password)

    cur.execute(
        """
        INSERT INTO users
        (name,email,password_hash,department)
        VALUES (%s,%s,%s,%s)
        """,
        (name,email,hashed,department)
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message":"Registration successful."
    }),201