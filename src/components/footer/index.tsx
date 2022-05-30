import { Layout, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import rsSchool from '../../assets/svg/rss.svg';

import './index.scss';

const { Footer: FooterComponent } = Layout;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterComponent className="footer">
      <div className="footer__authors">
        <Button type="link">
          <a href="https://github.com/goldyukol" target="_blank" rel="noreferrer">
            {t('yuryKalenkou')}
          </a>
        </Button>
        <Button type="link">
          <a href="https://github.com/ksy336" target="_blank" rel="noreferrer">
            {t('kseniyaKlimova')}
          </a>
        </Button>
        <Button type="link">
          <a href="https://github.com/halaveika" target="_blank" rel="noreferrer">
            {t('aliaksandrHalaveika')}
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
};

export default Footer;
