<template>
  <div class="products">
    <div class="products__items">
      <TransitionComponent>
        <template>
          <Loader :isLoading="isLoading" v-if="isLoading"/>

          <h2 v-if="isError">Не удается загрузить товары</h2>

          <div class="products__items-list" v-if="!isLoading && !isError">
            <AppProduct
              :product="product"
              class="products__items-list-product"
              v-for="product in products"
              :key="product.id"
            />
          </div>
        </template>
      </TransitionComponent>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from 'Components/loader';
import AppProduct from 'Components/app-product';
import TransitionComponent from 'Components/transition-component';

export default {
  name: 'products',

  components: {
    Loader,
    AppProduct,
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
