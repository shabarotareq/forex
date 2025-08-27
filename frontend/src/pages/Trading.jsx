import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function Trading() {
  const chartRef = useRef(null);
  const chartData = useRef({
    labels: [],
    datasets: [
      {
        label: "سعر EUR/USD",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/eurusdt@trade"
    );

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const price = parseFloat(message.p);
      const time = new Date(message.T).toLocaleTimeString();

      if (chartData.current.labels.length >= 20) {
        chartData.current.labels.shift();
        chartData.current.datasets[0].data.shift();
      }

      chartData.current.labels.push(time);
      chartData.current.datasets[0].data.push(price);

      if (chartRef.current) {
        chartRef.current.update();
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">التداول المباشر</h2>
      <Line
        ref={chartRef}
        data={chartData.current}
        options={{ responsive: true }}
      />
    </div>
  );
}

export default Trading;
