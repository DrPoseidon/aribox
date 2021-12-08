import {AuthService, ProductsService} from '../services';

export default {
  async GET_PRODUCTS() {
    try{
      const response = await ProductsService.getAllProducts();
      return {data: response.data, status: response.status};
    } catch(e) {
      console.log(e.response);
    }
  },

  async GET_PRODUCT(context, id) {
    try {
      const response = await ProductsService.getProductById(id);
      return {data: response.data, status: response.status};
    } catch(e) {
      console.log(e.response);
    }
  },

  async REGISTRATION(context, data) {
    try {
      const {email,name, password} = data;
      const response = await AuthService.registration(email,name,password);
      return {status: response.status}
    } catch(e) {
      console.log(e.response);
      return {error: e.response?.data?.message}
    }
  },

  async LOGIN({commit}, reqData) {
    try {
      const {email, password} = reqData;
      const {data: {userData, cart}, status} = await AuthService.login(email, password);
      const token = userData?.tokens?.accessToken
      const user = userData?.user;

      commit('SET_CART', cart)
      commit('SET_USER', user);
      commit('SET_AUTH', true);
      localStorage.setItem('token', token);

      return {status: status}
    } catch(e) {
      console.log(e.response);
      return {error: e.response?.data?.message}
    }
  },

  async REFRESH() {
    try {
      return await AuthService.refresh();
    } catch(e) {
      console.log(e.response);
      return e.response;
    }
  },

  async CHECK_AUTH({commit, state, dispatch}) {
    try {
      const token = localStorage.getItem('token')
      const isAuth = await AuthService.checkAuth(token);

      if (!state.isAuth && isAuth?.status === 200) {
        commit('SET_AUTH', true);
      }
    } catch(e) {
      console.log(e.response);

      const refreshData = await dispatch('REFRESH');

      if(refreshData?.status === 200) {
        const token = refreshData.data.userData.tokens.accessToken;
        localStorage.setItem('token', token);
        commit('SET_AUTH', true);
        window.location.reload();
      }

      if (state.isAuth && refreshData?.status === 401) {
        // commit('SET_USER', {});
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
      localStorage.removeItem('token');

      return {status: 200};
    } catch(e) {
      console.log(e.response);
    }
  },

  async ADD_TO_CART({dispatch}, data) {
    try {
      const response = await AuthService.addToCart(data);
      await dispatch('GET_CART');
      return response;
    } catch(e) {
      console.log(e.response)
      if (e?.response?.status === 401) {
        await dispatch('CHECK_AUTH');
      }
    }
  },

  async REMOVE_FROM_CART({dispatch, state, commit}, product) {
    try {
      const data = {userId: state.user.id, product}
      const response = await AuthService.removeFromCart(data);
      commit('SET_CART', response.data.cart);
      return response.status;
    } catch(e) {
      console.log(e.response)
      if (e?.response?.status === 401) {
        await dispatch('CHECK_AUTH');
      }
    }
  },

  async GET_CART({state, commit, dispatch}) {
    try {
      const {id} = state.user;
      const response = await AuthService.getCart(id);
      await commit('SET_CART', response.data);
      return response.status;
    } catch(e) {
      console.log(e.response);
      if (e?.response?.status === 401) {
        await dispatch('CHECK_AUTH');
      }
    }
  },

  async CHANGE_PRODUCT_QUANTITY({state, commit, dispatch}, data) {
    try {
      const {id} = state.user;
      const response = await AuthService.changeProductQuantity({...data, userId: id});
      commit('SET_CART', response.data.cart);
      return response.status;
    } catch(e) {
      console.log(e.response);
      if (e?.response?.status === 401) {
        await dispatch('CHECK_AUTH');
      }
    }
  },

  async GET_NUMBER_OF_PRODUCTS(context, ids) {
    try {
      return await ProductsService.getNumberOfProducts(ids);
    } catch(e) {
      console.log(e.response);
    }
  }
};
