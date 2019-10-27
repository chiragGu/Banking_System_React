import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../redux/user/action";

import "./index.css";

const Navbar = ({ logoutUser, email }) => (
  <div className="navbar">
    <Link className="navitem" to="/home">home</Link>
    <Link className="navitem" to="/credit-card">credit-card</Link>
    <Link className="navitem" to="/profile">profile</Link>
    <Link className="navitem" to="/payment">payment</Link>
    <Link className="navitem" to="#" onClick={logoutUser}>{"logout_" + email}</Link>
  </div>
);

export default connect(
  null,
  { logoutUser }
)(Navbar);
