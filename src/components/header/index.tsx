import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import './index.scss';

import { useAppDispatch, useCookiesStorage, useStickyHeader } from '../../hooks';
import ModalCreateTitleAndDescription from '../modal-create-title-and-description';
import { boardsService } from '../../api';
import { createNewBoard, getBoardsAsync } from '../../store';
import { getMessageFromError, openNotification } from '../../helpers';
import SwitchLang from '../switch-lang';

const { Header: HeaderComponent } = Layout;

const Header = () => {
  const userToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { cookies, onLogout } = useCookiesStorage(['authToken', 'authUserId']);

  const { isSticky, headerRef } = useStickyHeader();

  const onCreateBoard = async (values: unknown) => {
    try {
      await boardsService.createBoard(cookies.authToken, values as IBoard);
      dispatch(createNewBoard(values));
      dispatch(getBoardsAsync(cookies.authToken));
      openNotification('success', t('boardSuccess'));
      navigate('/boards');
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  const logout = () => onLogout();

  return (
    <>
      {userToken && userId ? (
        <HeaderComponent
          ref={headerRef}
          className={`header ${isSticky ? 'header__sticky' : 'header__not-sticky'}`}
        >
          <div className="header__links">
            <Button type="link">
              <Link to="/edit-profile">{t('editProfile')}</Link>
            </Button>
            <Button type="link" onClick={logout}>
              <Link to="/">{t('signOut')}</Link>
            </Button>
            <ModalCreateTitleAndDescription
              onCreate={onCreateBoard}
              title={t('createNewBoard')}
              buttonText={t('createNewBoard')}
              buttonType="link"
            />
            <SwitchLang />
          </div>
        </HeaderComponent>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
