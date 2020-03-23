const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HOMEPAGE_DETAILS_SUCCESS":
      return action.payload; //returns directly the selected homepage, no need for ... it would cause duplication

    default:
      return state;
  }
};
