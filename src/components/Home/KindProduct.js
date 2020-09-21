import React, { Component } from "react";
import {  Redirect } from "react-router-dom/cjs/react-router-dom.min";

class KindProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link : '/'
    }
  }
  

  showKindOfProduct = () =>{
      this.setState({
        link : `/products/${this.props.kind}/show_products`
      })
  }

  render() {
    return (
          <div className="img-hover-zoom kind">
            <img
              src={this.props.image}
              alt="kindsOfPhone"
              width="100%"
              height="100%"
            />
            <h2>{this.props.title}</h2>
            <br />
            <h4>
             {this.props.sale}
            </h4>
            <br />
              <button 
                className="btn"
                onClick={()=>this.showKindOfProduct(this.props.kind)}
              >
              Mua ngay
              </button>
            <br />
            <Redirect to={this.state.link}/>
          </div>
    );
  }
}

export default KindProduct;
