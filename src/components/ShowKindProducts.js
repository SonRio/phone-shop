import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addToCart, showIconCart } from "../action/Action";
import { getDefaultDataRequest } from "../action/Action";
import ProductContainer from "../container/ProductContainer";

class ShowKindProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      newPage: 9,
    };
  }

  render() {
    let { newPage } = this.state;
    let { kind } = this.props.match.params;
    return (
      <div>
        <div className="">{this.ShowKindProducts(newPage, kind)}</div>
        <Redirect to={this.props.match.url} />
      </div>
    );
  }

  ShowKindProducts = (newPage, kind) => {
    let result = null;
    if (kind !== "") {
      result = <ProductContainer kind={kind} newPage={newPage} />;
    }
    return result;
  };

  showPageList(pageNumbers) {
    let itemList = null;
    itemList = pageNumbers.map((number) => {
      if (this.state.currentPage === number) {
        return (
          <li key={number} id={number} className="active">
            {number}
          </li>
        );
      } else {
        return (
          <li key={number} id={number} onClick={this.chosePage}>
            {number}
          </li>
        );
      }
    });
    return itemList;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (product) => {
      dispatch(addToCart(product, 1));
    },
    onShowIconCart: (showIcon) => {
      dispatch(showIconCart(showIcon));
    },
    onGetDefaultData: () => {
      dispatch(getDefaultDataRequest());
    },
  };
};

export default connect(null, mapDispatchToProps)(ShowKindProducts);
