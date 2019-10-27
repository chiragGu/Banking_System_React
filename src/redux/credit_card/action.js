import type from "../type";
import script from "../../script";

export const getCard = data => dispatch => {
  dispatch({ type: type.IS_LOADING });
  const credit_card = script.getCard(data);
  if (credit_card) {
    localStorage.setItem("credit_card", JSON.stringify(credit_card));
    dispatch(setCard(credit_card));
  }
  dispatch({ type: type.IS_LOADING });
};

export const addCard = data => dispatch => {
  dispatch({ type: type.IS_LOADING });
  const credit_card = script.addCard(data);
  if (credit_card) {
    localStorage.setItem("credit_card", JSON.stringify(credit_card));
    dispatch(setCard(credit_card));
  } else {
    alert("failed to add card");
  }
  dispatch({ type: type.IS_LOADING });
};

export const updateCard = data => dispatch => {
  dispatch({ type: type.IS_LOADING });
  const credit_card = script.updateCard(data);
  if (credit_card) {
    localStorage.setItem("credit_card", JSON.stringify(credit_card));
    dispatch(setCard(credit_card));
  }
  dispatch({ type: type.IS_LOADING });
  alert("card successfully updated");
};

export const removeCard = data => dispatch => {
  const credit_card_removed = script.removeCard(data);
  if (credit_card_removed) {
    localStorage.removeItem("credit_card");
    dispatch(setCard(false));
  } else {
    alert("card remove fail");
  }
};

export const setCard = data => {
  return {
    type: type.ADD_CARD,
    payload: data
  };
};
