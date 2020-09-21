import * as types from '../constant/ActionType';
import * as show from '../constant/ShowCart';

let firstState  = show.SHOW_ICON_CART;

const showIcon = (state = firstState,action) => {
    switch(action.type) {
        case types.SHOW_CART:
            return !action.showIcon
        default :
            return state
    }
}

export default showIcon;