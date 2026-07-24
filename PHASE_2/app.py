from flask import Flask

from routes.auth import auth_bp
from routes.projects import project_bp

app = Flask(__name__)

app.register_blueprint(auth_bp)

app.register_blueprint(project_bp)

@app.route("/")
def home():
    return {
        "message": "ZeroToShip Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True) 