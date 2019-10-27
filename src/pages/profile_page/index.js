import React from "react";
import { connect } from "react-redux";

import { updateUser } from "../../redux/user/action";

import "./index.css";

class ProfilePage extends React.Component {
  state = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_admin: false
  };

  componentDidMount() {
    const {
      id,
      first_name,
      last_name,
      email,
      is_admin
    } = this.props.user.current_user;
    this.setState({ id, first_name, last_name, email, is_admin });
  }

  onChangeHandler = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onClickHandler = event => {
    event.preventDefault();
    if (this.state.first_name.trim().length === 0)
      return alert("first name cannot be empty");
    this.props.updateUser(this.state);
  };

  render() {
    return (
      <div>
        <form method="post" className="profile">
          <label>first name</label>
          <input
            name="first_name"
            onChange={this.onChangeHandler}
            value={this.state.first_name}
          />
          <label>last name</label>
          <input
            name="last_name"
            onChange={this.onChangeHandler}
            value={this.state.last_name}
          />
          <label>email</label>
          <input
            name="email"
            type="email"
            onChange={() => {}}
            value={this.state.email}
          />
          <label>password</label>
          <input
            name="password"
            type="password"
            onChange={this.onChangeHandler}
            value={this.state.password}
            placeholder="enter new password"
          />
          <button className="btn-green" onClick={this.onClickHandler}>
            UPDATE PROFILE
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { updateUser }
)(ProfilePage);
