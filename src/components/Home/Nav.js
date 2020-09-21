import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Banner from "./Banner";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  showAccount = () => {
    let { users } = this.props;
    let result = null;
    let check = JSON.parse(localStorage.getItem("userLogin"));
    if (users.length > 0 || check !== null) {
      result = (
        <Link to={`/account/${check[0]}/information`}>
          <i className="fa fa-user mr-2" style={{ fontStyle: "24px" }}>
            <span className="logo">Chào, {check[1]}</span>
          </i>
        </Link>
      );
    } else {
      result = (
        <div className="d-flex">
          <NavLink
            to="/login"
            className="btn align-middle mr-2"
          >
            <strong className="text-white">
              <small>Đăng nhập</small>
            </strong>
          </NavLink>

          <NavLink
            to="/register"
            className="btn align-middle"
          >
            <strong className="text-white">
              <small>Đăng kí</small>
            </strong>
          </NavLink>
        </div>
      );
    }
    return result;
  };

  render() {
    return (
        <div className="d-flex justify-content-between align-items-center">
          <div className="ml-2">
              <Link to="/">
                <span className="logo">TheRio</span>
              </Link>
          </div>
          <Banner />
          <div className="mr-4">{this.showAccount()}</div>
        </div>
      
    );
  }
}

export default connect(mapStateToProps)(Nav);
