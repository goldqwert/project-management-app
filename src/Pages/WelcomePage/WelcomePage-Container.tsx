import React from 'react';
import WelcomeView from './WelcomePage-View';
import { getCookie } from 'typescript-cookie';

const WelcomeContainer = () => {
  let isLogged;
  getCookie('jwt') ? (isLogged = true) : (isLogged = false);
  //getCookie(savedData)? isLogged = true : isLogged = false;
  return <WelcomeView isLogged={isLogged} />;
};
export default WelcomeContainer;
