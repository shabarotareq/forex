import React, { useEffect, useState } from "react";

export default function ForexPrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/eurusdt@trade"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.data?.s && data?.data?.p) {
        const symbol = data.data.s;
        const price = parseFloat(data.data.p).toFixed(2);
        setPrices((prev) => ({ ...prev, [symbol]: price }));
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-2xl mt-4">
      <h2 className="text-xl font-bold mb-3">أسعار العملات اللحظية</h2>
      <ul className="space-y-2">
        {Object.keys(prices).map((symbol) => (
          <li
            key={symbol}
            className="flex justify-between p-2 bg-gray-100 rounded-lg"
          >
            <span>{symbol}</span>
            <span className="text-green-600 font-semibold">
              {prices[symbol]} $
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
