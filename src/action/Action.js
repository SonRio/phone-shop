import * as types from '../constant/ActionType';
import callApi from '../callApi/callApi';

export const getDefaultDataRequest = () => {
    return (dispatch) => {
        return callApi('products','GET',null).then(res => {
            dispatch(getDefaultData(res.data))
        })
    };
};

export const getDefaultData = (products) => {
    return {
        type : types.GET_DEFAULT_DATA,
        products
    };
};

export const addToCart = (product,amount) => {
    return {
        type :types.ADD_TO_CART,
        product,
        amount
    }
};

export const showIconCart = (showIcon) => {
    return {
        type :types.SHOW_CART,
        showIcon
    }
};

export const getUser = (user) => {
    return {
        type : types.GET_USER,
        user
    }
}

export const removeUser = (user) => {
    return {
        type : types.REMOVE_USER,
        user
    }
}

export const increaseProduct = (product,amount) => {
    return {
        type :types.INCREASE_PRODUCT,
        product,
        amount
    }
};

export const reduceProduct = (product,amount) => {
    return {
        type :types.REDUCE_PRODUCT,
        product,
        amount
    }
};


export const deleteProductFromCart = (product) => {
    return {
        type :types.DELETE_PRODUCT,
        product
    }
};

export const getProductDetailRequest = () => {
    return (dispatch) => {
        return callApi('product_details','GET',null).then(res => {
            dispatch(getProductDetail(res.data))
        })
    };
};

export const getProductDetail = (product_details) => {
    return {
        type : types.GET_PRODUCT_DETAIL,
        product_details
    }
}



