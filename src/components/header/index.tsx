import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';

import './index.scss';

import { useAppDispatch, useCookiesStorage, useStickyHeader } from '../../hooks';
import ModalCreateTitleAndDescription from '../modal-create-title-and-description';
import { boardsService } from '../../api';
import { createNewBoard, getBoardsAsync } from '../../store';
import { getMessageFromError, openNotification } from '../../helpers';

const { Header: HeaderComponent } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cookies, onLogout } = useCookiesStorage(['authToken', 'authUserId']);

  const { isSticky, headerRef } = useStickyHeader();

  const onCreateBoard = async (values: unknown) => {
    try {
      await boardsService.createBoard(cookies.authToken, values as IBoard);
      dispatch(createNewBoard(values));
      dispatch(getBoardsAsync(cookies.authToken));
      openNotification('success', 'Board successfully created!');
      navigate('/boards');
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  const logout = () => onLogout();

  return (
    <HeaderComponent
      ref={headerRef}
      className={`header ${isSticky ? 'header__sticky' : 'header__not-sticky'}`}
    >
      <div className="header__links">
        <Button type="link">
          <Link to="/edit-profile">Edit profile</Link>
        </Button>
        <Button type="link" onClick={logout}>
          <Link to="/">Sign Out</Link>
        </Button>
        <ModalCreateTitleAndDescription
          onCreate={onCreateBoard}
          title="New board"
          buttonText="Create new board"
          buttonType="link"
        />
        <Button type="link">
          <Link to="/">тогглер / select локализации</Link>
        </Button>
      </div>
    </HeaderComponent>
  );
};

export default Header;
