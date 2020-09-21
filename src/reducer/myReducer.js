import {combineReducers} from 'redux';
import products from '../reducer/rProduct';
import cart from './rCart';
import showIcon from './ShowIconCart';
import users from './rUser';
import product_details from './rProduct_detail'

const Reducer = combineReducers ({
    products,
    cart,
    showIcon,
    users,
    product_details
});

export default Reducer;
