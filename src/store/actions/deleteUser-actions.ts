import axios from "axios";
import { showError } from '../slices/deleteUser-slice';
import { getTokenFromCookie } from '../../common/helper';
import {deleteUser} from "../slices/deleteUser-slice";

export const deleteUserProfile = (userId) => {
  return async (dispatch) => {
    dispatch(showError(null));
    const deleteDataUser = async () => {
      const options = {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getTokenFromCookie()}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.delete(`https://fathomless-savannah-49484.herokuapp.com/users/${userId}`, options);
      console.log(response);
      if (!response) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;
      return data;
    }
    try {
      await deleteDataUser();
    } catch (error) {
      dispatch(showError("Something went wrong!"));
    }
  }
}
