import React, { Component } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  "https://images.samsung.com/is/image/samsung/p5/ph/offer/2020/galaxy-s20/desktop-banner-white.jpg?$ORIGIN_JPG$",
  "https://cdn.shopify.com/s/files/1/0149/8032/files/veil-2-new-camera-19-iPhone-11-Render-Banner-2048-x-1000.jpg?v=1569170916",
  "https://i01.appmifile.com/webfile/globalimg/Mandy/vn-r9a-pc.jpg",
];

class Slider extends Component {
  render() {
    return (
      <div>
        <Slide>
          <div className="each-slide">
            <div
              className="slide"
              style={{ backgroundImage: `url(${slideImages[0]})` }}
            >
              <div className="title_slide">
                <h1 className="mb-2">Trao đổi sự tin tưởng</h1>
                <h2 className="mb-4">với khách hàng</h2>
                  <button className="btn"style={{width:"12rem"}}>
                    <span>Mua ngay</span>
                  </button>
                <br />
              </div>
            </div>
          </div>
          <div className="each-slide">
            <div
              className="slide"
              style={{ backgroundImage: `url(${slideImages[1]})` }}
            >
              <div className="title_slide">
                <h1 className="mb-2">Freeship trên</h1>
                <h2>toàn quốc</h2>
                  <button className="btn" style={{width:"12rem"}}>
                    <span>Mua ngay</span>
                  </button>
                <br />
              </div>
            </div>
          </div>
          <div className="each-slide">
            <div
              className="slide"
              style={{ backgroundImage: `url(${slideImages[2]})` }}
            >
              <div className="title_slide">
                <h1 className="mb-2">Chế độ bảo hành</h1>
                <h2 className="mb-4">trên 12 tháng</h2>
                  <button className="btn" style={{width:"12rem"}}>
                    <span>Mua ngay</span>
                  </button>
                <br />
              </div>
            </div>
          </div>
        </Slide>
      </div>
    );
  }
}

export default Slider;
