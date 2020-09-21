import React, { Component } from "react";
import { Link } from 'react-router-dom'

class CartItem extends Component {

  render() {
    let { item, amount, onReduceProduct,onIncreaseProduct, onDeleteProductFromCart } = this.props;
    console.log(item);
    
    return (
      <tr>
        <td>
          <div className="img-container">
            <img 
              src={item.image}
              alt={item.name}
              width="50%"
              />
          </div>
        </td>
        <td className="td-name align-middle">
        <Link className="text-dark" to={ `/products/${item.id}/infor`}>
        {item.name}
        </Link>
        </td>
        <td className="td-number text-right align-middle">
          {item.price}<sup>đ</sup>
        </td>
        <td className="td-number align-middle">
          <div className="btn-group btn-group-sm">
            <button 
              className="btn btn-round btn-dark btn-sm"
              style={this.props.showBtnAction}
              onClick = {()=>onReduceProduct(item,amount)}
              >
              <i className="material-icons">remove</i>{" "}
            </button>
            <strong className="p-2">{amount}</strong>
          
            <button 
              className="btn btn-round btn-dark btn-sm"
              style={this.props.showBtnAction}
              onClick = {()=>onIncreaseProduct(item,amount)}
              >
              <i className="material-icons">add</i>
            </button>
          </div>
        </td>
        <td className="td-number align-middle">
          {this.showTotalItem(item.price,amount)}<sup>đ</sup>
        </td>
        <td className="td-actions align-middle" >
          <button
            type="button"
            rel="tooltip"
            data-placement="left"
            title="Remove item"
            className="btn btn-danger btn-sm"
            onClick = {()=>onDeleteProductFromCart(item)}
          >
            <i className="material-icons">close</i>
          </button>
        </td>
      </tr>
    );
  }
  // show total price of one product
  showTotalItem = (price,amount) => {
    return price * amount;
  };

  // delete product from cart
  // onDeleteProductFromCart = (item) =>{
  //   this.props.onDeleteProductFromCart(item);
  // };

  // increase amount of product in cart
  // onIncreaseProduct = (item,amount) => {
  //   this.props.onIncreaseProduct(item,amount);
  // };

  // reduce amount of product in cart
  // onReduceProduct = (item,amount) => {
  //   this.props.onReduceProduct(item,amount);
  // };

}

export default CartItem;
