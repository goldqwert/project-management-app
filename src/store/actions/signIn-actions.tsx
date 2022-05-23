import axios from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';
import { setIsAuth, getToken, showError } from '../slices/signin-slice';

export const sendingSignInData = (signInData) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const sendRequestSignIn = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'JWT token',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.post(
        'https://fathomless-savannah-49484.herokuapp.com/signin',
        signInData,
        options
      );
      if (!response) {
        throw new Error(response.data?.message);
      }

      const token = response.data.token;
      setCookie('jwt', token, { expires: 1 });
      dispatch(setIsAuth(true));
      dispatch(getToken(getCookie('jwt')));
      return token;
    };
    try {
      await sendRequestSignIn();
    } catch (error) {
      dispatch(showError('Something went wrong!'));
    }
  };
};
