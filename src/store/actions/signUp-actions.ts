import axios from 'axios';
import { showError } from '../slices/signUp-slice';
import { getUserData } from '../slices/signUp-slice';
import { setCookie } from 'typescript-cookie';
// export let savedData;

export const sendingFormSignUp = (signUpData: unknown) => {
  return async (dispatch: AppDispatch) => {
    dispatch(showError(null));
    const sendRequest = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.post(
        'https://fathomless-savannah-49484.herokuapp.com/signup',
        signUpData,
        options
      );

      if (!response) {
        // throw new Error(`${response.data.message}`);
      }
      // data хранит {id, login, name}
      const data = await response.data;
      // savedData = setCookie('id', data.id, { expires: 1 });
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
