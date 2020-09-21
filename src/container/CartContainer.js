import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from '../components/Cart/CartItem';
import CartResult from '../components/Cart/CartResult';
import Cart  from '.././components/Cart/Cart';
import Popup from '../components/Popup';

import { deleteProductFromCart, increaseProduct, reduceProduct } from '../action/Action';

const mapStateToProps =(state) => {
    return {
        items : state.cart
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteProductFromCart : (cart) => {
            dispatch(deleteProductFromCart(cart));
        },
        onIncreaseProduct : (product,amount) => {
            dispatch(increaseProduct(product,amount))
        }
        ,
        onReduceProduct: (product,amount) => {
            dispatch(reduceProduct(product,amount))
        }

    }
  }

class CartContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          totalBill: "",
          showBtnAction: { display: "none" },
          button: "",
          button_2: "",
          text: "",
          showPopup: { display: "none" },
          showBtnCancel: { display: "inline"},
          productId: "",
        };
      }

    onShowPopUp  = (items) => {
        this.setState({
            button: "OK",
            button_2: "THOÁT",
            text: "XÓA SẢN PHẨM KHỎI ĐƠN HÀNG??",
            showPopup: { display: "block" },
            productId: items.id,
        })
    }

    canclePopup = () => {
        this.setState({
            showPopup : {display : "none"}
        })
    }

    render() {
        let { items } = this.props;
        let { productId } = this.state;
        return (
            <Cart>
                {this.showCartItem(items)}
                {this.showCartResult(items)}
                <Popup
                    showPopup={this.state.showPopup}
                    text={this.state.text}
                    button={this.state.button}
                    closePopup= {()=>this.props.onDeleteProductFromCart(productId) }
                    showBtnCancel = {this.state.showBtnCancel}
                    button_2={this.state.button_2}
                    cancel={(e) => this.canclePopup(e, this.state)}
                    />
            </Cart>
            
        );
    }
    showCartItem = (items) => {
        let result = null;
        let { onIncreaseProduct, onReduceProduct } = this.props;
        result = items.map((item,index) => {
            return (
                <CartItem 
                    key={index} 
                    item ={item.product}
                    amount ={item.amount}
                    onDeleteProductFromCart = {()=> this.onShowPopUp(item.product)} 
                    onReduceProduct = { onReduceProduct }
                    onIncreaseProduct = { onIncreaseProduct }
                />
            )
        })
        return result;
    };

    showCartResult = (items) =>{
        return (
            <CartResult items={items} />
        )
    }

}

export default connect(
    mapStateToProps,mapDispatchToProps
)(CartContainer);