import React from "react";
import { connect } from "react-redux";
import Product from "../components/Product";
import ItemProduct from "../components/ItemProduct";
import { addToCart, showIconCart } from "../action/Action";

import { getDefaultDataRequest } from "../action/Action";

class ProductContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      currentPage: 1,
    };
  }

  chosePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  componentDidMount() {
    this.props.onGetDefaultData();
  }

  render() {
    let { products, kind, newPage } = this.props;
    let listKindproducts = [];
    if (kind === null) {
      listKindproducts = products;
    } else {
      if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
          if (products[i].kind === kind) {
            listKindproducts.push(products[i]);
          }
        }
      }
    }
    const { currentPage } = this.state;
    let pageList = [];
    for (let i = 1; i <= Math.ceil(listKindproducts.length / newPage); i++) {
      pageList.push(i);
    }
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <span className="boder"></span>
          <div className="text-center">
            <h3 className="p-4 text-secondary">SẢN PHẨM CỦA CHÚNG TÔI</h3>
          </div>
          <span className="boder"></span>
        </div>
        <Product>
          {this.showProduct(listKindproducts, currentPage, newPage)}
        </Product>
        <div className="pagination-custom mt-4">
          <ul id="page-numbers">{this.showPageList(pageList)}</ul>
        </div>
      </div>
    );
  }

  showProduct(products, currentPage, newPage) {
    let { onAddToCart, onShowIconCart, onGetInforProduct } = this.props;
    const indexOfLastNews = currentPage * newPage;
    const indexOfFirstNews = indexOfLastNews - newPage;
    const Listproducts = products.slice(indexOfFirstNews, indexOfLastNews);
    let item = null;
    if (products.length > 0) {
      item = Listproducts.map((product, index) => {
        return (
          <div className="col-lg-4 col-md-4 col-sm-4">
            <ItemProduct
              key={index}
              product={product}
              onAddToCart={onAddToCart}
              onShowIconCart={onShowIconCart}
              onGetInforProduct={onGetInforProduct}
            />
          </div>
        );
      });
    }
    return item;
  }

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

ProductContainer.defaultProps = {
  newPage: 3,
  kind: null,
};

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

export default connect(mapStateToProp, mapDispatchToProps)(ProductContainer);
