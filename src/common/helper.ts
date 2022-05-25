//TO DO FUNCTION getTokenFromCookie
import { getCookie } from 'typescript-cookie';

export const getTokenFromCookie = () => {
  return getCookie("jwt");
};