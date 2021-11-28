<template>
  <div id="app">
    <Header v-if="!routes.includes(this.$route.name)"/>
    <router-view />
  </div>
</template>

<script>
import Header from 'Components/app-header';

export default {
  name: 'App',

  components: {
    Header,
  },

  data() {
    return {
      routes: ['login', 'registration', 'payment']
    }
  }
};
</script>

<style lang="scss">
@import 'Assets/scss/colors.scss';
@import url('https://fonts.googleapis.com/css?family=Cormorant');
@import url('https://fonts.googleapis.com/css?family=Montserrat');
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-primary);
}
a {
  text-decoration: none;
  color: var(--color-black);
  transition: 0.2s;
  &:hover {
    color: var(--color-brown);
  }
}
#app {
  font-family: 'Cormorant', sans-serif;
}
</style>
