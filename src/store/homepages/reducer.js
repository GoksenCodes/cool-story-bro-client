import { FETCH_HOMEPAGES_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOMEPAGES_SUCCESS:
      return [...action.payload];

    default:
      return state;
  }
};
