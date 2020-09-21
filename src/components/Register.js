import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Popup from "../components/Popup";
import callApi from "../callApi/callApi";

function mapStateToProps(state) {
  return {};
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        { name: "" },
        { address: "" },
        { phone: "" },
        { user: "" },
        { pwd: "" },
        { rPwd: "" },
      ],
      errors: {
        name: "",
        address: "",
        user: "",
        pwd: "",
        phone: "",
        rPwd: "",
      },
      button: "",
      text: "",
      showPopup: { display: "none" },
      check: false,
      linkLogin: "/register",
      showBtnCancel : { display: "none" },
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let { errors } = this.state;
    switch (name) {
      case "name":
        errors.name = value.length < 5 ? "Tên phải dài ít nhất 5 kí tự*" : "";
        break;
      case "address":
        errors.address = value.length < 5 ? "Địa chỉ không xác thực*" : "";
        break;
        case "phone":
        errors.phone = value.length > 10 ? "Số điện thoại không hợp lệ*" : "";
        break;
      case "user":
        errors.user = value.length < 5 ? "Tên đăng nhập ít nhất 5 kí tự*" : "";
        break;
      case "pwd":
        errors.pwd = value.length < 8 ? "Mật khẩu ít nhất 8 kí tự" : "";
        break;
      case "rRwd":
        errors.rRwd = value.length < 8 ? "Mật khẩu ít nhất 8 kí tự" : "";
        break;
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value,
    });
  };

  togglePopup = (e, obj) => {
    e.preventDefault();
    if(obj.pwd !== obj.rPwd){
      this.setState({
        button: "THỬ LẠI",
        text: "MẬT KHẨU KHÔNG TRÙNG",
        showPopup: { display: "block" },
        check: false,
      });
    }else{
      if (
        obj.name != null &&
        obj.address != null &&
        obj.phone != null &&
        obj.user != null &&
        obj.pwd === obj.rPwd
      ) {
        callApi(`user?user=${obj.user}`, "GET", null).then((res) => {
          if (res.data.length > 0) {
            this.setState({
              button: "THỬ LẠI",
              text: "TÊN ĐĂNG NHẬP ĐÃ TỒN TẠI, VUI LÒNG THỬ LẠI!",
              showPopup: { display: "block" },
              check: false,
            });
          } else {
            this.setState({
              button: "ĐĂNG NHẬP NGAY",
              text: "ĐĂNG KÍ THÀNH CÔNG!",
              showPopup: { display: "block" },
              check: true,
            });
          }
        });
      }
    }
    
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    if (obj.check) {
      callApi("user", "POST", {
        name: obj.name,
        address: obj.address,
        phone: obj.phone,
        user: obj.user,
        pwd: obj.pwd,
      }).then((res) => {
        this.setState({
          linkLogin: "/login",
          showPopup: { display: "none" },
        });
      });
    }
    this.setState({
      showPopup: { display: "none" },
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-10">
              <div className="card mt-4" width="80%" id="register">
                <div className="card-title">
                  <h4 className="text-center mt-4">ĐĂNG KÍ TÀI KHOẢN</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label for="name">Họ tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Họ tên của bạn..."
                        name="name"
                        required
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.name}
                        </span>
                      }
                    </div>
                    <div className="form-group">
                      <label for="name">Địa chỉ nhận hàng:</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Địa chỉ của bạn..."
                        name="address"
                        value={this.state.value}
                        required
                        onChange={this.handleChange}
                      />
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.address}
                        </span>
                      }
                    </div>
                    <div className="form-group">
                      <label for="name">Số điện thoại:</label>
                      <div className="form-inline">
                      <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            +84
                          </span>
                        </div>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Số điện thoại..."
                        name="phone"
                        required
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                      </div>
                      
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.name}
                        </span>
                      }
                    </div>
                    <div className="form-group">
                      <label for="user">Tên đăng nhập:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="user"
                        placeholder="Tên đăng nhập..."
                        name="user"
                        value={this.state.value}
                        required
                        onChange={this.handleChange}
                      />
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.user}
                        </span>
                      }
                    </div>
                    <div className="form-group">
                      <label for="pwd">Mật khẩu:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Mật khẩu..."
                        name="pwd"
                        required
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.pwd}
                        </span>
                      }
                    </div>
                    <div className="form-group">
                      <label for="rPwd">Nhập lại mật khẩu:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="rPwd"
                        placeholder="Nhâp lại mật khẩu..."
                        name="rPwd"
                        value={this.state.value}
                        required
                        onChange={this.handleChange}
                        noValidate
                      />
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.rPwd}
                        </span>
                      }
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn"
                        style={{ width: "50%" }}
                        onClick={(e) => this.togglePopup(e, this.state)}
                      >
                        Đăng kí
                      </button>
                      <Popup
                        showPopup={this.state.showPopup}
                        text={this.state.text}
                        button={this.state.button}
                        closePopup={(e) => this.handleSubmit(e, this.state)}
                        showBtnCancel={this.state.showBtnCancel}
                      />
                      <Redirect to={this.state.linkLogin} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Register);
