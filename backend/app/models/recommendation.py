from fastapi import APIRouter
from app.routers.technical import technical_analysis
from app.routers.sentiment import sentiment_analysis

router = APIRouter()

@router.get("/{pair}")
def ai_recommendation(pair: str):
    tech = technical_analysis(pair)
    senti = sentiment_analysis(pair)

    sma, ema = tech["SMA"], tech["EMA"]
    sentiment = senti

    if sma[-1] > ema[-1] and sentiment['positive'] > 50:
        action = "Buy"
    elif sma[-1] < ema[-1] and sentiment['negative'] > 50:
        action = "Sell"
    else:
        action = "Hold"

    return {"pair": pair, "recommendation": action}
