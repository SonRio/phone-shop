import * as types from "../constant/ActionType";

let data = JSON.parse(localStorage.getItem("data"));

let firstState = data ? data : [];

let cart = (state = firstState, action) => {
  let { product, amount } = action;
  let index = -1;
  switch (action.type) {
    // Add product to cart
    case types.ADD_TO_CART:
      index = check(state, product);
      if (index !== -1) {
        state[index].amount += amount;
      } else {
        state.push({ product, amount });
      }
      localStorage.setItem("data", JSON.stringify(state));
      return [...state];

    // Delete product from cart
    case types.DELETE_PRODUCT:
      index = -1;
      for ( let i = 0;i<state.length;i++){
        if(state[i].product.id === product ){
          index = i;
        }
      }
      if (index !== -1) {
        state.splice(index, 1);
        window.location.reload();
      }
      localStorage.setItem("data", JSON.stringify(state));
      return [...state];

    // Increase amount of product in cart
    case types.INCREASE_PRODUCT:
      index = check(state, product);
      if (index !== -1) {
        state[index].amount += 1;
      }
      localStorage.setItem("data", JSON.stringify(state));
      return [...state];

    // Reduce amount of product in cart
    case types.REDUCE_PRODUCT:
      if (amount === 1) {
        index = check(state, product);
        if (index !== -1) {
          state.splice(index, 1);
        }
      } else {
        index = check(state, product);
        if (index !== -1) {
          state[index].amount -= 1;
        }
      }

      localStorage.setItem("data", JSON.stringify(state));
      return [...state];
    default:
      return [...state];
  }
};

let check = (cart, product) => {
  let index = -1;
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id === product.id) {
        index = i;
      }
    }
  }
  return index;
};

export default cart;
