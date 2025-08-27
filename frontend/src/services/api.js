import axios from "axios";

// عنوان الـ Backend (عدّله إذا غيرت البورت أو الـ host)
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ============================
// 📊 Technical Indicators
// ============================
export const fetchTechnicalIndicators = async (symbol) => {
  try {
    const res = await API.get(`/technical/${symbol}`);
    return res;
  } catch (err) {
    console.error("Error fetching technical indicators:", err);
    return { data: { indicators: {} } };
  }
};

// ============================
// 📈 Fundamental Analysis
// ============================
export const fetchEconomicIndicators = async () => {
  try {
    const res = await API.get(`/fundamentals`);
    return res;
  } catch (err) {
    console.error("Error fetching fundamentals:", err);
    return { data: {} };
  }
};

// ============================
// 📰 Sentiment Analysis
// ============================
export const fetchSentiment = async (symbol) => {
  try {
    const res = await API.get(`/sentiment/${symbol}`);
    return res;
  } catch (err) {
    console.error("Error fetching sentiment:", err);
    return { data: {} };
  }
};

// ============================
// 🤖 AI Recommendations
// ============================
export const fetchAIRecommendations = async () => {
  try {
    const res = await API.get(`/ai/recommendations`);
    return res;
  } catch (err) {
    console.error("Error fetching AI recommendations:", err);
    return { data: { recommendations: [] } };
  }
};
