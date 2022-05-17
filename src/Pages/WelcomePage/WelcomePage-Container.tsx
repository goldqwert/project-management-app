import React from 'react';
import WelcomeView from './WelcomePage-View';

const WelcomeContainer = () => {
  const isLoggedIn = false;
  return <WelcomeView isLoggedIn={isLoggedIn} />
}
export default WelcomeContainer;