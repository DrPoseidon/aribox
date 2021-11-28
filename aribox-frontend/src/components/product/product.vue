<template>
  <div class="product">
    <router-link :to="{ name: 'product', params: { id: product.id } }">
      <div
        :style="{ backgroundImage: `url('${mainImage}')` }"
        class="product__mainImage"
        @mouseover="mouseOver = true"
        @mouseleave="mouseOver = false"
      >
        <transition name="fade">
          <div
            v-if="mouseOver"
            :style="{
              backgroundImage: `url('${this.product.commonImages[0]}')`
            }"
            class="product__mainImage-commonImage"
          />
        </transition>
      </div>

      <h2>{{ product.title }}</h2>
      <p
        class="product__price"
        style="margin-right:20px"
        v-if="product.discount"
      >
        {{ product.discount }} &#x20bd;
      </p>
      <p
        class="product__price"
        :class="{ 'product__price_line-through': product.discount }"
      >
        {{ product.price }} &#x20bd;
      </p>
    </router-link>

    <div v-if="isColorModel" class="product__dropdown">
      <div
        v-if="selectedColorModel"
        class="product__dropdown-selected"
        @click="dropdown = !dropdown"
      >
        <img class="img" :src="selectedColorModel.image" />
        {{ selectedColorModel.color.name }}
        <img
          src="@/assets/icons/chevron-down.svg"
          :class="[{ '--rotate': dropdown }, 'product__dropdown-selected-icon']"
        />
      </div>
      <TransitionComponent
        ><template>
          <div class="product__dropdown-list" v-if="dropdown">
            <div
              v-for="(model, index) in getColorModel"
              :key="index"
              @click="listElementClick(model)"
              class="product__dropdown-list-element"
            >
              <img class="img" :src="model.image" />
              <p style="margin-right:10px">{{ model.color.name }}</p>
            </div>
          </div>
        </template></TransitionComponent
      >
    </div>
  </div>
</template>

<script>
import TransitionComponent from 'Components/transition-component';
export default {
  name: 'product',

  components: {
    TransitionComponent
  },

  data() {
    return {
      mainImage: this.product.mainImage,
      mouseOver: false,
      selectedColorModel: undefined,
      dropdown: false
    };
  },

  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    isColorModel() {
      return !!this.product?.colorModel;
    },

    getColorModel() {
      return this.product.colorModel.filter((model) => {
        return model !== this.selectedColorModel;
      });
    }
  },

  methods: {
    listElementClick(model) {
      this.selectedColorModel = model;
      this.mainImage = model.image;
      this.dropdown = false;
    }
  },

  mounted() {
    if (this.isColorModel) {
      this.selectedColorModel = this.product.colorModel[0];
    }
  }
};
</script>
<style lang="scss">
@import './styles.scss';
</style>
