import { combineReducers } from "redux";

import UserReducer from "./user";
import UtilReducer from "./util";
import WalletReducer from "./wallet";
import CreditCardReducer from "./credit_card";

const rootReducer = combineReducers({
  user: UserReducer,
  wallet: WalletReducer,
  util: UtilReducer,
  credit_card: CreditCardReducer
});

export default rootReducer;
