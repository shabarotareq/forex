import random
from transformers import pipeline

# Load once to avoid إعادة التحميل
sentiment_pipeline = pipeline("sentiment-analysis")

def get_sentiment_analysis(text):
    result = sentiment_pipeline(text)[0]
    return result


def generate_forex_recommendation(symbol, timeframe="1d"):
    """
    دالة تجريبية للتوصيات الآلية.
    لاحقًا يمكن استخدام خوارزميات تعلم الآلة أو GPT لتوليد توصية.
    """
    return random.choice(["BUY", "SELL", "HOLD"])
