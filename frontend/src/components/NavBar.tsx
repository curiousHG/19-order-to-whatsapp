// bottom navbar component
import React from "react";
import cart from "../assets/cart.svg";

export const NavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 text-white flex justify-around p-4 w-full h-1/12">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <a>
      <img src={cart} alt="Cart" className="h-5 w-5" />
      Inbox
      <span className="badge badge-xs">99+</span>
    </a>
  </li>
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Updates
      <span className="badge badge-xs badge-warning">NEW</span>
    </a>
  </li>
  <li>
    <a>
      Stats
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
    </nav>
  );
};
