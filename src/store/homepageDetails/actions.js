import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_HOMEPAGE_DETAILS_SUCCESS = "FETCH_HOMEPAGE_DETAILS_SUCCESS";

export function getHomepageById(id) {
  return async function(dispatch, getState) {
    const response = await axios.get(`${apiUrl}/homepages/${id}`);

    console.log("hi, I am a homepage");
    dispatch({
      type: "FETCH_HOMEPAGE_DETAILS_SUCCESS",
      payload: response.data
    });

    console.log(response.data);
  };
}
