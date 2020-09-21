import React, { Component } from "react";

class Cart extends Component {
  render() {
    return (
      <div className="col-12 text-center">
        <div class="main main-raised">
          <div class="container">
            <div class="card card-plain">
              <div class="card-body">
              <span className="boder"></span>
                    <div>
                      <h3>GIỎ HÀNG</h3>
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
                    <tbody>{this.props.children}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
