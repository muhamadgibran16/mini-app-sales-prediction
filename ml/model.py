import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def train_model():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'data', 'sales_data.csv')
    model_path = os.path.join(base_dir, 'ml', 'model.joblib')

    if not os.path.exists(data_path):
        print(f"Error: {data_path} missing. Run generate_data.py first.")
        return

    print(f"Loading data from {data_path}...")
    df = pd.read_csv(data_path)
    print(f"Dataset size: {len(df)} rows.")

    X = df[['jumlah_penjualan', 'harga', 'diskon']]
    y = df['status'].map({'Laris': 1, 'Tidak': 0})

    if y.isnull().any():
        print("Cleaning missing values...")
        valid = y.notnull()
        X, y = X[valid], y[valid]

    print("Training Random Forest model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    accuracy = accuracy_score(y_test, model.predict(X_test))
    print(f"Training complete. Accuracy: {accuracy*100:.2f}%")
    
    print("\nClassification Report:")
    print(classification_report(y_test, model.predict(X_test), target_names=['Tidak Laris', 'Laris']))

    print(f"Saving model to {model_path}...")
    joblib.dump(model, model_path)
    print("Done.")

if __name__ == "__main__":
    train_model()
