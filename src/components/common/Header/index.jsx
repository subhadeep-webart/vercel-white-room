"use client";

import styles from "./header.module.scss";
import { useState } from "react";
import NavMenu from "../NavMenu";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const toggleNavBar = () => {
    setIsHover(false);
    setIsOpen((prevState) => !prevState);
  }

  const handleMouseEnter = () => {
    if (isOpen) {
      setIsHover(false);
    } else {
      setIsHover(true);
    }
  }

  return (
    <>

      <header className={`${styles.header_container} header_nav`}>
        <div className={styles.nav_hamburger}>
          <button
            type="button"
            className={`${styles.hamburger_button} ${isOpen ? styles.active : ''} ${isHover ? styles.hover_state : ""}`}
            onClick={toggleNavBar}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHover(false)}
          >

            <span className={`font-bold ${isOpen ? "opacity-0 hidden" : "opacity-100"} transition-opacity ease-in-out`}>MENU</span>
            <div className="relative w-6 h-8 ">
              <div
                className={`${styles.nav_menu_hamburger_bar} ${styles.top_bar}`}
              ></div>
              <div
                className={`${styles.nav_menu_hamburger_bar} ${styles.bottom_bar}`}
              ></div>
            </div>
          </button>
        </div>
      </header>
      <NavMenu isOpen={isOpen} toggleNavBar={toggleNavBar} />
    </>

  );
};

export default Header;
