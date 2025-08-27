import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: HomeIcon },
    { name: "Technical Analysis", path: "/technical", icon: ChartBarIcon },
    {
      name: "Fundamental Analysis",
      path: "/fundamental",
      icon: CurrencyDollarIcon,
    },
    { name: "Sentiment Analysis", path: "/sentiment", icon: SparklesIcon },
    { name: "AI Recommendations", path: "/ai", icon: LightBulbIcon },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="text-2xl font-bold p-6 text-blue-600">Forex AI</div>
      <nav className="flex-1 px-2 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
                active
                  ? "bg-blue-200 dark:bg-gray-700 font-bold"
                  : "font-medium"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
