# backend/app/routes/technical.py

from fastapi import APIRouter
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np

router = APIRouter()

# Dummy data for example (replace with real price data fetching)
def get_price_data(symbol: str):
    # هنا يمكنك جلب البيانات من أي API مجاني مثل Alpha Vantage أو Yahoo Finance
    return pd.DataFrame({
        "Close": [1.2742, 1.2724, 1.2707, 1.2687, 1.2655, 1.2630, 1.2620, 1.2620, 1.2618, 1.2637]
    })

# حساب المؤشرات الفنية
def calculate_indicators(df: pd.DataFrame):
    df = df.copy()
    df["SMA"] = df["Close"].rolling(window=5).mean()
    df["EMA"] = df["Close"].ewm(span=5, adjust=False).mean()
    delta = df["Close"].diff()
    gain = delta.clip(lower=0)
    loss = -1 * delta.clip(upper=0)
    avg_gain = gain.rolling(window=5).mean()
    avg_loss = loss.rolling(window=5).mean()
    rs = avg_gain / avg_loss
    df["RSI"] = 100 - (100 / (1 + rs))
    df["MACD"] = df["Close"].ewm(span=12, adjust=False).mean() - df["Close"].ewm(span=26, adjust=False).mean()
    df["MACD_signal"] = df["MACD"].ewm(span=9, adjust=False).mean()

    # استبدال أي NaN أو inf بـ 0.0
    df = df.replace([np.inf, -np.inf], np.nan).fillna(0.0)
    return df

@router.get("/api/technical/{symbol}")
def technical(symbol: str):
    df = get_price_data(symbol)
    df_indicators = calculate_indicators(df)

    # تحويل البيانات إلى قوائم جاهزة للـ JSON
    indicators = {
        "SMA": df_indicators["SMA"].tolist(),
        "EMA": df_indicators["EMA"].tolist(),
        "RSI": df_indicators["RSI"].tolist(),
        "MACD": df_indicators["MACD"].tolist(),
        "MACD_signal": df_indicators["MACD_signal"].tolist(),
        "Close": df_indicators["Close"].tolist()
    }

    return JSONResponse(content={
        "symbol": symbol,
        "indicators": indicators
    })
