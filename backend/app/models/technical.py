from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/{pair}")
def technical_analysis(pair: str):
    # مثال بيانات أسعار عشوائية (يجب استبدالها بالأسعار الحقيقية)
    prices = [1.1, 1.12, 1.11, 1.13, 1.15, 1.14, 1.16, 1.17]
    series = pd.Series(prices)
    sma = series.rolling(window=3).mean().tolist()
    ema = series.ewm(span=3, adjust=False).mean().tolist()
    return {"pair": pair, "SMA": sma, "EMA": ema}
