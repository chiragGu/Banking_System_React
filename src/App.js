import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import RootPage from "./pages/root_page";
import HomePage from "./pages/home_page";
import Navbar from "./components/navbar";
import CreditCardPage from "./pages/credit_card";
import ProfilePage from "./pages/profile_page";
import PaymentPage from "./pages/payment_page";

import PrivateRoute from "./components/private_route";
import store from "./redux";
import { setCurrentUser } from "./redux/user/action";
import { setWallet } from "./redux/wallet/action";
import { setCard } from "./redux/credit_card/action";

if (localStorage.user && localStorage.wallet) {
  const user = localStorage.getItem("user");
  const wallet = localStorage.getItem("wallet");
  const credit_card = localStorage.getItem("credit_card");
  store.dispatch(setCurrentUser(JSON.parse(user)));
  store.dispatch(setWallet(JSON.parse(wallet)));
  if (credit_card) store.dispatch(setCard(JSON.parse(credit_card)));
}

const App = ({ user }) => {
  return (
    <Router>
      {user.current_user ? <Navbar email={user.current_user.email} /> : null}
      <Route exact path="/" render={() => <RootPage />} />
      <Route
        exact
        path="/delete"
        render={() => (
          <div>
            {localStorage.clear()}
            <Redirect exact to="/" />
          </div>
        )}
      />
      <Switch>
        <PrivateRoute path="/home" Component={HomePage} />
        <PrivateRoute path="/credit-card" Component={CreditCardPage} />
        <PrivateRoute path="/profile" Component={ProfilePage} />
        <PrivateRoute path="/payment" Component={PaymentPage} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(App);
