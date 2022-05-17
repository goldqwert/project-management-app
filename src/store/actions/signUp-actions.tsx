import axios from 'axios';
import {showError} from "../slices/signUp-slice";
import {getUserData} from "../slices/signUp-slice";

export const sendingFormSignUp = (signUpData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT token',
          "Access-Control-Allow-Origin": "*",
        }
      }
      const response = await axios.post("https://thawing-anchorage-15805.herokuapp.com/signup", signUpData, options)

      console.log(response, signUpData);
      if (!response) {
        throw new Error(`${response.data}`);
      }
      // data хранит {id, login, name}
      const data = await response.data;
      console.log(data);
      return data;
    }
    try {
      const allData = await sendRequest();
      dispatch(getUserData(allData));
    } catch(error) {
      dispatch(showError("User login already exists!"));
    }
  }
};
