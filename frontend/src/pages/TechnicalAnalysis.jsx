import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TechnicalAnalysis() {
  const [indicators, setIndicators] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/technical/EURUSD")
      .then((res) => setIndicators(res.data.indicators))
      .catch((err) => console.error(err));
  }, []);

  // تجهيز البيانات للـ Chart
  const chartData =
    indicators?.Close?.map((close, idx) => ({
      name: `T${idx + 1}`,
      Close: close,
      SMA: indicators.SMA[idx],
      EMA: indicators.EMA[idx],
      RSI: indicators.RSI[idx],
      MACD: indicators.MACD[idx],
      MACD_signal: indicators.MACD_signal[idx],
    })) || [];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 grid grid-cols-4 gap-6">
          <Widget
            title="Latest SMA"
            value={indicators?.SMA?.at(-1)?.toFixed(4)}
          />
          <Widget
            title="Latest EMA"
            value={indicators?.EMA?.at(-1)?.toFixed(4)}
          />
          <Widget
            title="Latest RSI"
            value={indicators?.RSI?.at(-1)?.toFixed(2)}
          />
          <Widget
            title="Latest MACD"
            value={indicators?.MACD?.at(-1)?.toFixed(4)}
          />
          <Widget
            title="MACD Signal"
            value={indicators?.MACD_signal?.at(-1)?.toFixed(4)}
          />
          <Widget title="Latest Close" value={indicators?.Close?.at(-1)} />
        </div>

        <div className="p-6 bg-white dark:bg-gray-700 rounded shadow mt-6">
          <h2 className="text-xl font-bold mb-4">EUR/USD Technical Chart</h2>
          {!chartData.length ? (
            <p>Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Close"
                  stroke="#3B82F6"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="SMA"
                  stroke="#10B981"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="EMA"
                  stroke="#F59E0B"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="RSI"
                  stroke="#EF4444"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="MACD"
                  stroke="#8B5CF6"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="MACD_signal"
                  stroke="#EC4899"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
