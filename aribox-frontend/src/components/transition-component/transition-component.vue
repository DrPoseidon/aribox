<template>
  <transition name="fade">
    <slot />
  </transition>
</template>
<script>
export default {
  name: 'transition-component'
};
</script>
<style lang="scss">
@import './styles.scss';
</style>
