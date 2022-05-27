import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import './index.scss';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';

const { Header: HeaderComponent } = Layout;

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => setSticky(window.pageYOffset !== 0);

  return (
    <HeaderComponent
      ref={headerRef}
      className={`header ${sticky ? 'header__sticky' : 'header__not-sticky'}`}
    >
      <ErrorBoundary></ErrorBoundary>
      <div className="header__links">
        <Button type="link">
          <Link to="/">Sign In</Link>
        </Button>
        <Button type="link">
          <Link to="/">Sign Up</Link>
        </Button>
      </div>
    </HeaderComponent>
  );
};

export default Header;
