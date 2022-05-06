import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="py-3 px-4">
      <div className="w-full text-xl">
        <Link className="navbar-brand" to="/">
          <div>
            <span className="text-white h3">Periodic Tables</span>
          </div>
        </Link>
        <ul className="text-light">
          <li className="hover:bg-gray-700 px-2 rounded-xl">
            <Link
              className="block hover:text-teal-500 hover:no-underline py-2 transition duration-200"
              to="/dashboard"
            >
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="hover:bg-gray-700 px-2 rounded-xl">
            <Link
              class="no-underline block hover:text-teal-500 hover:no-underline py-2 transition duration-200"
              to="/search"
            >
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="hover:bg-gray-700 px-2 rounded-xl">
            <Link
              className="no-underline block hover:text-teal-500 hover:no-underline py-2 transition duration-200"
              to="/reservations/new"
            >
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="hover:bg-gray-700 px-2 rounded-xl">
            <Link
              className="no-underline block hover:text-teal-500 hover:no-underline py-2 transition duration-200"
              to="/tables/new"
            >
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
