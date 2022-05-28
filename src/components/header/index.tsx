import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import './index.scss';

import { useCookiesStorage } from '../../hooks';

const { Header: HeaderComponent } = Layout;

const Header = () => {
  const { onLogout } = useCookiesStorage(['authToken', 'authUserId']);

  // TODO convert logic of sticky to custom hook
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => setSticky(window.pageYOffset !== 0);

  const logout = () => onLogout();

  return (
    <HeaderComponent
      ref={headerRef}
      className={`header ${sticky ? 'header__sticky' : 'header__not-sticky'}`}
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
