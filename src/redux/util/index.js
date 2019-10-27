import type from "../type";

const INIT_STATE = {
  message: false,
  isLoading: false
};

const UtilReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case type.ERROR:
      return { ...state, message: action.payload };
    case type.IS_LOADING: {
      return { ...state, isLoading: !state.isLoading };
    }
    default:
      return state;
  }
};

export default UtilReducer;
