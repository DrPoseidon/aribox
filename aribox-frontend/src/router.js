import Vue from 'vue';
import VueRouter from 'vue-router';
import { MainPage, Product, Login, Registration, Payment, Cart, Orders, Products } from 'Views'
import store from './store';

Vue.use(VueRouter);

const router =  new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: MainPage, name: 'main-page' },
    { path: '/product/:id', name: 'product', component: Product },
    { path: '/login', name: 'login', component: Login },
    { path: '/products', name: 'products', component: Products },
    { path: '/registration', name: 'registration', component: Registration },
    {path: '/payment', name: 'payment', component: Payment},
    {path: '/cart', name: 'cart', component: Cart},
    {path: '/orders', name: 'orders', component: Orders}
  ]
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('CHECK_AUTH');

  if((to.name === 'login' || to.name === 'registration') && store.state.isAuth) {
    next({name: 'main-page'});
  }

  if((to.name === 'cart' || to.name === 'orders') && !store.state.isAuth) {
    next({name: 'main-page'});
  }

  next();
})

export default router


