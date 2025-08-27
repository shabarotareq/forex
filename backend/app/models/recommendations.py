from fastapi import APIRouter
from pydantic import BaseModel
from app.utils.ai_tools import generate_forex_recommendation

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

class RecommendationRequest(BaseModel):
    symbol: str
    timeframe: str = "1d"

@router.post("/ai")
def ai_recommendation(req: RecommendationRequest):
    """
    Returns AI-based recommendation (BUY / SELL / HOLD)
    """
    recommendation = generate_forex_recommendation(req.symbol, req.timeframe)
    return {"symbol": req.symbol, "recommendation": recommendation}
