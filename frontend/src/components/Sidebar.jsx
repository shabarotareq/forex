import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul>
          <li>
            <Link to="/">لوحة التحكم</Link>
          </li>
          <li>
            <Link to="/trading">التداول</Link>
          </li>
          <li>
            <Link to="/analysis">التحليل</Link>
          </li>
          <li>
            <Link to="/portfolio">المحفظة</Link>
          </li>
          <li>
            <Link to="/settings">الإعدادات</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
