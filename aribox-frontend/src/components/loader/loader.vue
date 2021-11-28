<template>
  <div class="loader">
    <pulse-loader color="white" :loading="isLoading" />
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
  name: 'loader',

  components: {
    PulseLoader
  },

  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
