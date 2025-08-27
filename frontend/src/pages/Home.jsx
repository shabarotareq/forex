import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [technical, setTechnical] = useState(null);

  // جلب رسالة الترحيب من Backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  // جلب بيانات المؤشرات الفنية لليورو دولار
  const fetchTechnical = () => {
    axios
      .get("http://127.0.0.1:8000/api/technical/EURUSD")
      .then((res) => setTechnical(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🚀 Forex AI Dashboard</h1>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold">Backend Status:</h2>
          <p>{message || "Connecting..."}</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={fetchTechnical}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Technical Indicators (EUR/USD)
          </button>
        </div>

        {technical && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Technical Analysis</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2 border">Indicator</th>
                  <th className="p-2 border">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(technical.indicators).map(([key, value]) => (
                  <tr key={key}>
                    <td className="p-2 border">{key}</td>
                    <td className="p-2 border">
                      {Array.isArray(value)
                        ? value[value.length - 1].toFixed(2)
                        : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
