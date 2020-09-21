import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    show: state.showIcon,
    items: state.cart,
  };
}

class CartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { show, items } = this.props;
    let data = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [] ;
    if (show === true || data.length > 0 ) {
      let amount = 0;
      for (let i = 0; i < items.length; i++) {
        amount += items[i].amount;
      }
      return (
        <Link to="/cartPage">
          <div className="cart">
            <i class="fa fa-cart-plus"></i>
            <strong>+{amount}</strong>
          </div>
        </Link>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps)(CartIcon);
