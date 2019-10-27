import type from "../type";
import script from "../../script";

export const registerUser = data => async dispatch => {
  try {
    dispatch({ type: type.IS_LOADING });
    const user = script.registerUser(data);
    if (user) {
      dispatch({ type: type.IS_LOADING });
      window.location.href = "/";
    }
  } catch (error) {
    dispatch({ type: type.IS_LOADING });
    dispatch({ type: type.ERROR, payload: error.message });
  }
};

export const loginUser = data => async dispatch => {
  try {
    dispatch({ type: type.IS_LOADING });
    const user = script.loginUser(data);
    if (user) {
      delete user.password;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCurrentUser(user));
      dispatch({ type: type.IS_LOADING });
    } else {
      alert("login fail");
    }
  } catch (error) {
    dispatch({ type: type.IS_LOADING });
    dispatch({ type: type.ERROR, payload: error.message });
  }
};

export const updateUser = data => dispatch => {
  dispatch({ type: type.IS_LOADING });
  const password = prompt("enter old password");
  const user = script.updateUser(password, data);
  if (user) {
    delete user.password;
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setCurrentUser(user));
  } else {
    alert("update fail");
  }
  dispatch({ type: type.IS_LOADING });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: type.IS_LOADING });

  localStorage.removeItem("user");
  localStorage.removeItem("wallet");
  localStorage.removeItem("credit_card");

  dispatch(setCurrentUser(false));
  dispatch(removeWallet());
  //dispatch(removeCard());

  window.location.href = "/";
  dispatch({ type: type.IS_LOADING });
};

export const removeWallet = () => {
  return {
    type: type.SET_WALLET,
    payload: false
  };
};

export const setCurrentUser = data => {
  return {
    type: type.SET_CURRENT_USER,
    payload: data
  };
};
