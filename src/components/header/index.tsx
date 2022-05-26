import React, { useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Switch, Layout, Menu } from 'antd';

import Modal from '../Modal/Modal';
import { removeCookie } from 'typescript-cookie';
import { dispatchStore } from '../../types/types';
import { clearUserData } from '../../store/slices/logout-slice';
const { Header } = Layout;

import './index.scss';

const HeaderMenu = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const handleLanguage = (checked: boolean) => i18n.changeLanguage(checked ? 'ru' : 'en');

  const signOutClick = () => {
    setShowModal(true);
  };

  const createBoardClick = () => {};

  const logoutHandler = () => {
    dispatchStore(clearUserData());
    removeCookie('id');
    removeCookie('jwt');
    navigate('/');
  };

  const modalHandler = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <Modal
          title={'Do You want to Sign Out?'}
          onConfirm={modalHandler}
          onSubmit={logoutHandler}
          onCancel={modalHandler}
        />
      )}
      <Layout>
        <Header style={{ position: 'sticky', zIndex: 1, width: '100%', background: 'white' }}>
          <Menu theme="light" mode="horizontal">
            <Menu.Item key="profile">
              <Link to="/edit">{t('editProfile')}</Link>
            </Menu.Item>
            <Menu.Item key="out" onClick={signOutClick}>
              {t('signOut')}
            </Menu.Item>
            <Menu.Item key="board" onClick={createBoardClick}>
              {t('createNewBoard')}
            </Menu.Item>
            <Menu.Item key="switch">
              <Switch
                className="header__switch-language"
                checkedChildren="ru"
                unCheckedChildren="en"
                onChange={handleLanguage}
              />
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  );
};
export default HeaderMenu;
