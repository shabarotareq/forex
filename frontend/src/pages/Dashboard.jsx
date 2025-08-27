import React, { useEffect, useState } from "react";
import Widget from "../components/Widget";
import Chart from "../components/Chart";
import { fetchTechnicalIndicators } from "../services/api";

const Dashboard = () => {
  const [sma, setSMA] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTechnicalIndicators("EURUSD")
      .then((res) => {
        const indicators = res.data.indicators;
        if (indicators.SMA && indicators.SMA.length > 0) {
          setSMA(indicators.SMA[indicators.SMA.length - 1].toFixed(2));
        }

        const prices = res.data.prices || [];
        const formatted = prices.map((item, idx) => ({
          name: `T${idx + 1}`,
          value: item,
        }));
        setChartData(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      <Widget title="Latest SMA" value={sma} />
      <Widget title="Open Trades" value="5" />
      <Widget title="Pending Alerts" value="2" />
      <Widget title="AI Recommendation" value="BUY" />
      <Chart title="Price Chart" data={chartData} />
    </div>
  );
};

export default Dashboard;
