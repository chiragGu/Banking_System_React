import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginComponent from "../../components/login";
import RegisterComponent from "../../components/register";

import "./index.css";

export const RootPage = ({ user }) =>
  user.current_user ? (
    <Redirect exact to="/home" />
  ) : (
    <div className="root">
      <LoginComponent />
      <div className="sized" />
      <RegisterComponent />
    </div>
  );

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(RootPage);
