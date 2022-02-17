<template>
  <div class="app-input">
    <label
        :style="getStyle"
        class="app-input__label">
      {{label}}
    </label>

    <input
        :type="type"
        v-model="value"
        class="app-input__input"
        :class="{'app-input__input_error': error.length}"
        @focus="changeFocus( true)"
        @blur="changeFocus(false)"
        @input="sendValue">

    <span class="app-input__error">
      {{error}}
    </span>
  </div>
</template>

<script>
import {debounce} from 'lodash';
const INPUT_PAUSE = 200;

export default {
  name: "app-input",

  data() {
    return {
      focused: false,
      value: ''
    }
  },

  props: {
    error: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: ''
    }
  },

  methods: {
    changeFocus(value) {
      this.focused = value;
    },

     sendValue: debounce( function () {
       this.$emit('setValue', this.value);
     }, INPUT_PAUSE)


  },

  computed: {
    getStyle() {
      return {'bottom': this.focused ? '32px' : '7px', 'color': !this.focused && this.value ? 'transparent' : 'black'}
    }
  }
}
</script>

<style lang="scss">
  @import './styles.scss';
</style>
