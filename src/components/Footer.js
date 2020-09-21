import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

class Footer extends Component {
  render() {
    return (
      <div>
        {/* <!-- footer --> */}
        <footer class="bg-dark px-5 mt-4">
          <div class="container-fluid">
            <div class="row text-light py-4">
              <div class="col-lg-4 col-md-4 col-sm-4">
                <h5 class="pb-3">Về Tôi</h5>
                <p>
                  Tên : Nguyễn Văn Thanh Sơn <br/>
                  SĐT : 0986807109<br/>
                  Quê quán : Quảng Ngãi<br/>
                  Nơi sống hiện tại : Thành phố Đà Nẵng<br/>
                  Đang học tập và làm việc tại trường ĐH Duy Tân
                </p>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4">
                <h5 class="pb-3">Cần cải thiện</h5>
                <p>
                  Tư duy logic<br/>
                  Kĩ năng về lập trình<br/>
                  Chuyên nghiệp hơn trong viếc CODE<br/>
                  Cãi thiện kĩ năng làm việc nhóm<br/>
                  Tiếp xúc với dự án thực tế<br/>
                </p>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4">
                <h5 class="pb-3">Liên lạc với tôi</h5>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/ngvanthanhson/">Facebook</a>
                    <i className="fa fa-facebook ml-4"></i>
                  </li>
                  <li>
                    Số điện thoại
                    <i className="fa fa-phone ml-4"></i><br/>
                    0986807109
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <p class="text-light">
                  &copy; 2020 Copyright, All Rights Reserved - Design by Thanh Son
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* <!--end of footer --> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Footer);
