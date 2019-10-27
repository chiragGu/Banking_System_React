import type from "../type";
import script from "../../script";

export const setUserWallet = data => async dispatch => {
  try {
    dispatch({ type: type.IS_LOADING });

    const wallet = script.setWallet(data);

    if (wallet && !localStorage.wallet) {
      localStorage.setItem("wallet", JSON.stringify(wallet));
      dispatch(setWallet(wallet));
    } else {
      dispatch(setWallet(JSON.parse(localStorage.wallet)));
    }

    dispatch({ type: type.IS_LOADING });
  } catch (error) {
    dispatch({ type: type.IS_LOADING });
    dispatch({ type: type.ERROR, payload: error.message });
  }
};

export const updateUserWallet = data => async dispatch => {
  try {
    dispatch({ type: type.IS_LOADING });
    const wallet = script.updateWallet(data);
    localStorage.setItem("wallet", JSON.stringify(wallet));
    dispatch(setWallet(wallet));
    dispatch({ type: type.IS_LOADING });
  } catch (error) {
    dispatch({ type: type.IS_LOADING });
    dispatch({ type: type.ERROR, payload: error.message });
  }
};

export const makePayment = data => async dispatch => {
  try {
    dispatch({ type: type.IS_LOADING });
    const wallet = script.makePayment(data);
    if (wallet === false) {
      alert("error transaction");
    } else {
      localStorage.setItem("wallet", JSON.stringify(wallet));
      dispatch(setWallet(wallet));
      dispatch({ type: type.IS_LOADING });
      window.location.href = "/";
      alert("successfull");
    }
  } catch (error) {
    dispatch({ type: type.IS_LOADING });
    dispatch({ type: type.ERROR, payload: error.message });
  }
};

export const setWallet = data => {
  return {
    type: type.SET_WALLET,
    payload: data
  };
};
