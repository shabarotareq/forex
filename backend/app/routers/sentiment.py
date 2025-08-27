from fastapi import APIRouter
from pydantic import BaseModel
from app.utils.ai_tools import get_sentiment_analysis

router = APIRouter(prefix="/sentiment", tags=["sentiment"])

class SentimentRequest(BaseModel):
    text: str  # يمكن أن يكون خبر أو تغريدة أو تقرير

@router.post("/analyze")
def analyze_sentiment(req: SentimentRequest):
    """
    Returns sentiment score for given text
    """
    score = get_sentiment_analysis(req.text)
    return {"text": req.text, "sentiment_score": score}
