import React from "react";
import Button from '../components/UI/Button/Button';
import Footer from '../components/UI/Footer/Footer';
import { Link } from 'react-router-dom';
import "./WelcomePage.scss";

const WelcomePage = () => {
  const isLoggedIn = false;
  return (
    <div className=" wrapper">
      <header className="welcome-header">
        <div className="welcome-wrapper">
        {isLoggedIn ? <Button className="button-goto">Go To Main Page</Button> :
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
        }
        </div>
      </header>
      <Footer/>
    </div>
  )
}
export default WelcomePage;