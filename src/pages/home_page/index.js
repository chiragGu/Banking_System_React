import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setUserWallet, updateUserWallet } from "../../redux/wallet/action";

import "./index.css";

class HomePage extends React.Component {
  state = {
    amount: "",
    transfer_amount: ""
  };

  componentDidMount = () =>
    this.props.setUserWallet(this.props.user.current_user.id);

  onClickHandler = event => {
    event.preventDefault();
    const wallet_balance = parseInt(this.props.wallet.current_wallet.balance);
    const amount = parseInt(this.state.amount);
    const transfer = parseInt(this.state.transfer_amount);

    if (amount < 0 || transfer < 0)
      return alert("amount cannot be less than 0");

    const wallet = { ...this.props.wallet.current_wallet };

    if (event.target.name === "transfer") {
      if (transfer > wallet_balance) {
        alert("insufficient balance");
      } else {
        wallet.balance = wallet_balance - transfer;
        this.props.updateUserWallet(wallet);
      }
    } else {
      wallet.balance = wallet_balance + amount;
      this.props.updateUserWallet(wallet);
    }
    this.setState({ amount: "", transfer_amount: "" });
  };

  onChangeHandler = event => this.setState({ amount: event.target.value });
  onTransferChangeHandler = event =>
    this.setState({ transfer_amount: event.target.value });

  render() {
    const { current_wallet } = this.props.wallet;

    return (
      <div className="wallet-root">
        <div className="wallet">
          <div className="title">WALLET BALANCE</div>
          <div className="wallet-balance">
            {current_wallet.balance}
            <small className="small">&#8377;</small>
          </div>
          {this.props.credit_card.current_credit_card ? (
            <div>
              <div className="wallet-add">
                <form method="Post">
                  <input
                    type="number"
                    name="amount"
                    min="0"
                    value={this.state.amount}
                    onChange={this.onChangeHandler}
                    placeholder="enter amount to deposit"
                  />
                  <button
                    className="btn-wallet"
                    name="deposit"
                    onClick={this.onClickHandler}
                  >
                    deposit
                  </button>
                </form>
              </div>
              <div className="wallet-add">
                <form method="Post">
                  <input
                    type="number"
                    name="amount"
                    min="0"
                    value={this.state.transfer_amount}
                    onChange={this.onTransferChangeHandler}
                    placeholder="enter amount to withdraw"
                  />
                  <button
                    className="btn-wallet"
                    name="transfer"
                    onClick={this.onClickHandler}
                  >
                    withdraw
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <h4>
                <Link to="/credit-card">ADD CREDIT CARD</Link>
              </h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
  user: state.user,
  credit_card: state.credit_card
});
export default connect(
  mapStateToProps,
  { setUserWallet, updateUserWallet }
)(HomePage);
