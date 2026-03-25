import os
from dotenv import load_dotenv

# Load .env from the backend directory regardless of working directory
_ENV_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), '.env')
load_dotenv(dotenv_path=_ENV_PATH)

class Settings:
    PROJECT_NAME: str = "Mini AI Sales Prediction API"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "fallback-insecure-key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "admin123")

    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    DATA_PATH: str = os.path.join(BASE_DIR, 'data', 'sales_data.csv')
    MODEL_PATH: str = os.path.join(BASE_DIR, 'ml', 'model.joblib')

settings = Settings()
