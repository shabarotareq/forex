from fastapi import APIRouter
from app.utils.fetchers import get_live_forex

router = APIRouter(prefix="/forex", tags=["forex"])

@router.get("/live")
def live_forex():
    data = get_live_forex()
    return {"forex": data}
