import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import './index.scss';

import { useAppDispatch } from '../../hooks';
import { logout } from '../../store';

const { Header: HeaderComponent } = Layout;

const Header = () => {
  const dispatch = useAppDispatch();
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => setSticky(window.pageYOffset !== 0);

  const onLogout = () => dispatch(logout());

  return (
    <HeaderComponent
      ref={headerRef}
      className={`header ${sticky ? 'header__sticky' : 'header__not-sticky'}`}
    >
      <div className="header__links">
        <Button type="link">
          <Link to="/">Edit profile</Link>
        </Button>
        <Button type="link" onClick={onLogout}>
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
