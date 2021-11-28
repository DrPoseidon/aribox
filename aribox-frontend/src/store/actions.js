import {products} from './stubs';
import AuthService from "../services/AuthService";

export default {
  GET_PRODUCTS() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        products.length ? resolve(products) : reject(404);
      }, 1000);
    });
  },

  GET_PRODUCT(context, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (products.length) {
          const product = products.find((product) => {
            return id === product.id;
          });

          product ? resolve(product) : reject(404);
        }
      }, 1000);
    });
  },

  async REGISTRATION(context, data) {
    try {
      const {email,name, password} = data;
      const response = await AuthService.registration(email,name,password);
      return {status: response.status}
    } catch(e) {
      console.log(e.response?.data?.message);
      return {error: e.response?.data?.message}
    }
  },

  async LOGIN({commit}, data) {
    try {
      const {email, password} = data;
      const response = await AuthService.login(email, password);
      commit('SET_USER', response?.data?.userData?.user);
      commit('SET_AUTH', true);
      localStorage.setItem('token',response?.data?.userData?.tokens?.accessToken);
      return {status: response.status}
    } catch(e) {
      console.log(e.response?.data?.message);
      return {error: e.response?.data?.message}
    }
  },


  async REFRESH({commit}) {
    try {
      const response = await AuthService.refresh();
      commit('SET_USER', response?.data?.userData?.user);
      commit('SET_AUTH', true);
      localStorage.setItem('token',response?.data?.userData?.tokens?.accessToken);
    } catch(e) {
      commit('SET_AUTH', false);
      commit('SET_USER', {});
      console.log(e.response?.data?.message);
    }
  },

  async CHECK_AUTH() {
    try {
      const response = await AuthService.checkAuth();
      return response.status;
    } catch(e) {
      console.log(e.response?.data?.message);
      return e.response.status
    }
  }
};
