export default {
  SET_USER(state,data) {
    state.user = data;
  },
  SET_AUTH(state,value) {
    state.isAuth = value;
  },
  SET_CART(state, data) {
    state.cart = data
  }
};
