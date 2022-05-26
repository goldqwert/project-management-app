import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from 'typescript-cookie';
import WelcomeView from './WelcomePage-View';

const WelcomeContainer = () => {
  const navigate = useNavigate();
  const signOutClick = () => {
    removeCookie('jwt');
    removeCookie('id');
    navigate('/');
  };
  let isLogged;
  getCookie('jwt') ? (isLogged = true) : (isLogged = false);
  // getCookie(savedData)? isLogged = true : isLogged = false;
  return <WelcomeView signOutClick={signOutClick} isLogged={isLogged} />;
};
export default WelcomeContainer;
