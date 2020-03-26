import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  STORY_POST_SUCCESS,
  HOMEPAGE_UPDATED,
  STORY_DELETE_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case STORY_POST_SUCCESS:
      // console.log("-------------", action.payload);
      // console.log("-------------", state);
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: [...state.homepage.stories, action.payload]
        }
      };
    case HOMEPAGE_UPDATED:
      console.log("STATE", state);
      console.log("ACTIONPAYLOAD", action.payload);
      // The goal is to combine current state with whatever data that action changes.
      return {
        ...state, //we create a new object with the keys of the current state
        // ,homepage by this we redefine the homepage key
        // homepage: {...action.payload, stories: state.homepage.stories }
        homepage: { ...state.homepage, ...action.payload }
      };

    case STORY_DELETE_SUCCESS:
      const storyId = action.payload;
      const newStories = state.homepage.stories.filter(
        story => story.id !== storyId
      );
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: newStories
        }
      };

    default:
      return state;
  }
};

/*
const state = {1,2,3,4,5,homepage}  
const spread = ...state // it creates a new instance of the state, does not change the original state

{ /// INITIAL STATE
  "1": "a",
  "2": "b",
  "homepage": {
    "3": "c",
    "4": "d",
    "5": "e",
    "6": "f",
  }
}
// PAYLOAD
"homepage": {
  "3" : "ccc",
  "4" : "ddd"
  "stories" : 123
}




{ 
  "1": "a",
  "2": "b",
  "homepage": {
    "homepage": { // this is what happens if you dont spread action.payload
      "3": "ccc",
      "4": "ddd",
    }
    "3": "c",
    "4": "d",
    "5": "e",
    "6": "f",
  }
}
// you redefine the homepage key after the spread 
{
  "1": "a",
  "2": "b",
  "homepage": {
    "3" : "ccc",
    "4" : "ddd"
  }
}

state: { 
  "1": "a",
  "2": "b",
  "homepage": {
    "3": "c",
    "4": "d",
    "5": "e",
    "6": "f",
  }
}

*/
