// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/">Map View</Link>
          </li>
          <li>
            <Link to="/compatibilityPage">Compatibility Page</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
