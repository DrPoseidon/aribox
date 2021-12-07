<template>
  <div class="cart">

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <div class="cart__body" v-else>
      <div v-for="(product, index) in userCart" :key="`${index}-${product.productId}`" class="cart__body-product">
        <img :src="product.mainImage" alt="" class="cart__body-product-image">
        {{product.name}}
        <span v-if="product.colorModel">
          цвет: {{product.colorModel.colorName}}
        </span>

        {{product.price}} &#x20bd;
      </div>
    </div>

  </div>
</template>

<script>
import Loader from 'Components/loader';

import {mapActions, mapState} from 'vuex';

export default {
  name: "cart",

  components: {
    Loader
  },

  data() {
    return {
      isLoading: false
    }
  },

  computed:{
    ...mapState(['cart']),

    userCart() {
      return this.cart;
    }
  },

  methods:{
    ...mapActions(['GET_CART']),

    async getCart() {
      await this.GET_CART();
    }
  },

  async mounted() {
    this.isLoading = true;
    await this.getCart();
    this.isLoading = false;
  }
};
</script>

<style lang="scss">
  @import './styles.scss';
</style>
