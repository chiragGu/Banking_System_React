import type from "../type";

const INIT_STATE = {
  current_user: false
};

const UserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case type.SET_CURRENT_USER:
      return { ...state, current_user: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
