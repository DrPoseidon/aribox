import {AuthService, ProductsService} from '../services'

export default {
  async GET_PRODUCTS() {
    try{
      const response = await ProductsService.getAllProducts();
      return {data: response.data, status: response.status};
    } catch(e) {
      console.log(e);
    }
  },

  async GET_PRODUCT(context, id) {
    try {
      const response = await ProductsService.getProductById(id);
      return {data: response.data, status: response.status};
    } catch(e) {
      console.log(e);
    }
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

  async LOGIN(context, data) {
    try {
      const {email, password} = data;
      const response = await AuthService.login(email, password);
      console.log(response);
      // commit('SET_USER', response?.data?.userData?.user);
      // commit('SET_AUTH', true);
      // localStorage.setItem('token',response?.data?.userData?.tokens?.accessToken);
      return {status: response.status}
    } catch(e) {
      console.log(e.response?.data?.message);
      return {error: e.response?.data?.message}
    }
  },

  async REFRESH({commit}) {
    try {
      console.log('refresh')
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
      return await AuthService.checkAuth();
    } catch(e) {
      console.log(e.response?.data?.message);
      return e.response
    }
  }
};
