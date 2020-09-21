import * as types from '../constant/ActionType';

let initialState = [];

const products = (state = initialState, action) => {
  switch (action.type) {
    case(types.GET_DEFAULT_DATA):
      state = action.products;
      return [...state]

    default:
      return [...state];
  }
};

export default products;
