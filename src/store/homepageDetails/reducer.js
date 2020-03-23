import { FETCH_HOMEPAGE_DETAILS_SUCCESS } from "./actions";
const initialState = {
  stories: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_HOMEPAGE_DETAILS_SUCCESS:
      console.log({ ...state, ...payload });
      return { ...state, ...payload };

    default:
      return state;
  }
};
