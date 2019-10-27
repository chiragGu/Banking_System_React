import type from "../type";

const INIT_STATE = {
  current_credit_card: false
};

const CreditCardReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case type.ADD_CARD:
      return { ...state, current_credit_card: action.payload };
    case type.UPDATE_CARD:
      return { ...state, current_credit_card: action.payload };
    case type.REMOVE_CARD:
      return { ...state, current_credit_card: action.payload };
    default:
      return { ...state };
  }
};

export default CreditCardReducer;
