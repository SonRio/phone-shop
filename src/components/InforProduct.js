import React, { Component } from "react";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";

import callApi from "../callApi/callApi";
import { Redirect } from "react-router-dom";
import { getProductDetailRequest, addToCart } from "../action/Action";
import Popup from '../components/Popup';

class InforProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      comment: "",
      starRatting: "",
      product_details: [],
      button: "",
      showBtnCancel : { display: "none" },
      text: "",
      showPopup: { display: "none" },
    };
  }

  componentDidMount() {
    let { match } = this.props;
    callApi(`products/${match.params.id}`, "GET", null).then((res) => {
      this.setState({
        product: res.data,
      });
    });
    // callApi(`product_details?productId=${match.params.id}`, "GET", null).then(
    //   (res) => {
    //     this.setState({
    //       product_details: res.data,
    //     });
    //   }
    // );
    this.props.onGetProductDetail();
  }

  // Get value rating
  ratingChanged = (newRating) => {
    this.setState({
      starRatting: newRating,
    });
  };
  // Get value commnet
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  showCommentAndRating = (product_details, productId) => {
    let result = null;
    let arrPD = [];
    for (let i = 0; i < product_details.length; i++) {
      if (product_details[i].productId === productId) {
        arrPD.push(product_details[i]);
      }
    }
    if (arrPD.length > 0) {
      result = arrPD.map((item, index) => {
        return (
          <div className="card">
            <div className="card-title m-0 p-0">
              <label>Người đánh giá:</label>
              <span>{item.user}</span>
            </div>
            <div className="card-body">
              <div className="d-flex">
                <p className="mr-4">{item.comment}</p>
                {this.setRaiting(item.rate)}<br/>
              </div>
              <label className="mr-4">Thời gian: </label>
              <i>{item.dateCreate}</i>
            </div>
          </div>
        );
      })
      
    } else {
      result = <i>Sản phẩm chưa có bình luận và đánh giá</i>;
    }

    return result;
  };

  // toggle popup
  togglePopup = (e) => {
    e.preventDefault();
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    if(userLogin !== null){
      this.setState({
        button : "OK",
        showPopup : {display : "block"},
        text : "CẢM ƠN BẠN ĐÃ ĐÁNH GIÁ VỀ SẢN PHẨM CỦA CHÚNG TÔI"
      })
    }else{
      this.setState({
        button : "Đăng nhập",
        showPopup : {display : "block"},
        text : "BẠN CHƯA ĐĂNG NHẬP"
      })
    }
    
  }

  // post value to API
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.button === "OK"){
      let { product, comment, starRatting } = this.state;
      let userLogin = JSON.parse(localStorage.getItem('userLogin'));
      let dateCreate = new Date();
      callApi("product_details", "POST",{
        productId: product.id,
        user: userLogin[1],
        rate: starRatting,
        comment:comment ,
        dateCreate: dateCreate,
      }).then(res => {
        this.setState({
          showPopup : {display : "none"}
        })
        window.location.reload();
      })
    }else{
      this.setState({
        showPopup : {display : "none"}
      })
    }
  };

  render() {
    let { product } = this.state;
    let { product_details, match } = this.props;
    return (
      <div>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 mt-4">
                <div className="card">
                  <div className="card-body">
                    <img src={product.image} className="img-fluid" alt="" />
                  </div>
                  <div className="card-body mt-2">
                    <p className="text-left">
                     {product.infor}
                    </p>
                  </div>
                  <div className="card-footer">
                  {this.showCommentAndRating(product_details, parseInt(match.params.id))}
                  </div>
                </div>
              </div>
              <div className="col-4 mt-4">
                <div className="card">
                  <div className="card-titel mt-4">
                    <h3 className="text-center text-success">{product.name}</h3>
                    <ul className="rating">
                      <li className="text-center">
                        {/* {product.raiting} */}
                        {this.setRaiting(product.raiting)}
                      </li>
                    </ul>
                    <h3 className="text-center">{product.price}<sup>đ</sup></h3>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <button 
                    class="ml-4 btn"
                    style={{width:"80%"}}
                    onClick = {()=>this.props.onAddToCart(product)}
                    >
                      Thêm vào giỏ
                    </button>
                    <form>
                      <div className="d-flex">
                        <label className="mr-4 mt-3">Đánh giá sản phẩm:</label>
                        <ReactStars
                          count={5}
                          onChange={this.ratingChanged}
                          size={32}
                          activeColor="yellow"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          style={{ width: "100%" }}
                          placeholder="Bình luận về sản phẩm..."
                          name="comment"
                          onChange={this.onChange}
                          value={this.state.commnet}
                        />
                        <button
                          className="btn float-right"
                          onClick={(e) => this.togglePopup(e, this.state)}
                        >
                          Gửi
                        </button>
                      </div>
                    </form>
                      <Popup
                      showPopup={this.state.showPopup}
                      text={this.state.text}
                      closePopup={(e) => this.handleSubmit(e)}
                      button={this.state.button}
                      showBtnCancel={this.state.showBtnCancel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Redirect to={this.props.match.url} />
      </div>
    );
  }
  setRaiting(rating) {
    let result = [];
    for (let i = 1; i <= rating; i++) {
      result.push(<i className="fa fa-star"> </i>);
    }
    for (let j = 1; j <= 5 - rating; j++) {
      result.push(<i className="fa fa-star-o"></i>);
    }
    return result;
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    product_details: state.product_details,
  };
};

const mapDispatchToProps = (dispatchEvent) => {
  return {
    onGetProductDetail: () => {
      dispatchEvent(getProductDetailRequest());
    },
    onAddToCart : (product) => {
      dispatchEvent(addToCart(product,1))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InforProduct);
