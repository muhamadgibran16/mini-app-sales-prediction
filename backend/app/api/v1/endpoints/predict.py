from fastapi import APIRouter
from app.schemas.sales import PredictRequest, PredictResponse
from app.services.ml_service import get_prediction

router = APIRouter()

@router.post("/", response_model=PredictResponse)
def predict(request: PredictRequest):
    status_result = get_prediction(request.jumlah_penjualan, request.harga, request.diskon)
    return {"status": status_result}
