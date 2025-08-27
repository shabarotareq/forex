from fastapi import APIRouter
from pydantic import BaseModel
from app.utils.analysis import get_economic_indicators

router = APIRouter(prefix="/fundamental", tags=["fundamental"])

class FundamentalRequest(BaseModel):
    symbol: str

@router.post("/indicators")
def fundamental_analysis(req: FundamentalRequest):
    """
    Returns basic fundamental indicators (GDP, CPI, Interest Rates, etc.)
    """
    data = get_economic_indicators(req.symbol)
    return {"symbol": req.symbol, "fundamental_data": data}
