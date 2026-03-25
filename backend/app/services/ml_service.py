import joblib
import pandas as pd
from app.core.config import settings
from app.utils.exceptions import ServiceException

model = None

def load_model():
    global model
    try:
        model = joblib.load(settings.MODEL_PATH)
    except Exception as e:
        print(f"Warning: Model not found or failed to load. Please run ml/train.py. Error: {e}")
        model = None

def get_prediction(jumlah_penjualan: int, harga: int, diskon: int) -> str:
    global model
    if model is None:
        try:
            model = joblib.load(settings.MODEL_PATH)
        except Exception:
            raise ServiceException(message="ML model is not available. Train the model first.", status_code=500)

    try:
        # Create DataFrame for prediction to match feature names
        input_data = pd.DataFrame([{
            'jumlah_penjualan': jumlah_penjualan,
            'harga': harga,
            'diskon': diskon
        }])
        
        prediction = model.predict(input_data)
        status_result = "Laris" if prediction[0] == 1 else "Tidak Laris"
        
        return status_result
    except Exception as e:
        raise ServiceException(message=f"Prediction error: {str(e)}", status_code=500)
