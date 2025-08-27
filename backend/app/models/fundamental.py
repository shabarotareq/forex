from fastapi import APIRouter

router = APIRouter()

@router.get("/{pair}")
def fundamental_analysis(pair: str):
    indicators = [
        {"name": "GDP Growth", "value": "2.5%", "impact": "High"},
        {"name": "Inflation Rate", "value": "3.2%", "impact": "Medium"},
        {"name": "Unemployment Rate", "value": "5%", "impact": "High"},
    ]
    return {"pair": pair, "indicators": indicators}
