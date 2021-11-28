<template>
  <div class="app-app-header">
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

      <router-link :to="{name: 'login'}" class="app-header__links-link app-header__links-link-login" v-if="!checkAuth">
        Войти
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'app-app-header',

  computed:{
    ...mapState(['isAuth']),

    checkAuth() {
      return this.isAuth
    }
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
