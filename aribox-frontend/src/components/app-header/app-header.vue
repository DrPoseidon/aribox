<template>
  <div class="app-header">
    <div v-if="isLaptop" class="app-header__laptop">
      <router-link :to="{ name: 'main-page' }">
        <img src="@/assets/img/Home.svg" class="app-header__laptop-logo" />
      </router-link>

      <div class="app-header__laptop-links">
        <router-link v-for="link in routerLinks" :key="link.name" :to="{ name: link.name }">
          {{ link.text }}
        </router-link>
      </div>

<!--      <a @click="burgerClick" class="app-header__laptop-burger">-->
<!--        <img src="@/assets/icons/burger.svg" class="app-header__laptop-burger-icon">-->
<!--      </a>-->

      <a @click="login" class="app-header__laptop-login" v-if="!checkAuth">
        Войти
      </a>

      <a @click="logout" class="app-header__laptop-login" v-if="checkAuth">
        Выйти
      </a>
    </div>

<!--    <div v-if="!isLaptop" class="burger-header">-->
<!--      <img src="@/assets/icons/burger.svg" @click="showMobileHeader = !showMobileHeader">-->
<!--    </div>-->

<!--    <div v-if="!isLaptop" class="mobile-header" :style="{right: showMobileHeader ? '0px' : '-200px'}">-->
<!--      <img src="@/assets/img/logo.png" class="app-header__logo" />-->

<!--      <router-link :to="{ name: 'main-page' }" class="app-header__links-link">-->
<!--        Главная-->
<!--      </router-link>-->

<!--      <router-link :to="{ name: 'cart' }" class="app-header__links-link">-->
<!--        Корзина-->
<!--      </router-link>-->

<!--      <router-link :to="{name: 'orders'}" class="app-header__links-link">-->
<!--        Заказы-->
<!--      </router-link>-->


<!--    </div>-->
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

const LAPTOP_WIDTH = 1024;

export default {
  name: 'app-app-header',

  data() {
    return {
      isLaptop: false,
      showMobileHeader: false,
    }
  },

  computed:{
    ...mapState(['isAuth', 'user']),

    checkAuth() {
      return this.isAuth;
    },

    routerLinks() {
      return [
        {
          text: 'Товары',
          name: 'products'
        },
        {
          text: 'Корзина',
          name: 'cart'
        },
        {
          text: 'Заказы',
          name: 'orders'
        }
      ]
    }
  },

  methods: {
    ...mapActions(['LOGIN','LOGOUT']),

    burgerClick() {

    },

    async logout() {
      await this.LOGOUT();

      window.location.reload();
    },

    async login() {
      await this.$router.push('/login');
    },

    /**
     * функция, которая реагирует на изменения размера окна
     */
    resize() {
      if (window.innerWidth < LAPTOP_WIDTH) {
        // если размер окна меньше LAPTOP_WIDTH (1024)
        this.isLaptop = false;
      }
      if (window.innerWidth >= LAPTOP_WIDTH) {
        // если размер окна больше LAPTOP_WIDTH (1024)
        this.isLaptop = true;
      }
    }
  },

  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
