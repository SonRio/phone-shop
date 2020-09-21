import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartContainer from '../../container/CartContainer';


class CartPage extends Component {
    render() {
        return (
            <div>
                <CartContainer/>
            </div>
        );
    }
}

export default connect(
)(CartPage);