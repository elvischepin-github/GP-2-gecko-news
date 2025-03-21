import "./navBarContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";

function NavBarContainer() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      <motion.div
        className="logo"
        initial={{ opacity: 0, y: -165 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <img src="../src/assets/cn.png" alt="logo" id="logo" />
      </motion.div>
      <motion.div
        className="name"
        initial={{ opacity: 0, y: -165 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <p id="name">Gecko&News</p>
      </motion.div>
      <div className="tabs">
        <motion.a
          href="#about-us"
          className="links"
          initial={{ opacity: 0, y: -165 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
        >
          <a href="#about-us" className="links" data-nav>
            About Us
          </a>
        </motion.a>
        <motion.a
          href="#news"
          className="links"
          initial={{ opacity: 0, y: -165 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.9 }}
        >
          <a href="#news" className="links" data-nav>
            News
          </a>
        </motion.a>
        <motion.a
          href="#crypto"
          className="links"
          initial={{ opacity: 0, y: -165 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          <a href="#crypto" className="links" data-nav>
            Crypto
          </a>
        </motion.a>
        <motion.a
          href="#top"
          className="links"
          initial={{ opacity: 0, y: -165 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <a href="#top" className="links" data-nav>
            Top
          </a>
        </motion.a>
      </div>
      <motion.div
        className="icon-container"
        initial={{ opacity: 0, y: -165 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.8 }}
      >
        <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleMenu} />
      </motion.div>

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <a href="#about-us" className="mobile-link">
          About Us
        </a>
        <a href="#news" className="mobile-link">
          News
        </a>
        <a href="#crypto" className="mobile-link">
          Crypto
        </a>
        <a href="#top" className="mobile-link">
          Top
        </a>
      </div>
    </div>
  );
}

export default NavBarContainer;
