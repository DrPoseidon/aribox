import Vue from 'vue';
import VueRouter from 'vue-router';
import {MainPage, Product, Login, Registration, Payment} from 'Views'
import store from './store';

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
  await store.dispatch('CHECK_AUTH');

  if((to.name === 'login' || to.name === 'registration') && store.state.isAuth) {
    next({name: 'main-page'});
  }

  next();
})

export default router


