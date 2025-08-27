import React from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Forex AI Dashboard
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
