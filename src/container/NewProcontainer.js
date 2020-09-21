import React from "react";
import { connect } from "react-redux";

import Product from "../components/Product";
import NewItemProduct from "../components/NewItemProduct";

import { addToCart, showIconCart } from "../action/Action";
import { getDefaultDataRequest } from "../action/Action";

class NewProcontainer extends React.Component {
  componentDidMount() {
    this.props.onGetDefaultData();
  }

  render() {
    let { products } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <span className="boder"></span>
          <div className="text-center">
            <span className="text-secondary">SẢN PHẨM HOT</span>
          </div>
          <span className="boder"></span>
        </div>
        <Product>
          <div className=" container">
            <div className="newProduct d-flex align-items-center">
              <span className="boder"></span>
              <ul className="">{this.showProduct(products)}</ul>
              <span className="boder"></span>
            </div>
          </div>
        </Product>
      </div>
    );
  }

  showProduct(products) {
    let { onAddToCart, onShowIconCart, onGetDefaultData } = this.props;
    let result = null;
    if (products.length > 0) {
      let a = Math.floor(Math.random() * (products.length - 3));
      for (let i = 0; i < products.length; i++) {
        if(i === a){
          result = (
            <li className={`item_1`}>
              <NewItemProduct
                product={products[i]}
                onAddToCart={onAddToCart}
                onShowIconCart={onShowIconCart}
                onGetDefaultData={onGetDefaultData}
              />
            </li>
          );
        }
      }
    }
    return result;
  }
}

const mapStateToProp = (state) => {
  return {
    products: state.products,
  };
};

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

export default connect(mapStateToProp, mapDispatchToProps)(NewProcontainer);
