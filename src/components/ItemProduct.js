import React,{ Component } from "react";
import * as show from '../constant/ShowCart'
import { Link } from 'react-router-dom';

class ItemProduct extends Component {

  render() {
    let { product } = this.props;
    // {product.image} {product.name} <Link to={ `/products/${product.id}/infor`} 
    // {this.setRaiting(product.raiting)} {product.descrip} {product.price} onClick = {()=>this.onAddToCart(product)}
    return (
        <div class="card mb-2">
          <div className="card-image d-flex justify-content-center mt-2 face_1">
            <img 
              src={product.image}
              alt={product.name}
              width="180px"
            />
          </div>
          <div className="card-body text-center face_2 p-0">
            <div className="card-title">
              {product.name}
            </div>
            <span className="">{product.price}<sup>đ</sup></span>
            <div className="card-body p-0 pb-4">
              <Link className="text-dark" to={ `/products/${product.id}/infor`}>
                <i className="">Xem chi tiết...</i>
              </Link><br/>
              <button className="btn mt-4" onClick = {()=>this.onAddToCart(product)}>Thêm vào giỏ</button>
            </div>
          </div>
        </div>
    );   
  }

  setRaiting(rating){
    let result = [];
    for (let i = 1;i <= rating; i++){
      result.push(<i className="fa fa-star"> </i>)
    }
    for (let j = 1;j <= (5-rating) ; j++){
      result.push(<i className="fa fa-star-o"></i>)
    }
    return result;
  }

  onAddToCart = (product) =>{
    this.props.onAddToCart(product);
    this.props.onShowIconCart(show.SHOW_ICON_CART);
  };
}


export default ItemProduct;
