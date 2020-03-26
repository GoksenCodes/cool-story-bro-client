import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";
import { selectUser } from "./selectors";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const HOMEPAGE_UPDATED = "HOMEPAGE_UPDATED";
export const LOG_OUT = "LOG_OUT";
export const STORY_POST_SUCCESS = "STORY_POST_SUCCESS";
export const STORY_DELETE_SUCCESS = "STORY_DELETE_SUCCESS";

const loginSuccess = userWithToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken
  };
};

const tokenStillValid = userWithoutToken => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken
});

export const logOut = () => ({ type: LOG_OUT });

export const homepageUpdated = homepage => ({
  type: HOMEPAGE_UPDATED,
  payload: homepage
});

export const storyPostSuccess = story => ({
  type: STORY_POST_SUCCESS,
  payload: story
});

export const storyDeleteSuccess = storyId => ({
  type: STORY_DELETE_SUCCESS,
  payload: storyId
});

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

//updateMyPage

export const updateMyPage = (title, description, backgroundcolor, color) => {
  return async (dispatch, getState) => {
    const { homepage, token } = selectUser(getState());
    dispatch(appLoading());

    const response = await axios.put(
      `${apiUrl}/homepages/${homepage.id}`, // /homepages/id because in the router it is under homepages route
      {
        title,
        description,
        backgroundcolor,
        color
      },
      {
        // we need to this part every route that requires auth
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // console.log(response);

    dispatch(
      showMessageWithTimeout("success", false, "update successfull", 3000)
    );
    dispatch(homepageUpdated(response.data.homepage)); //desired data from api goes as an argument to the dispacthed action
    dispatch(appDoneLoading());
  };
};

export const postStory = (name, content, imageurl) => {
  return async (dispatch, getState) => {
    const { homepage, token } = selectUser(getState());
    // console.log(name, content, imageUrl);
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/homepages/${homepage.id}/stories`,
        {
          name,
          content,
          imageurl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(storyPostSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log("danger", e.response.data);
      dispatch(showMessageWithTimeout("danger", false, e.response.data, 3000));
      dispatch(appDoneLoading());
    }
  };
};

export const deleteStory = storyId => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { homepage, token } = selectUser(getState());
      const response = await axios.delete(
        `${apiUrl}/homepages/${homepage.id}/stories/${storyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("story deleted?", response.data);
      dispatch(storyDeleteSuccess(storyId));
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch(showMessageWithTimeout("danger", false, e.response.data, 3000));
      dispatch(appDoneLoading());
    }
  };
};
