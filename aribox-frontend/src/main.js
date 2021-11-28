import Vue from 'vue';
import App from './App.vue';
import VueMask from 'v-mask';
import router from './router';
import store from './store';

Vue.use(VueMask);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
