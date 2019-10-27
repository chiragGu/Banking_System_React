import React from "react";
import { connect } from "react-redux";

import {
  addCard,
  removeCard,
  updateCard,
  getCard
} from "../../redux/credit_card/action";

import "./index.css";

class CreditCard extends React.Component {
  state = {
    last_4: "",
    brand: "",
    expires_at: new Date().toISOString().substr(0, 10)
  };

  componentDidMount() {
    this.props.getCard(this.props.user.current_user.id);
    if (this.props.credit_card.current_credit_card) {
      this.setState({
        ...this.props.credit_card.current_credit_card,
        isPresent: true
      });
    }
  }

  onChangeHandler = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onClickHandler = event => {
    event.preventDefault();
    if (this.state.last_4.length < 4) return alert("last 4 digits are invalid");
    if (this.props.credit_card.current_credit_card) {
      this.props.updateCard({
        ...this.state,
        userid: this.props.user.current_user.id
      });
    } else {
      this.props.addCard({
        ...this.state,
        userid: this.props.user.current_user.id
      });
    }
  };

  removeCardHandler = event => {
    event.preventDefault();
    this.props.removeCard(this.props.user.current_user.id);
    this.setState({
      last_4: "",
      brand: "",
      expires_at: new Date().toISOString().substr(0, 10),
      isPresent: false
    });
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <form method="post" className="creditcard">
          <div className="card">CREDIT CARD</div>
          <label>last 4 digits</label>
          <input
            type="number"
            name="last_4"
            minLength="4"
            value={this.state.last_4}
            onChange={this.onChangeHandler}
            required
          />
          <label>brand</label>
          <select
            name="brand"
            value={this.state.brand}
            onChange={this.onChangeHandler}
            required
          >
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="RUPAY">RUPAY</option>
          </select>
          <label>expires at</label>
          <input
            name="expires_at"
            type="date"
            value={this.state.expires_at}
            onChange={this.onChangeHandler}
            required
          />
          <button className="btn" onClick={this.onClickHandler}>
            {this.props.credit_card.current_credit_card
              ? "UPDATE CREDIT-CARD"
              : "ADD CREDIT-CARD"}
          </button>
          {this.props.credit_card.current_credit_card ? (
            <button
              type="submit"
              className="btn"
              onClick={this.removeCardHandler}
            >
              REMOVE CARD
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  credit_card: state.credit_card,
  user: state.user
});

export default connect(
  mapStateToProps,
  { addCard, removeCard, updateCard, getCard }
)(CreditCard);
