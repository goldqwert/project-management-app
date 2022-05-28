import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import './index.scss';

import { useCookiesStorage, useStickyHeader } from '../../hooks';

const { Header: HeaderComponent } = Layout;

const Header = () => {
  const { onLogout } = useCookiesStorage(['authToken', 'authUserId']);

  const { isSticky, headerRef } = useStickyHeader();

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
        <Button type="link">
          <Link to="/">Create new board</Link>
        </Button>
        <Button type="link">
          <Link to="/">тогглер / select локализации</Link>
        </Button>
      </div>
    </HeaderComponent>
  );
};

export default Header;
