"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MenuItem, NavItemProps } from "../interfaces";
import ImageFallback from "./ImageFallback";


const Navbar: React.FC<{ menuData: MenuItem[] }> = ({ menuData }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };




  return (
    <>
      <header className="header z-30 sticky top-0">
        <nav className="navbar container">
          <div className="order-0">
            <a className="navbar-brand inline-block" href="/">
              <ImageFallback
                src={"/loo.svg"}
                className="mx-auto"
                width="150"
                height="80"
                alt="banner image"
                priority
              />
            </a>
          </div>

          <input
            id="drawer-toggle"
            type="checkbox"
            className="hidden"
            checked={isDrawerOpen}
            onChange={toggleDrawer}
          />
          <label
            htmlFor="drawer-toggle"
            className="order-2 mr-4 md:order-2 ml-auto flex cursor-pointer items-center text-dark lg:order-1 lg:hidden"
          >
            <svg className="h-5 fill-current" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
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
      </header> {/* Drawer Component */}
      <div
        id="drawer-example"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} bg-white w-80 `}
        aria-labelledby="drawer-label"
      >

        <div className="order-0 ">
          <a className="navbar-brand inline-block" href="/">
            <ImageFallback
              src={"/loo.svg"}
              className="mx-auto"
              width="150"
              height="80"
              alt="banner image"
              priority
            />
          </a>
        </div>
        <br /><br />
        <ul className="navbar-nav text-left order-3 w-full lg:order-1 lg:flex lg:w-auto">
          {menuData.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isActive={activeItem === index}
              onItemClick={() => handleItemClick(index)}
            />
          ))}
        </ul>{" "}

      </div>
    </>
  );
};
const NavItem: React.FC<NavItemProps> = ({ item, isActive, onItemClick }) => {
  return (
    <li
      className={`nav-item nav-dropdown relative group ${isActive ? "active" : ""}`}
    >
      {item.dropdown ? (
        <a href={item.url}>
          <div
            className={`nav-link inline-flex items-center ${isActive ? "active" : ""}`}
            onClick={onItemClick}
          >
            <span>{item.label}</span>
            <svg className="ml-1 h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>

        </a>
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
