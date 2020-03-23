import { FETCH_HOMEPAGES_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOMEPAGES_SUCCESS:
      return [...action.payload]; //in order to not have duplications we don't return ...state

    default:
      return state;
  }
};
