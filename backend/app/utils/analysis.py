import pandas as pd
import numpy as np

def calculate_technical_indicators(symbol, timeframe="1d", data_points=100):
    """
    هذه دالة تجريبية للحصول على مؤشرات فنية باستخدام بيانات وهمية.
    لاحقًا يمكن ربطها بAPI حي.
    """
    # بيانات وهمية
    np.random.seed(42)
    prices = pd.Series(np.random.normal(100, 1, data_points))
    
    sma = prices.rolling(window=10).mean().tolist()
    ema = prices.ewm(span=10, adjust=False).mean().tolist()
    delta = prices.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()
    rs = avg_gain / avg_loss
    rsi = (100 - (100 / (1 + rs))).fillna(0).tolist()
    
    return {
        "SMA": sma,
        "EMA": ema,
        "RSI": rsi,
    }


def get_economic_indicators(symbol):
    """
    بيانات وهمية للتحليل الأساسي. يمكن لاحقًا الربط بمصادر مجانية مثل:
    https://www.investing.com/central-banks
    https://www.alphavantage.co
    """
    return {
        "GDP": 3.5,
        "CPI": 2.1,
        "InterestRate": 0.25,
        "UnemploymentRate": 4.2,
    }
