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

  async LOGIN({commit}, data) {
    try {
      const {email, password} = data;
      const response = await AuthService.login(email, password);
      const token = response?.data?.userData?.tokens?.accessToken
      const user = response?.data?.userData?.user;

      commit('SET_USER', user);
      commit('SET_AUTH', true);
      localStorage.setItem('token', token);

      return {status: response.status}
    } catch(e) {
      console.log(e.response?.data?.message);
      return {error: e.response?.data?.message}
    }
  },

  async REFRESH() {
    try {
      return await AuthService.refresh();
    } catch(e) {
      // console.log('REFRESH', e.response?.data?.message);
      return e.response;
    }
  },

  async CHECK_AUTH({commit, state, dispatch}) {
    try {
      const isAuth = await AuthService.checkAuth();

      if (!state.isAuth && isAuth.status === 200) {
        commit('SET_AUTH', true);
      }
    } catch(e) {
      // console.log('CHECK_AUTH', e.response?.data?.message);

      const refreshData = await dispatch('REFRESH');

      if(refreshData.status === 200) {
        const token = refreshData.data.userData.tokens.accessToken;
        localStorage.setItem('token', token);

        commit('SET_AUTH', true);
      }

      if (state.isAuth && refreshData.status === 401) {
        commit('SET_USER', {});
        commit('SET_AUTH', false);
      }
    }
  },

  async LOGOUT({commit, state}) {
    try {
      const {email} = state.user;
      await AuthService.logout(email);

      commit('SET_USER', {});
      commit('SET_AUTH', false);

      return {status: 200};
    } catch(e) {
      console.log(e);
    }
  }
};
