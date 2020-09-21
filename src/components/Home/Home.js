import React, { Component } from "react";
import KindProduct from "./KindProduct";
import SlideProducts from "./SlideProducts";
import ProductContainer from "../../container/ProductContainer";
import NewProcontainer from "../../container/NewProcontainer";
import { Redirect } from "react-router-dom";
import Slider from "../Slider";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "/",
    };
  }

  render() {
    return (
      <div>
        {/* show banner */}
        <Slider />
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-4  col-md-4 col-sm-4">
              <KindProduct
                title="SamSung"
                image="https://cdn.mos.cms.futurecdn.net/T8RNtHKNHVSQYNb7P53oYX.png"
                sale="..."
                kind="ss"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <KindProduct
                title="Iphone"
                image="https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_new_glass_full.jpg.og.jpg"
                sale="..."
                kind="ip"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <KindProduct
                title="Dòng Khác"
                image="https://www.pinoytechnoguide.com/wp-content/uploads/2019/10/Xiaomi-Redmi-Note-8-Pro.jpg"
                sale="..."
                kind="ot"
              />
            </div>
          </div>
          {/* demo product */}
          <NewProcontainer />
          <SlideProducts />
          <ProductContainer />
          <Redirect to={this.state.link} />
        </div>
      </div>
    );
  }
}

export default Home;
