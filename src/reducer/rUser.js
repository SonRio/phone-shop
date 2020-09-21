import * as types from '../constant/ActionType';
// let dbUser = JSON.parse(localStorage.getItem('userLogin'))
// let dataUser =  {};

const users = (state = [] , action) => {
    switch (action.type) {
      case types.GET_USER:
        state.push(action.user[0],action.user[1]);
        return [...state]
      case types.REMOVE_USER:
        state.splice(0,state.length);       
        return [...state]  
      default:
        return [...state];
    }
  };
  
export default users;
