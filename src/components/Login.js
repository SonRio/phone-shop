import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Popup from "../components/Popup";
import callApi from "../callApi/callApi";
import { getUser } from '../action/Action'; 


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pwd: "",
      button: "",
      showBtnCancel : { display: "none" },
      text: "",
      link: "/login",
      showPopup: { display: "none" },
      check: false,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  togglePopup = (e, obj) => {
    e.preventDefault();
    if(this.state.button === "THỬ LẠI"){
      this.setState({
        showPopup: { display: "none" },
      });
    }else{
      this.setState({
        showPopup: { display: "none" },
        link : "/"
      });
    }
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    let login = [];
    if (obj.user !== null && obj.pwd !== null) {
      callApi(`user?pwd=${obj.pwd}&user=${obj.user}`, "GET", null).then(
        (res) => {
          if (res.data.length === 0) {
            this.setState({
              button: "THỬ LẠI",
              text: "TÊN TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG CHÍNH XÁC",
              showPopup: { display: "block" },
              check: false,
            });
          } else {
            this.setState({
              button: "OK",
              text: "ĐĂNG NHẬP THÀNH CÔNG",
              showPopup: { display: "block" },
              check: true,
            });
            login.push(res.data[0].id,res.data[0].user);
            localStorage.setItem("userLogin", JSON.stringify(login));
            this.props.onGetUserLogin(login);
          }
        }
      );
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-10">
              <div className="card mt-5">
                <div className="card-title">
                  <h4 className="text-center mt-2">ĐĂNG NHẬP</h4>
                </div>

                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label for="name">Tên đăng nhập:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Tên đăng nhập..."
                        name="user"
                        required
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
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
                    </div>
                    <div className="form-group form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                        />{" "}
                        Lưu thông tin tài khoản
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn"
                        style={{ width: "50%" }}
                        onClick={(e) => this.handleSubmit(e, this.state)}
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <Popup
                    showPopup={this.state.showPopup}
                    text={this.state.text}
                    closePopup={(e) => this.togglePopup(e, this.state)}
                    button={this.state.button}
                    showBtnCancel={this.state.showBtnCancel}
                  />
                  <Redirect to={this.state.link} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispathToProps = (dispatchEvent) => {
  return {
    onGetUserLogin : (user) => {
      dispatchEvent(getUser(user));
    }
  }
}

export default connect(null,mapDispathToProps)(Login);
