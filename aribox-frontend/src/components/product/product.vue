<template>
  <div class="product">
    <router-link :to="{ name: 'product', params: { id: product.productId } }">
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
              backgroundImage: `url('${getHoverImage(product.commonImages[0])}')`
            }"
            class="product__mainImage-commonImage"
          />
        </transition>
      </div>

      <h2>{{ product.name }}</h2>
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

      <p class="product__quantity" v-if="!product.quantity">
        Нет в наличии
      </p>
    </router-link>

    <ColorModelSelect
      v-if="isColorModel"
      :color-models="product.colorModels"
      :selected-color-model="selectedColorModel"
      @setSelectedColorModel="setSelectedColorModel"
    />
  </div>
</template>

<script>
import ColorModelSelect from 'Components/color-model-select';

export default {
  name: 'product',

  components: {
    ColorModelSelect
  },

  data() {
    return {
      mainImage: this.product.mainImage,
      mouseOver: false,
      selectedColorModel: undefined,
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
      return !!this.product?.colorModels.length;
    },
  },

  methods: {
    setSelectedColorModel(model) {
      this.selectedColorModel = model;
      this.mainImage = model.image;
    },

    getHoverImage(commonImage) {
      return commonImage?.url;
    }
  },

  mounted() {
    if (this.isColorModel) {
      this.selectedColorModel = this.product.colorModels[0];
    }
  }
};
</script>
<style lang="scss">
@import './styles.scss';
</style>
