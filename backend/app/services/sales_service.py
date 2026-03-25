import os
import pandas as pd
from app.core.config import settings
from app.utils.exceptions import ServiceException
from app.schemas.sales import SaleRecord
from typing import List

def get_sales_data() -> List[SaleRecord]:
    if not os.path.exists(settings.DATA_PATH):
        raise ServiceException(message="Sales data file not found", status_code=500)
    
    try:
        df = pd.read_csv(settings.DATA_PATH)
        # Handle possible NaN values
        df = df.fillna(0)
        # Convert to list of SaleRecord models
        records = [SaleRecord(**row) for row in df.to_dict(orient='records')]
        return records
    except Exception as e:
        raise ServiceException(message=f"Error reading sales data: {str(e)}", status_code=500)
