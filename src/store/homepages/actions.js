import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_HOMEPAGES_SUCCESS = "FETCH_HOMEPAGES_SUCCESS";

export const getHomepagesThunk = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/homepages`);
    console.log(response.data);
    dispatch({ type: "FETCH_HOMEPAGES_SUCCESS", payload: response.data });
  };
};
