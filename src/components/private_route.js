import React from "react";

import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ path, Component, user }) => (
  <Route
    exact
    path={path}
    render={() =>
      user.current_user ? <Component /> : <Redirect exact to="/" />
    }
  ></Route>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
