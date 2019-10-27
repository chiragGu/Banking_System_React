import React from "react";
import { connect } from "react-redux";

import { loginUser } from "../../redux/user/action";

import "./index.css";

class LoginComponent extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onInputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClickHandler = event => {
    event.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h2>LOGIN</h2>
        <div>
          <form className="login-root" method="post">
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
            <button className="btn" onClick={this.onClickHandler}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(LoginComponent);
