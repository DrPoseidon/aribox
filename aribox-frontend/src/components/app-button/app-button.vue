<template>
    <button
        :type="type"
        class="app-button"
        @click="clicked">
      Войти
    </button>
</template>

<script>
export default {
  name: "app-button",

  props: {
    type: {
      type: String,
      default: 'submit'
    }
  },

  methods: {
    clicked() {
      this.$emit('buttonClick');
    }
  }
}
</script>

<style lang="scss">
  @import './styles.scss';
</style>
