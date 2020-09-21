import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "react-elastic-carousel";

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

class SlideProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items : [
            {   
                id:"1",
                url:"https://www.greatersouthern.com/pub/media/wysiwyg/GS_FreeShipping_Banner.jpg",
            },
            {   
                id:"2",
                url:"https://www.greatersouthern.com/pub/media/wysiwyg/GS_FreeShipping_Banner.jpg",
            },
            {   
                id:"3",
                url:"https://www.greatersouthern.com/pub/media/wysiwyg/GS_FreeShipping_Banner.jpg",
            },
        ]
    };
  }

  render() {
    const { items } = this.state;
    return (
      <Carousel itemsToShow={1} className="mt-5">
        {items.map((item) => (
          <div key={item.id} className="slider">
            <img src={item.url} alt="" style={{width : "100%"}} />
          </div>
        ))}
      </Carousel>
    );
  }
}

export default connect(mapStateToProps)(SlideProducts);
