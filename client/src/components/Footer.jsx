import React from "react";
import LOGO from "../img/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <img src={LOGO} alt=""></img>
      <Link to="/About" className="about">
        About Section
      </Link>
    </footer>
  );
};

export default Footer;
