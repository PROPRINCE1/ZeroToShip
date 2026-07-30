import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("session_pooler_uri")

SECRET_KEY = os.getenv("secret_key")

JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", 3600))