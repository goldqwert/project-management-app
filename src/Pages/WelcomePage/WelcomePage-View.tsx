import React from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/index';
import { Link } from 'react-router-dom';
import './WelcomePage.scss';

const WelcomeView = ({ isLogged }) => {
  return (
    <div className="wrapper">
      <header className="welcome-header">
        <div className="welcome-wrapper">
          {isLogged ? (
            <Link to="/main">
              <Button className="button-goto">Go To Main Page</Button>
            </Link>
          ) : (
            <div className="welcome-wrapper">
              <div className="button__log">
                <Link to="/login">
                  <Button className="button-login">Sign In </Button>
                </Link>
              </div>
              <div className="button__sign">
                <Link to="/sign-up">
                  <Button className="button-signup">Sign Up</Button>
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
