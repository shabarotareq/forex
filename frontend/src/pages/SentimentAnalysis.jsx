import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";

export default function SentimentAnalysis() {
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/sentiment/EURUSD")
      .then((res) => setSentiment(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            📊 Sentiment Analysis (EUR/USD)
          </h1>

          {!sentiment ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Widget title="Bullish %" value={sentiment.bullish + "%"} />
              <Widget title="Bearish %" value={sentiment.bearish + "%"} />
              <Widget title="Neutral %" value={sentiment.neutral + "%"} />
            </div>
          )}

          {sentiment && (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 border">Source</th>
                  <th className="p-2 border">Sentiment</th>
                  <th className="p-2 border">Score</th>
                </tr>
              </thead>
              <tbody>
                {sentiment.sources?.map((s, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{s.source}</td>
                    <td className="p-2 border">{s.sentiment}</td>
                    <td className="p-2 border">{s.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
