import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as show from "../constant/ShowCart";
import { addToCart, showIconCart } from "../action/Action";
import ItemProduct from "../components/ItemProduct";

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  removeSign = (str) => {
    //remove punctuation
    str = str.toLowerCase();
    str = str.replace(/ã|ạ|ả|â|ă|ẩ|ẫ|ậ|ẳ|ẵ|ặ|à|á|ắ|ằ|ầ|ắ/gi, "a");
    str = str.replace(/ọ|ỏ|õ|ô|ổ|ỗ|ộ|ơ|ở|ỡ|ợ|ò|ó|ờ|ớ|ồ|ố/gi, "o");
    str = str.replace(/ẻ|ẽ|ẹ|ê|ể|ễ|ệ|è|é|ề|ế/gi, "e");
    str = str.replace(/ũ|ủ|ư|ụ|ử|ữ|ự|ù|ú|ừ|ứ/gi, "u");
    str = str.replace(/ỷ|ỹ|ỵ|ỳ|ý/gi, "y");
    str = str.replace(/ỉ|ĩ|ị|ì|í/gi, "i");
    str = str.replace(/đ/gi, "d");
    return str;
  };

  render() {
    let { match, products} = this.props;
    return (
      <div className="d-flex justify-content-center mt-4">
        {this.showSearchResults(products, match.params.value)}
      </div>
    );
  }
  showSearchResults = (products, strSearch) => {
    let result = null;
    let arr = [];
    let { onAddToCart } = this.props;
      for (let i = 0; i < products.length; i++) {
        if (this.removeSign(products[i].name) === this.removeSign(strSearch)) {
          arr.push(products[i]);
        }
      }
      if (arr.length > 0) {
        result = arr.map((item, index) => {
          return (
            <ItemProduct
              key={index}
              product={item}
              onAddToCart={onAddToCart}
              onShowIconCart={() =>
                this.props.onShowIconCart(show.SHOW_ICON_CART)
              }
            />
          );
        });
      } else {
        result = <h2 className="text-center">Không tìm thấy sản phẩm</h2>;
      }
    return result;
  };
}

const mapStatetoProps = (state) => {
    return{
        products : state.products
    }
}

const mapDispathToProp = (dispatchEvent) => {
  return {
    onAddToCart: (item) => {
      dispatchEvent(addToCart(item, 1));
    },
    onShowIconCart: (show) => {
      dispatchEvent(showIconCart(show));
    },
  };
};

export default connect(mapStatetoProps, mapDispathToProp)(Search);
