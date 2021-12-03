<template>
  <div class="main-page">
    <div class="main-page__products">
      <TransitionComponent>
        <template>
          <Loader :isLoading="isLoading" v-if="isLoading"/>

          <h2 v-if="isError">Не удается загрузить товары</h2>

          <div class="main-page__products-list" v-if="!isLoading && !isError">
            <Product
              :product="product"
              class="main-page__products-list-product"
              v-for="product in products"
              :key="product.id"
            />
          </div>
      </template
      ></TransitionComponent>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from 'Components/loader';
import Product from 'Components/product';
import TransitionComponent from 'Components/transition-component';

export default {
  name: 'main-page',

  components: {
    Loader,
    Product,
    TransitionComponent
  },

  data() {
    return {
      isLoading: false,
      isError: false,
      products: []
    };
  },

  computed: {
    isColorModel() {
      return !!this.product?.colorModels.length;
    },
  },

  methods: {
    ...mapActions(['GET_PRODUCTS']),

    async getProducts() {
      const res = await this.GET_PRODUCTS();
      if (res) {
        this.products = res.data;
      }
    },

    setSelectedColorModel(model) {
      this.selectedColorModel = model;
      this.mainImage = model.image;
    },
  },

  async mounted() {
    this.isLoading = true;
    await this.getProducts();

    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }
};
</script>
<style lang="scss">
@import './styles.scss';
</style>
