"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import CheckPan from "./CheckPan";
import { MenuItem, NavItemProps } from "../interfaces";




const Navbar: React.FC<{ menuData: MenuItem[] }> = ({ menuData }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const setActiveFromPath = () => {
    const index = menuData.findIndex(item => {
      if (item.url === pathname) {
        return true;
      }
      if (item.dropdownItems) {
        return item.dropdownItems.some(dropdownItem => dropdownItem.url === pathname);
      }
      return false;
    });
    setActiveItem(index);
  };


  useState(() => {
    setActiveFromPath();
  });

  const handleItemClick = (index: number) => {
    setActiveItem(index === activeItem ? null : index);
  };

  return (
    <header className="header z-30 sticky top-0">
      <nav className="navbar container">
        <div className="order-0">
          <a className="navbar-brand inline-block" href="/">
            <img
              alt="IpoTech Logo"
              width="360"
              height="78"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent", height: "39px", width: "180px" }}
              src="/logo.png"
            />
          </a>
        </div>
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          id="show-button"
          htmlFor="nav-toggle"
          className="order-2 mr-4 md:order-2 ml-auto flex cursor-pointer items-center text-dark  lg:order-1 lg:hidden"
        >
          <svg className="h-5 fill-current" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
        </label>
        <label
          id="hide-button"
          htmlFor="nav-toggle"
          className="order-1 ml-auto hidden cursor-pointer items-center text-dark  lg:order-1 mr-4"
        >
          <svg className="h-5 fill-current" viewBox="0 0 20 20">
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        <ul
          id="nav-menu"
          className="navbar-nav order-3 w-full lg:order-1 lg:flex lg:w-auto"
        >
          {menuData.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isActive={activeItem === index}
              onItemClick={() => handleItemClick(index)}
            />
          ))}
        </ul>{" "}
        <div className="order-2 flex items-center md:order-2 lg:ml-0">
          <div className="theme-switcher mr-3 lg:ml-5"></div>
        </div>
      </nav>
    </header>
  );
};

const NavItem: React.FC<NavItemProps> = ({ item, isActive, onItemClick }) => {
  return (
    <li
      className={`nav-item nav-dropdown relative group ${isActive ? "active" : ""}`}
    >
      {item.dropdown ? (
        <div
          className={`nav-link inline-flex items-center ${isActive ? "active" : ""}`}
          onClick={onItemClick}
        >
          <span>{item.label}</span>
          <svg className="ml-1 h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
          </svg>
        </div>
      ) : (
        <div className={`nav-link inline-flex items-center ${isActive ? "active" : ""}`}>
          <a href={item.url}>
            <span>{item.label}</span>
          </a>
        </div>
      )}
      {item.dropdown && (
        <ul className={`nav-dropdown-list ${isActive ? "active" : ""}`}>
          {item.dropdownItems?.map((dropdownItem, index) => (
            <li key={index} className="nav-dropdown-item">
              <a className="nav-dropdown-link" href={dropdownItem.url}>
                <span className="text-[15px]">{dropdownItem.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Navbar;
