<template>
  <div class="color-model-select">
    <div
      v-if="selectedColorModel"
      class="color-model-select-selected"
      @click="dropdown = !dropdown"
    >
      <img class="img" :src="selectedColorModel.image" />
      {{ selectedColorModel.colorName }}
      <img
        src="@/assets/icons/chevron-down.svg"
        :class="[{ '--rotate': dropdown }, 'color-model-select-selected-icon']"
      />
    </div>

    <TransitionComponent>
      <template>
        <div class="color-model-select-list" v-if="dropdown">
          <div
            v-for="(model, index) in getColorModel"
            :key="index"
            @click="listElementClick(model)"
            class="color-model-select-list-element"
          >
            <img class="img" :src="model.image" />
            <p style="margin-right:10px">{{ model.colorName }}</p>
          </div>
        </div>
      </template>
    </TransitionComponent
    >
  </div>
</template>

<script>
import TransitionComponent from 'Components/transition-component';

export default {
  name: "color-model-select.vue",

  components: {
    TransitionComponent
  },

  data() {
    return {
      dropdown: false
    }
  },

  props: {
    selectedColorModel: {
      type: Object,
      default: () => ({})
    },
    colorModels: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    getColorModel() {
      return this.colorModels.filter((model) => {
        return model !== this.selectedColorModel;
      });
    }
  },

  methods: {
    listElementClick(model) {
      this.dropdown = false;
      this.$emit('setSelectedColorModel', model);
    },
  },
};
</script>

<style lang="scss">
  @import './styles.scss';
</style>
