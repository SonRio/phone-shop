import React, { Component } from "react";
import { connect } from "react-redux";
import callApi from "../../callApi/callApi";
import CartItem from "../Cart/CartItem";
import Popup from "../Popup";
import { Redirect } from "react-router-dom";

function mapStateToProps(state) {
  return {};
}

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products_Order: [],
      totalBill: "",
      showBtnAction: { display: "none" },
      button: "",
      button_2: "",
      text: "",
      link: "/cartPage",
      showPopup: { display: "none" },
      showBtnCancel: { display: "inline" },
      check: false,
      productId: "",
    };
  }

  // check position of elm in arr
  check = (arr, obj) => {
    let index = -1;
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].userId === obj) {
          index = i;
        }
      }
    }
    return index;
  };

  // get data from api to renden
  componentDidMount() {
    // get id of user
    let id = parseInt(this.props.match.params.user);
    let arr = []; // arr to push products_order
    callApi(`products?_embed=order_Detail`, "GET", null).then((res) => {
      console.log(res.data);
      //get data to check condition
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].order_Detail.length > 0) {
          // call the ordered parts
          let index = -1;
          index = this.check(res.data[i].order_Detail, id); // check condition elms of user flow userId
          if (index !== -1) {
            if (res.data[i].order_Detail[index].userId === id) {
              // get elms
              arr.push(res.data[i]); // put all to arr
              this.setState({
                products_Order: arr,
              });
            }
          }
        }
      }
    });
    // get totalBill from API with userId
    callApi(`user_order?userId=${id}`, "GET", null).then((res) => {
      let index = -1;
      index = this.check(res.data, id);
      if (index !== -1) {
        this.setState({
          totalBill: res.data[index].totalBill,
        });
      }
    });
  }

  // show cartItem
  showCartItem = (products_Order) => {
    let id = parseInt(this.props.match.params.user);
    let result = null;
    if (products_Order.length > 0) {
      result = products_Order.map((item, index) => {
        let check = -1;
        let arr = [];
        for (let i = 0; i < products_Order.length; i++) {
          check = this.check(item.order_Detail, id);
        }
        if (check !== -1) {
          arr = item.order_Detail[check];
        }
        return (
          <CartItem
            key={index}
            item={item}
            amount={arr.amount}
            showBtnAction={this.state.showBtnAction}
            onDeleteProductFromCart={() => this.onDeleteProductFromCart(item)}
          />
        );
      });
    }
    return result;
  };

  // delete product from cart ( call popup to do action)
  onDeleteProductFromCart = (item) => {
    this.setState({
      button: "OK",
      button_2: "THOÁT",
      text: "XÓA SẢN PHẨM KHỎI ĐƠN HÀNG??",
      showPopup: { display: "block" },
      productId: item.id,
    });
  };

  // exit delete product
  canclePopup = () => {
    this.setState({
      showPopup: { display: "none" },
    });
  };

  // delete product from API
  deleteProductFromCart = (item) => {
    let id = parseInt(this.props.match.params.user);
    let { productId } = this.state;
    let index = -1;
    callApi(`order_Detail?userId=${id}`, "GET", null).then((res) => {
      // get order_Detail data
      if (res.data.length > 1) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].productId === productId) {
            index = i;
          }
        }
        let idDel = res.data[index].id; //get id of product del

        callApi(`order_Detail/${idDel}`, "GET", null).then((res) => {
          let moneyRedue = res.data.amount * parseInt(res.data.price);
          console.log(res.data.price);
          callApi("user_order", "GET", null).then((res) => {
            if (res.data.length > 0) {
              let index = -1;
              index = this.check(res.data, id);
              if (index !== -1) {
                callApi(`user_order/${res.data[index].id}`, "PUT", {
                  userId: res.data[index].userId,
                  totalBill: res.data[index].totalBill - moneyRedue,
                  dateCreate: new Date().toString(),
                }).then((res) => {
                  callApi(`order_Detail/${idDel}`, "DELETE").then((res) => {
                    //del
                    window.location.reload();
                  });
                });
              }
            }
          });
        });
      } else {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].productId === productId) {
            index = i;
          }
        }
        let idDel = res.data[index].id; //get id of product del
        callApi("user_order", "GET", null).then((res) => {
          if (res.data.length > 0) {
            let index = -1;
            console.log(res.data, id);
            index = this.check(res.data, id);
            if (index !== -1) {
              callApi(`user_order/${res.data[index].id}`, "PUT", {
                userId: res.data[index].userId,
                totalBill: 0,
                dateCreate: new Date().toString(),
              }).then((res) => {
                callApi(`order_Detail/${idDel}`, "DELETE").then((res) => {
                  //del
                  window.location.reload();
                });
              });
            }
          }
        });
      }
    });
  };

  render() {
    let { products_Order, totalBill } = this.state;
    
    return (
      <div>
        <div>
          <div className="col-12 text-center">
            <div class="main main-raised">
              <div class="container">
                <div class="card card-plain">
                  <div class="card-body">
                    <span className="boder"></span>
                    <div>
                      <h3>ĐƠN HÀNG</h3>
                    </div>
                    <span className="boder"></span>
                    <br />
                    <div class="table-responsive">
                      <table class="table table-shopping table-hover">
                        <thead className="bg-dark text-white">
                          <tr>
                            <th class="text-center">Ảnh</th>
                            <th>Sản phẩm</th>
                            <th class="text-center">Giá</th>
                            <th class="text-center">Số lượng</th>
                            <th class="text-center">Thành tiền</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.showCartItem(products_Order)}
                          <Popup
                            showPopup={this.state.showPopup}
                            text={this.state.text}
                            button={this.state.button}
                            closePopup={(e) =>
                              this.deleteProductFromCart(e, this.state)
                            }
                            showBtnCancel={this.state.showBtnCancel}
                            button_2={this.state.button_2}
                            cancel={(e) => this.canclePopup(e, this.state)}
                          />
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colspan="2"></td>
                            <td className="td-total text-danger ">
                              <strong>
                                <h2> Tổng tiền :</h2>
                              </strong>
                            </td>
                            <td colspan="1" className="td-price ">
                              <h2>
                                {totalBill}
                                <sup>đ</sup>
                              </h2>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
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
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
