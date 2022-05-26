import React from 'react';
import { Button } from 'antd';
import Footer from '../../components/footer/index';
import { Link } from 'react-router-dom';
import './WelcomePage.scss';

const WelcomeView = ({ isLogged, signOutClick }) => {
  return (
    <div className="wrapper">
      <header className="welcome-header">
        <div className="welcome-wrapper">
          {isLogged ? (
            <Link to="/main">
              <Button type="primary" className="btn-go">Go To Main Page</Button>
              <Button type="primary" onClick={signOutClick}>Sign Out</Button>
            </Link>
          ) : (
            <div className="welcome-wrapper">
              <div className="button__log">
                <Link to="/login">
                  <Button type="primary">Sign In </Button>
                </Link>
              </div>
              <div className="button__sign">
                <Link to="/sign-up">
                  <Button type="primary">Sign Up</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="welcome">
        <h1 className="welcome-text">Welcome to the Project Management App</h1>
      </div>
      <Footer />
    </div>
  );
};
export default WelcomeView;
