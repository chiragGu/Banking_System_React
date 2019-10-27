import type from "../type";

const INIT_STATE = {
  current_wallet: false
};

const WalletReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case type.SET_WALLET:
      return { ...state, current_wallet: action.payload };

    case type.ADD_BALANCE:
      return { ...state, current_wallet: action.payload };

    case type.TRANSFER_BALANCE:
      return { ...state, current_wallet: action.payload };
    default:
      return state;
  }
};

export default WalletReducer;
