from fastapi import APIRouter
from typing import List
from app.schemas.sales import SaleRecord
from app.services.sales_service import get_sales_data

router = APIRouter()

@router.get("/", response_model=List[SaleRecord])
def get_sales():
    return get_sales_data()
