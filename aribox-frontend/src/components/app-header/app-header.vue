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

      <a @click="burgerClick" class="app-header__laptop-burger">
        <img src="@/assets/icons/burger.svg" class="app-header__laptop-burger-icon">
      </a>

<!--      <a @click="login" class="app-header__laptop-login" v-if="!checkAuth">-->
<!--        Войти-->
<!--      </a>-->

<!--      <a @click="logout" class="app-header__laptop-login" v-if="checkAuth">-->
<!--        Выйти-->
<!--      </a>-->
    </div>

    <div class="app-header__laptop-mini" :style="getMiniHeaderStyles">
      <router-link :to="{ name: 'main-page' }">
        <img src="@/assets/img/Home-white.svg" class="app-header__laptop-mini-logo" />
      </router-link>

      <a @click="burgerClick" class="app-header__laptop-mini-burger">
        <img src="@/assets/icons/burger-white.svg" class="app-header__laptop-mini-burger-icon">
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
      /**
       * флаг того, является ли разрешение больше 1024px
       */
      isLaptop: false,
      /**
       * флаг отображения мобильного хедера
       */
      showMobileHeader: false,
      /**
       * позиция хедера на экране по y
       */
      headerPosition: undefined,
      /**
       * высота блока мини хедера
       */
      miniHeaderLength: 0
    }
  },

  computed:{
    ...mapState(['isAuth', 'user']),

    /**
     * получение стилей мини хедера
     * @returns {{}}
     */
    getMiniHeaderStyles() {
      const styles = {};

      if (this.headerPosition >= 0) {
        styles.top = `-${this.miniHeaderLength}px`;
      }

      return styles;
    },

    /**
     * проверка на авторизацию
     * @returns {boolean}
     */
    checkAuth() {
      return this.isAuth;
    },

    /**
     * ссылки хедера
     * @returns {[{name: string, text: string}, {name: string, text: string}, {name: string, text: string}]}
     */
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

    /**
     * событие по нажатии на бургер-батн
     */
    burgerClick() {

    },

    /**
     * выход из системы
     * @returns {Promise<void>}
     */
    async logout() {
      await this.LOGOUT();
      window.location.reload();
    },

    /**
     * переход на страницу логина
     * @returns {Promise<void>}
     */
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
    },

    /**
     * функция, вызываемая при скролле
     */
    scroll() {
      const header = document.querySelector('.app-header');
      this.headerPosition = header.getBoundingClientRect().bottom + this.miniHeaderLength;
    }
  },

  mounted() {
    this.miniHeaderLength = document.querySelector('.app-header__laptop-mini')?.clientHeight;
    this.resize();
    this.scroll();
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.scroll)
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
