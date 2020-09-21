import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cart from "./CartIcon";
import Popup from "./Popup";
import callApi from "../callApi/callApi";
import { removeUser } from '../action/Action';

function mapStateToProps(state) {
  return {
    account: state.users,
  };
}
const mapDispathToProps = (dispatchEvent) => {
  return{
    onRemoveUserLogin : () => {
      dispatchEvent(removeUser())
    }
  }
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        id: null,
        name: null,
        address: null,
        user: null,
        phone: null,
        pwd: null,
      },
      errors: {
        name: "",
        address: "",
        phone: "",
        user: "",
        pwd: "",
        rPwd: "",
      },
      btnEdit: true,
      button: "",
      button_2: "",
      text: "",
      link: `/account/${this.props.match.params.user}/information`,
      showPopup: { display: "none" },
      showBtnCancel: { display: "inline", width: "9rem" },
    };
  }

  componentDidMount() {
    let { user } = this.props.match.params;
    callApi(`user/${user}`, "GET", null).then((res) => {
      // console.log(res.data);
      this.setState({
        id: res.data.id,
        name: res.data.name,
        address: res.data.address,
        phone: res.data.phone,
        user: res.data.user,
        pwd: res.data.pwd,
      });
    });
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let { errors } = this.state;
    switch (name) {
      case "name":
        errors.name = value.length < 5 ? "Tên phải dài ít nhất 5 kí tự*" : "";
        break;
      case "address":
        errors.address = value.length < 10 ? "Địa chỉ không đáng tin cậy ( sônhà-tênđường-phương-quận,... ) *" : "";
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
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value,
    });
  };

  onSaveInfor = (e) => {
    this.setState({
      button: "OK",
      text: "Câp nhật thông tin thành công!!!",
      showPopup: { display: "block" },
      showBtnCancel: { display: "none", width: "9rem" },
    });
  };

  logOutAccountOrSaveInfor = () => {
    let { name, address, phone, user, pwd, id } = this.state;
    if (this.state.button === "Đăng xuất") {
    // let login = JSON.parse(localStorage.getItem("userLogin"));
      this.setState({
        showPopup: { display: "none" },
        link: "/",
      });
      this.props.onRemoveUserLogin();
      localStorage.removeItem("userLogin");
    } else {
      callApi(`user/${id}`, "PUT", {
        name: name,
        address: address,
        phone: phone,
        user: user,
        pwd: pwd,
      }).then((res) => {
        this.setState({
          link: `/account/${this.props.match.params.user}/information`,
          showPopup: { display: "none" },
        });
      });
    }
  };

  canclePopup = () => {
    this.setState({
      showPopup: { display: "none" },
    });
  };

  logOut = () => {
    this.setState({
      button: "Đăng xuất",
      button_2: "Không",
      text: "BẠN CÓ MUỐN ĐĂNG XUẤT??",
      showPopup: { display: "block" },
      showBtnCancel: { display: "inline", width: "9rem" },
    });
  };

  showLinkToCart = (userLogin) => {
    let result = null;
    if (userLogin !== null) {
      result = (
        <Link to={`/orderPage/${userLogin[0]}/detail`}>
          <i className="fa fa-shopping-cart" style={{ fontSize: "32px" }}></i>
          ...Đơn hàng
        </Link>
      );
    }
    return result;
  };

  render() {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let { name, address, phone, user, pwd } = this.state;
    const { errors } = this.state;
    return (
      <div>
        <Cart />
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 mt-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRF9euRlTk0WqLnPH_yl_3_jyxf379PvEpJ_Q&usqp=CAU"
                  alt="account"
                  width="40px"
                  height="40px"
                />
                <h3 className="text-center">
                  {/* {account[3]} */}
                  {user}
                </h3>
              </div>
              <div className="text-center">{this.showLinkToCart(userLogin)}</div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 mt-4">
              <h3>Hồ sơ của tôi</h3>
              <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
              <div className="">
                <div className="">
                  <form>
                    <div className="form-group">
                      <label for="user">Tên đăng nhập:</label>

                      <h4 className="text-center">{user}</h4>
                    </div>
                    <div className="form-group">
                      <label for="name">Họ tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Họ tên của bạn..."
                        name="name"
                        required
                        value={name}
                        onChange={this.onChange}
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
                        required
                        value={address}
                        onChange={this.onChange}
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
                          value={phone}
                          onChange={this.onChange}
                        />
                      </div>

                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.phone}
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
                        value={pwd}
                        onChange={this.onChange}
                      />
                      {
                        <span className="error" style={{ color: "red" }}>
                          {errors.pwd}
                        </span>
                      }
                    </div>
                  </form>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn"
                      style={{ width: "100%" }}
                      onClick={() => this.onSaveInfor()}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 mt-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRF9euRlTk0WqLnPH_yl_3_jyxf379PvEpJ_Q&usqp=CAU"
                alt="account"
                width="100%"
              />
              {/* <h3>Chào, {account[0]}</h3> */}
              <button
                className="btn btn-danger text-center mt-2"
                onClick={() => this.logOut()}
              >
                Đăng xuất
              </button>
            </div>
          </div>
          <Popup
            showPopup={this.state.showPopup}
            text={this.state.text}
            button={this.state.button}
            closePopup={() => this.logOutAccountOrSaveInfor()}
            showBtnCancel={this.state.showBtnCancel}
            button_2={this.state.button_2}
            cancel={() => this.canclePopup()}
          />
          <Redirect to={this.state.link} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Account);
