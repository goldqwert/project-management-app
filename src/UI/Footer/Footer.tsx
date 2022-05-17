import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="wrapper footer-content">
          <div className="link">
            Development:
            <a href="https://github.com/ksy336" target="_blank">Kseniya Klimova</a>
          </div>
            <div>
              <p>2022</p>
            </div>
          <div className="logo">
            <a href="https://rs.school/index.html" target="_blank">
              <img src={require('../../../../public/rs_school.svg')} alt="logo" width="80px" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer;