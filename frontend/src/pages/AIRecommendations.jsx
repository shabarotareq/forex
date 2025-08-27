import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/ai/recommendations")
      .then((res) => setRecommendations(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">🤖 AI Recommendations</h1>

          {!recommendations ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Widget title="EUR/USD" value={recommendations.EURUSD} />
              <Widget title="USD/JPY" value={recommendations.USDJPY} />
              <Widget title="GBP/USD" value={recommendations.GBPUSD} />
            </div>
          )}

          {recommendations && (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 border">Pair</th>
                  <th className="p-2 border">Recommendation</th>
                  <th className="p-2 border">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(recommendations.details || {}).map(
                  ([pair, rec], idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">{pair}</td>
                      <td className="p-2 border">{rec.recommendation}</td>
                      <td className="p-2 border">{rec.confidence}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
