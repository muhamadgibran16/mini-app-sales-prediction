from fastapi import APIRouter
from datetime import timedelta
from app.schemas.auth import LoginRequest, Token
from app.core.security import create_access_token
from app.core.config import settings
from app.utils.exceptions import AuthException

router = APIRouter()

@router.post("/login", response_model=Token)
def login(request: LoginRequest):
    if request.username == settings.ADMIN_USERNAME and request.password == settings.ADMIN_PASSWORD:
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": request.username}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise AuthException(message="Incorrect username or password")
