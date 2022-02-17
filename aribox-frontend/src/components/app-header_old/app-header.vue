<template>
  <div class="app-header">
    <div v-if="isLaptop" class="laptop-header">
      <img src="@/assets/img/Home.svg" class="app-header__logo" />

      <div class="app-header__links">
        <router-link :to="{ name: 'main-page' }" class="app-header__links-link">
          Главная
        </router-link>

        <router-link :to="{ name: 'cart' }" class="app-header__links-link">
          Корзина
        </router-link>

        <router-link :to="{name: 'orders'}" class="app-header__links-link">
          Заказы
        </router-link>

        <a @click="login" class="app-header__links-link app-header__links-link-login" v-if="!checkAuth">
          Войти
        </a>

        <a @click="logout" class="app-header__links-link app-header__links-link-login" v-if="checkAuth">
          Выйти
        </a>
      </div>
    </div>

    <div v-if="!isLaptop" class="burger-header">
      <img src="@/assets/icons/burger.svg" @click="showMobileHeader = !showMobileHeader">
    </div>

    <div v-if="!isLaptop" class="mobile-header" :style="{right: showMobileHeader ? '0px' : '-200px'}">
      <img src="@/assets/img/logo.png" class="app-header__logo" />

      <router-link :to="{ name: 'main-page' }" class="app-header__links-link">
        Главная
      </router-link>

      <router-link :to="{ name: 'cart' }" class="app-header__links-link">
        Корзина
      </router-link>

      <router-link :to="{name: 'orders'}" class="app-header__links-link">
        Заказы
      </router-link>

      <a @click="login" class="app-header__links-link app-header__links-link-login" v-if="!checkAuth">
        Войти
      </a>

      <a @click="logout" class="app-header__links-link app-header__links-link-login" v-if="checkAuth">
        Выйти
      </a>
    </div>
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
  },

  methods: {
    ...mapActions(['LOGIN','LOGOUT']),

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
