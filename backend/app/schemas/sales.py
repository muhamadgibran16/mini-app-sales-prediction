from pydantic import BaseModel

class SaleRecord(BaseModel):
    product_id: str
    product_name: str
    jumlah_penjualan: int
    harga: int
    diskon: int
    status: str

class PredictRequest(BaseModel):
    jumlah_penjualan: int
    harga: int
    diskon: int

class PredictResponse(BaseModel):
    status: str
