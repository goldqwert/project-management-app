import { Layout, Button } from 'antd';

import rsSchool from '../../assets/svg/rss.svg';

import './index.scss';

const { Footer: FooterComponent } = Layout;

const Footer = () => (
  <FooterComponent className="footer">
    <div className="footer__authors">
      <Button type="link">
        <a href="https://github.com/goldyukol" target="_blank" rel="noreferrer">
          Yury Kalenkou
        </a>
      </Button>
      <Button type="link">
        <a href="https://github.com/ksy336" target="_blank" rel="noreferrer">
          Kseniya Klimova
        </a>
      </Button>
      <Button type="link">
        <a href="https://github.com/halaveika" target="_blank" rel="noreferrer">
          Aliaksandr Halaveika
        </a>
      </Button>
    </div>
    <span>{new Date().getFullYear()}</span>
    <a
      className="footer__rsschool"
      href="https://rs.school/react/"
      target="_blank"
      rel="noreferrer"
    >
      <img src={rsSchool} alt="rsschool" />
    </a>
  </FooterComponent>
);

export default Footer;
