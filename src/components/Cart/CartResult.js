import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Popup from "../Popup";
import callApi from "../../callApi/callApi";

class CartResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "",
      text: "",
      link: "/cartPage",
      showPopup: { display: "none" },
      showBtnCancel : { display: "none" },
      check: false,
    };
  }

  togglePopup = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"))
      ? JSON.parse(localStorage.getItem("userLogin"))
      : [];
    if (this.state.button === "OK") {
      this.setState({
        showPopup: { display: "none" },
        link: `/orderPage/${user[0]}/detail`,
        check: true,
      });
      window.location.reload()
    }
    if (this.state.button === "Đăng nhập") {
      this.setState({
        link: "/login",
      });
    }
    if (this.state.button === "MUA NGAY") {
      this.setState({
        link: "/",
      });
    }
  };

  showResultTotal = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].product.price * cart[i].amount;
    }
    return total;
  };

  payProduct = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"))
      ? JSON.parse(localStorage.getItem("userLogin"))
      : [];
    let data = JSON.parse(localStorage.getItem("data"))
      ? JSON.parse(localStorage.getItem("data"))
      : [];
    if (user.length === 0) {
      this.setState({
        button: "Đăng nhập",
        text: "BẠN CHƯA ĐĂNG NHẬP",
        showPopup: { display: "block" },
      });
    } else {
      if (data.length === 0) {
        this.setState({
          button: "MUA NGAY",
          text: "ĐƠN HÀNG TRỐNG",
          showPopup: { display: "block" },
        });
      } else {
        this.setState({
          button: "OK",
          text: "SẢN PHẨM ĐÃ ĐƯỢC CHUYỂN VÀO ĐƠN HÀNG CỦA BẠN ",
          link: "/cartPage",
          showPopup: { display: "block" },
        });
        // POST TO API
        let total = 0;
        let dateCreate = new Date().toString();
        let user_order = {};
        let order_Detail = {};
        for (let i = 0; i < data.length; i++) {
          total += data[i].product.price * data[i].amount;
        }
        // CUSTOM POST TO API
        callApi("user_order", "GET", null).then((res) => {
          if (res.data.length > 0) {
            let index = -1;
            index = this.check(res.data,user[0])
            if (index !== -1) {
              callApi(`user_order/${res.data[index].id}`, "PUT", {
                userId: res.data[index].userId,
                totalBill: res.data[index].totalBill + total,
                dateCreate: new Date().toString(),
              })
            } else {
              user_order = {
                userId: user[0],
                totalBill: total,
                dateCreate: dateCreate,
              };
              callApi("user_order", "POST", user_order);
            }
          } else {
            user_order = {
              userId: user[0],
              totalBill: total,
              dateCreate: dateCreate,
            };
            callApi("user_order", "POST", user_order)
            .then((res) => {
            });
          }
        });

        // POST order_Detail
        callApi(`order_Detail?userId=${user[0]}`, "GET", null).then((res) => {
          if (res.data.length > 0) {
            let index = -1;
            for (let i = 0; i < data.length; i++) {
              index = this.checkOrderDetali(res.data, data[i].product.id);
              if (index !== -1) {
                callApi(`order_Detail/${res.data[index].id}`, "PUT", {
                  userId: res.data[index].userId,
                  productId: res.data[index].productId,
                  amount: res.data[index].amount + data[i].amount,
                  price : data[i].product.price
                });
              } else {
                    order_Detail = {
                      userId: user[0],
                      productId: data[i].product.id,
                      amount: data[i].amount,
                      price : data[i].product.price
                    };
                    callApi(
                      `order_Detail?useId=${user[0]}`,
                      "POST",
                      order_Detail
                    ).then((res) => {});
                
              }
            }
          } else {
            // done 
            for (let i = 0; i < data.length; i++) {
                order_Detail = {
                userId: user[0],
                productId: data[i].product.id,
                amount: data[i].amount,
                price : data[i].product.price
              };
              callApi(`order_Detail?useId=${user[0]}`, "POST", order_Detail).then((res) => {});
            }
          }
        });

        localStorage.removeItem("data");
      }
    }
  };

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

  checkOrderDetali = (arr, obj) => {
    let index = -1;
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productId === obj) {
          index = i;
        }
      }
    }
    return index;
  };

  setStatusButton = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"))
      ? JSON.parse(localStorage.getItem("userLogin"))
      : [];
    let data = JSON.parse(localStorage.getItem("data"))
      ? JSON.parse(localStorage.getItem("data"))
      : [];
    let result = null;
    if (data.length === 0) {
      result = (
        <Link
          to={`/orderPage/${user[0]}/detail`}
          // onClick={() => this.payProduct()}
        >
          ĐI TỚI ĐƠN HÀNG
        </Link>
      );
    } else {
      result = (
        <button
          type="button"
          className="btn btn-round"
          onClick={() => this.payProduct()}
        >
          ĐẶT HÀNG
        </button>
      );
    }
    return result;
  };

  render() {
    let { items } = this.props;
    return (
      <tr>
        <td></td>
        <td colspan="3" className="td-total text-danger ">
          <strong>
            <h2>Tổng tiền:</h2>
          </strong>
        </td>
        <td colspan="1" className="td-price ">
          <h2>
            {this.showResultTotal(items)}
            <sup>đ</sup>
          </h2>
        </td>
        <td colspan="3" className="text-left">
          {this.setStatusButton()}
          <Popup
            showPopup={this.state.showPopup}
            text={this.state.text}
            closePopup={(e) => this.togglePopup(e, this.state)}
            button={this.state.button}
            showBtnCancel = {this.state.showBtnCancel}
          />
          <Redirect to={this.state.link} />
        </td>
      </tr>
    );
  }
}

export default CartResult;
