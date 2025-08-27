// src/pages/Home.jsx
import React from "react";
import ForexPrices from "../components/ForexPrices";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">الصفحة الرئيسية</h1>
      <ForexPrices />
    </div>
  );
}
