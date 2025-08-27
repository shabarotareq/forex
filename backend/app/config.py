import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/forex_dashboard")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
