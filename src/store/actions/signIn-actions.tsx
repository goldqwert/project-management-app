import axios from 'axios';
import { showError } from '../slices/signUp-slice';

export const sendingSignInData = (signInData) => {
  return async (dispatch) => {
    const sendRequestSignIn = async () => {
      console.log('EXECUTION');

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'JWT token',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.post(
        'https://thawing-anchorage-15805.herokuapp.com/signin',
        signInData,
        options
      );
      if (!response) {
        throw new Error(response.data?.message);
      }

      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      console.log(response, signInData, token);
      return token;
    };
    try {
      await sendRequestSignIn();
    } catch (error) {
      dispatch(showError('Something went wrong!'));
    }
  };
};
