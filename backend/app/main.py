from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.services.ml_service import load_model
from app.utils.error_handlers import setup_exception_handlers

app = FastAPI(title=settings.PROJECT_NAME)

# error handling
setup_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
@app.on_event("startup")
def on_startup():
    load_model()

app.include_router(api_router)
