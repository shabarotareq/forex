import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TechnicalAnalysis from "./pages/TechnicalAnalysis";
import FundamentalAnalysis from "./pages/FundamentalAnalysis";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import AIRecommendations from "./pages/AIRecommendations";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/technical" element={<TechnicalAnalysis />} />
                <Route path="/fundamental" element={<FundamentalAnalysis />} />
                <Route path="/sentiment" element={<SentimentAnalysis />} />
                <Route path="/ai" element={<AIRecommendations />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}
