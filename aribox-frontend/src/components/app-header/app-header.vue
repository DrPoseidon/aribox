<template>
  <div class="app-header">
    <img src="@/assets/img/logo.png" class="app-header__logo" />

    <div class="app-header__links">
      <router-link :to="{ name: 'main-page' }" class="app-header__links-link">
        Главная
      </router-link>

      <router-link to class="app-header__links-link">
        Название
      </router-link>

      <router-link to class="app-header__links-link">
        Название
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

export default {
  name: 'app-app-header',

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
    }
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
