from sys import prefix
from fastapi import APIRouter
from app.api.v1.endpoints import auth, sales, predict, health

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(sales.router, prefix="/sales", tags=["sales"])
api_router.include_router(predict.router, prefix="/predict", tags=["predict"])
