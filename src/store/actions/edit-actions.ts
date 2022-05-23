import axios from "axios";
import {showError} from "../slices/edit-slice";

export const editProfileData = (editData, userId) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const sendEditData = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'JWT token',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.put(`https://fathomless-savannah-49484.herokuapp.com/users/${userId}`, editData, options);
      if (!response) {
        throw new Error("Something went wrong!");
      }
      const data = response.data;
      return data;
    };
    try {
      await sendEditData();
    } catch (e) {
      dispatch(showError("Something went wrong!"));
    }
  }
};