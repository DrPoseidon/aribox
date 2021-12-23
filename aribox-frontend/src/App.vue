<template>
  <div id="app">
    <Header v-if="!routes.includes(this.$route.name)"/>
    <router-view :style="{'margin-top': isLaptop ? '0px' : '70px'}" class="router-view"/>
  </div>
</template>

<script>
import Header from 'Components/app-header';

const LAPTOP_WIDTH = 1024;

export default {
  name: 'App',

  components: {
    Header,
  },

  data() {
    return {
      routes: ['login', 'registration', 'payment'],
      isLaptop: false,
    }
  },

  methods: {
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

.router-view {
  margin: 0 100px;
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
  margin: 0 40px;
}
</style>
