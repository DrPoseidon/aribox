import Vue from 'vue';
import VueRouter from 'vue-router';
import {MainPage, Product, Login, Registration, Payment} from 'Views'
import store from './store'

Vue.use(VueRouter);

const router =  new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: MainPage, name: 'main-page' },
    { path: '/product/:id', name: 'product', component: Product },
    { path: '/login', name: 'login', component: Login },
    { path: '/registration', name: 'registration', component: Registration },
    {path: '/payment', name: 'payment', component: Payment}
  ]
});

router.beforeEach(async (to, from, next) => {
  const status = await store.dispatch('CHECK_AUTH');

  if(status === 401) {
    store.commit('SET_AUTH', false);
    await store.dispatch('REFRESH');
  } else {
    if(to.name === 'login' || to.name === 'registration') {
      if(from.name) {
        await router.push({name: from.name});
      } else {
        await router.push('/');
      }
    }
    store.commit('SET_AUTH', true);
  }

  next();
})

export default router


