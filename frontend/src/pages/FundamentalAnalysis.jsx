import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";

export default function FundamentalAnalysis() {
  const [fundamentals, setFundamentals] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/fundamentals")
      .then((res) => setFundamentals(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">📈 Fundamental Analysis</h1>

          {!fundamentals ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Widget title="GDP Growth" value={fundamentals.GDP || "-"} />
              <Widget title="Inflation" value={fundamentals.Inflation || "-"} />
              <Widget
                title="Unemployment"
                value={fundamentals.Unemployment || "-"}
              />
              <Widget
                title="Interest Rate"
                value={fundamentals.InterestRate || "-"}
              />
            </div>
          )}

          {fundamentals && (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 border">Indicator</th>
                  <th className="p-2 border">Value</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {fundamentals.history?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{item.indicator}</td>
                    <td className="p-2 border">{item.value}</td>
                    <td className="p-2 border">{item.date}</td>
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
