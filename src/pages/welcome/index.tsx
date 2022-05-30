import { Layout, Carousel, List, Avatar, Descriptions, Button, Divider } from 'antd';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SwitchLang } from '../../components';

import { DEVELOPERS_DATA } from '../../constants';

import './index.scss';

const { Content } = Layout;

const WelcomePage = () => {
  const { t } = useTranslation();
  const [cookies] = useCookies(['authToken']);

  return (
    <>
      <Content className={cookies.authToken ? 'welcome welcome__with-header' : 'welcome'}>
        <div className="welcome__content">
          <div className="welcome__auth">
            {cookies.authToken ? (
              <Button type="primary">
                <Link to="/boards">{t('goToMainPage')}</Link>
              </Button>
            ) : (
              <div className="welcome__btns">
                <Button type="primary">
                  <Link to="/sign-in">{t('signIn')}</Link>
                </Button>
                <Button type="primary">
                  <Link to="/sign-up">{t('signUp')}</Link>
                </Button>
                <SwitchLang />
              </div>
            )}
          </div>

          <Divider />

          <Carousel>
            <div className="welcome__slide">
              <h3 className="welcome__title">{t('project')}</h3>
            </div>
            <div className="welcome__slide">
              <h3 className="welcome__title">{t('project')}</h3>
            </div>
            <div className="welcome__slide">
              <h3 className="welcome__title">{t('project')}</h3>
            </div>
          </Carousel>

          <Divider />

          <Descriptions title={t('projectAndCourse')}>
            <Descriptions.Item label={t('projectLabel')}>{t('project')}</Descriptions.Item>
            <Descriptions.Item label={t('info')}>{t('appHelps')}</Descriptions.Item>
            <Descriptions.Item label={t('stack')}>
              React, Redux, Typescript {t('andOtherLibs')}
            </Descriptions.Item>
            <Descriptions.Item label={t('projectLabel')}>
              Rolling Scopes School React
            </Descriptions.Item>
            <Button type="link">
              <a
                className="footer__rsschool"
                href="https://rs.school/react/"
                target="_blank"
                rel="noreferrer"
              >
                {t('linkToCourse')}
              </a>
            </Button>
          </Descriptions>

          <Divider />

          <List
            itemLayout="horizontal"
            header={<h3>{t('team')}</h3>}
            bordered
            dataSource={DEVELOPERS_DATA}
            renderItem={({ name, github, avatar }, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={avatar} />}
                  title={
                    <a href={github} target="_blank" rel="noreferrer">
                      {name}
                    </a>
                  }
                  description={index === 0 ? t('teamLead') : t('developer')}
                />
              </List.Item>
            )}
          />
        </div>
      </Content>
    </>
  );
};

export default WelcomePage;
