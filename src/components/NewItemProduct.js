import React,{ Component } from "react";
import * as show from '../constant/ShowCart'
import { Link } from 'react-router-dom';
import '../css/NewItemProduct.css';

class NewItemProduct extends Component {

  render() {
    let { product } = this.props;
    // {product.image}  <Link to={ `/products/${product.id}/infor`} 
    // {this.setRaiting(product.raiting)} {product.descrip} {product.price} onClick = {()=>this.onAddToCart(product)}
    return (
        <div>
            <Link to={ `/products/${product.id}/infor`}>
              <div className="face_1">
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{width:"70%",borderRadius:"20%",margin:"10%",height:"100"}}
                  />
              </div>
              <div className="face_2">
                <p className="text-center" style={{color : "#000"}}>
                  <i>{product.name}</i>
                </p>
          </div>
          </Link>
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


export default NewItemProduct;
