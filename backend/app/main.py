from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import ta

app = FastAPI(title="Forex AI Backend")

# للسماح بالـ Frontend من React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# مثال بيانات أسعار EURUSD وهمية، لاحقاً ممكن تجيبها من API حقيقي
price_data = {
    "EURUSD": [1.2742, 1.2724, 1.2707, 1.2687, 1.2655,
               1.263, 1.262, 1.262, 1.2618, 1.2637,
               1.2647, 1.2659, 1.2674, 1.2686, 1.2715,
               1.2742, 1.2756, 1.2754, 1.2738, 1.272]
}

@app.get("/api/technical/{symbol}")
def get_technical_indicators(symbol: str):
    if symbol not in price_data:
        return {"error": "Symbol not found"}

    df = pd.DataFrame({"close": price_data[symbol]})

    # SMA و EMA
    df["SMA"] = df["close"].rolling(window=14).mean()
    df["EMA"] = df["close"].ewm(span=14, adjust=False).mean()

    # RSI
    df["RSI"] = ta.momentum.RSIIndicator(df["close"], window=14).rsi()

    # MACD
    macd = ta.trend.MACD(df["close"])
    df["MACD"] = macd.macd()
    df["MACD_signal"] = macd.macd_signal()

    # ترتيب المؤشرات
    indicators = {
        "SMA": df["SMA"].round(4).tolist(),
        "EMA": df["EMA"].round(4).tolist(),
        "RSI": df["RSI"].round(2).tolist(),
        "MACD": df["MACD"].round(4).tolist(),
        "MACD_signal": df["MACD_signal"].round(4).tolist(),
        "Close": df["close"].tolist()
    }

    return {"symbol": symbol, "indicators": indicators}
