import React from "react";
import { connect } from "react-redux";

import { registerUser } from "../../redux/user/action";

import "./index.css";

class RegisterComponent extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_admin: false
  };

  onInputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInputToggle = event => {
    this.setState({ [event.target.name]: !event.target.value });
  };

  onClickHandler = event => {
    event.preventDefault();

    if (this.state.first_name === "")
      return alert("first name cannot be empty");
    if (this.state.last_name === "") return alert("last name cannot be empty");
    if (this.state.email === "") return alert("email cannot be empty");
    if (this.state.password == "" && this.state.password.length >= 6)
      return alert("password is invalid");
    this.props.registerUser(this.state);
  };

  render() {
    const { first_name, last_name, email, password, is_admin } = this.state;
    return (
      <div>
        <h2>REGISTER</h2>
        <div>
          <form className="login-root">
            <label>first name</label>
            <input
              name="first_name"
              value={first_name}
              onChange={this.onInputHandler}
            />
            <label>last name</label>
            <input
              name="last_name"
              value={last_name}
              onChange={this.onInputHandler}
            />
            <label>email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onInputHandler}
            />
            <label>password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onInputHandler}
            />
            <small>min. 6 characters</small>
            <label>are you admin?</label>
            <input
              type="checkbox"
              name="is_admin"
              value={is_admin}
              onChange={this.onInputToggle}
            />
            <button className="btn" onClick={this.onClickHandler}>
              REGISTER
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(RegisterComponent);
