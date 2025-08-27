from fastapi import APIRouter
from textblob import TextBlob

router = APIRouter()

@router.get("/{pair}")
def sentiment_analysis(pair: str):
    # مثال نصوص
    texts = [
        "The market for EURUSD is bullish today!",
        "Traders are worried about inflation.",
        "USD might weaken against EUR next week."
    ]
    positive, neutral, negative = 0, 0, 0
    for txt in texts:
        polarity = TextBlob(txt).sentiment.polarity
        if polarity > 0.05: positive += 1
        elif polarity < -0.05: negative += 1
        else: neutral += 1
    total = len(texts)
    return {
        "pair": pair,
        "positive": round(positive/total*100,2),
        "neutral": round(neutral/total*100,2),
        "negative": round(negative/total*100,2)
    }
