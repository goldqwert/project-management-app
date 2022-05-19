import axios from 'axios';
import { showError } from '../slices/signUp-slice';
import { getUserData } from '../slices/signUp-slice';
import { setCookie } from 'typescript-cookie';
export let savedData;

export const sendingFormSignUp = (signUpData) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const sendRequest = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'JWT token',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.post(
        'https://thawing-anchorage-15805.herokuapp.com/signup',
        signUpData,
        options
      );

      console.log(response, signUpData);
      if (!response) {
        throw new Error(`${response.data}`);
      }
      // data хранит {id, login, name}
      const data = await response.data;
      savedData = setCookie('id', data.id, { expires: 1 });
      return data;
    };
    try {
      const allData = await sendRequest();
      dispatch(getUserData(allData));
    } catch (error) {
      dispatch(showError('Something went wrong!'));
    }
  };
};
