import * as types from '../constant/ActionType';

let rproduct_detail = [];

let product_details = (state = rproduct_detail,action) => {

    switch(action.type){
        case types.GET_PRODUCT_DETAIL:
            state = action.product_details;
            return [...state]
        default :
            return [...state]
    }
};

export default product_details;