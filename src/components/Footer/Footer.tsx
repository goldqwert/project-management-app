import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper footer-content">
        <div className="link">
          Development:
          <a href="https://github.com/ksy336" target="_blank" rel="noreferrer">
            Kseniya Klimova
          </a>
          <a href="https://github.com/goldyukol" target="_blank" rel="noreferrer">
            Yury Kalenkou
          </a>
          <a href="https://github.com/halaveika" target="_blank" rel="noreferrer">
            Aliaksandr Halaveika
          </a>
        </div>
        <div>
          <p>2022</p>
        </div>
        <div className="logo">
          <a href="https://rs.school/index.html" target="_blank" rel="noreferrer">
            <img src={require('../../../public/rs_school.svg')} alt="logo" width="80px" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
