import React from "react";
import { connect } from "react-redux";

import { makePayment } from "../../redux/wallet/action";

import "./index.css";

class PaymentPage extends React.Component {
  state = {
    amount: 0,
    credit_wallet_id: ""
  };

  onChangeHandler = event =>
    this.setState({ [event.target.name]: event.target.value });

  onClickHandler = event => {
    event.preventDefault();
    if (this.state.credit_wallet_id.trim().length === 0)
      return alert("need account to transfer amount");
    if (this.state.amount <= 0) return alert("higher amount please!");
    const payment = {
      ...this.state,
      debit_wallet_id: this.props.wallet.current_wallet.id
    };
    if (this.props.wallet.current_wallet.balance < payment.amount) {
      alert("low balance");
      window.location.href = "/";
    } else {
      this.props.makePayment(payment);
    }
  };

  render() {
    return (
      <div>
        <h3>PAYMENT</h3>
        <form method="post" className="payment">
          <label>Payment From Wallet</label>
          <input
            name="debit_wallet_id"
            onChange={() => {}}
            value={this.props.wallet.current_wallet.id}
          />
          <label>Payment To Wallet</label>
          <input name="credit_wallet_id" onChange={this.onChangeHandler} />
          <label>amount</label>
          <input name="amount" onChange={this.onChangeHandler} type="number" />
          <button onClick={this.onClickHandler} className="btn-reverse">
            MAKE PAYMENT
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(
  mapStateToProps,
  { makePayment }
)(PaymentPage);
