import React from "react";


class Product extends React.Component {
    render (){
        return (
            <div className="row m-0">
                {this.props.children}
            </div>
        )
    }
}

export default Product;