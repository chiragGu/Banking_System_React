const uuid = require("uuid/v4");

const registerUser = data => {
  try {
    const user = { ...data, id: uuid() };
    const users = localStorage.users
      ? JSON.parse(localStorage.users).users
      : [];
    const wallets = localStorage.wallets
      ? JSON.parse(localStorage.wallets).wallets
      : [];

    console.log(wallets, users);
    users.push(user);
    const wallet = { id: uuid(), userid: user.id, balance: 0 };
    wallets.push(wallet);
    localStorage.setItem("users", JSON.stringify({ users }));
    localStorage.setItem("wallets", JSON.stringify({ wallets }));
    alert("registeration successfull, " + user.first_name);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = data => {
  const users = localStorage.users ? JSON.parse(localStorage.users).users : [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === data.email && users[i].password === data.password) {
      return users[i];
    }
  }
  return false;
};

const setWallet = data => {
  const wallets = localStorage.wallets
    ? JSON.parse(localStorage.wallets).wallets
    : [];
  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].userid === data) {
      return wallets[i];
    }
  }
};

const updateWallet = data => {
  const wallets = localStorage.wallets
    ? JSON.parse(localStorage.wallets).wallets
    : [];

  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].userid === data.userid) {
      wallets[i].balance = data.balance;

      localStorage.setItem("wallets", JSON.stringify({ wallets }));
      return wallets[i];
    }
  }
  return false;
};

const getCard = data => {
  const cards = localStorage.cards ? JSON.parse(localStorage.cards).cards : [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].userid === data) {
      return cards[i];
    }
  }
  return false;
};

const addCard = data => {
  const cards = localStorage.cards ? JSON.parse(localStorage.cards).cards : [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].last_4 === data.last_4) return false;
  }
  cards.push(data);
  localStorage.setItem("cards", JSON.stringify({ cards }));
  return data;
};

const updateCard = data => {
  const cards = localStorage.cards ? JSON.parse(localStorage.cards).cards : [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].userid === data.userid) {
      cards[i] = data;
      localStorage.setItem("cards", JSON.stringify({ cards }));
      return data;
    }
  }
  return false;
};

const removeCard = data => {
  const cards = localStorage.cards ? JSON.parse(localStorage.cards).cards : [];
  const newCards = [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].userid !== data) {
      newCards.push(cards[i]);
    }
  }
  localStorage.setItem("cards", JSON.stringify({ cards: newCards }));
  return true;
};

const updateUser = (password, data) => {
  const users = localStorage.users ? JSON.parse(localStorage.users).users : [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === data.id) {
      if (password !== users[i].password) return false;

      if (data.password === "") data.password = users[i].password;
      users[i] = data;

      localStorage.setItem("users", JSON.stringify({ users }));
      return users[i];
    }
  }
  alert("profile update successfull");
  return true;
};

const makePayment = data => {
  const wallets = localStorage.wallets
    ? JSON.parse(localStorage.wallets).wallets
    : [];
  let debitWallet;
  // let creditWallet = null;
  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].id === data.debit_wallet_id) {
      wallets[i].balance -= data.amount;
      debitWallet = wallets[i];
    }
    // if (wallets[i].id === data.credit_wallet_id) {
    //   wallets[i].balance = parseInt(wallets[i].balance) + parseInt(data.amount);
    //   creditWallet = wallets[i];
    // }
  }
  // if (creditWallet === null) return false;

  // const payments = localStorage.payments
  //   ? JSON.parse(localStorage.payments).payments
  //   : [];
  // payments.push(data);
  // localStorage.setItem("payments", JSON.stringify({ payments }));

  // for (let i = 0; i < wallets.length; i++) {
  //   if (wallets[i].userid === creditWallet.userid) {
  //     wallets[i].balance = creditWallet.balance;
  //     localStorage.setItem("wallets", JSON.stringify({ wallets }));
  //   }
  // }

  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].userid === debitWallet.userid) {
      wallets[i].balance = debitWallet.balance;
      localStorage.setItem("wallets", JSON.stringify({ wallets }));
      return debitWallet;
    }
  }
};

export default {
  registerUser,
  loginUser,
  setWallet,
  addCard,
  getCard,
  updateCard,
  removeCard,
  updateWallet,
  updateUser,
  makePayment
};
