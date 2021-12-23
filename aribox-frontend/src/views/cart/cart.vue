<template>
  <div class="cart">

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <h4 v-if="!userCart.length && !isLoading" class="cart__empty">
      Корзина пуста
    </h4>

    <div class="cart__body" v-else-if="userCart.length && !isLoading" style="display: flex; flex-direction: row">
      <div class="cart__body-products">
        <div v-for="(product, index) in userCart" :key="`${index}-${product.productId}`" class="cart__body-products-product">
          <img :src="product.mainImage" alt="" class="cart__body-products-product-image">

          <div class="cart__body-products-product-titles">
            <span class="cart__body-products-product-titles-name">
              {{product.name}}
            </span>

            <span v-if="product.colorModel" class="cart__body-products-product-titles-colorName">
              цвет: {{product.colorModel.colorName}}
            </span>
          </div>

          <div class="cart__body-products-product-right">
            <div class="cart__body-products-product-right-quantity">
              <img src="@/assets/icons/minus.svg" class="cart__body-products-product-right-quantity-icon" v-if="product.quantity > 1" @click="changeQuantity(product, 'minus')">

              <div class="cart__body-products-product-right-quantity-value">
                <span >{{product.quantity}}</span>
              </div>

              <img src="@/assets/icons/plus.svg" class="cart__body-products-product-right-quantity-icon" v-if="increment(product)" @click="changeQuantity(product, 'plus')">
            </div>

            <span class="cart__body-products-product-right-price">
              {{product.price * product.quantity}} &#x20bd;
            </span>

            <img src="@/assets/icons/close.svg" class="cart__body-products-product-right-remove" @click="removeFromCart(product)">
          </div>
        </div>
      </div>

      <div class="cart__body-total">
        <div >
          Итого: {{getTotal}} &#x20bd;
        </div>

        <AppButton @buttonClick="checkout">
          <template #text>
            Оформить заказ
          </template>
        </AppButton>
      </div>
    </div>



  </div>
</template>

<script>
import Loader from 'Components/loader';

import {mapActions, mapState} from 'vuex';
import AppButton from '../../components/app-button/app-button';

export default {
  name: "cart",

  components: {
    AppButton,
    Loader
  },

  data() {
    return {
      isLoading: false,
      quantity: [],
    }
  },

  computed:{
    ...mapState(['cart']),

    userCart() {
      return this.cart;
    },

    getTotal() {
      return this.cart.reduce((acc ,el) => {
        acc+= el.quantity * el.price;
        return acc;
      },0)
    }
  },

  methods:{
    ...mapActions(['GET_CART', 'REMOVE_FROM_CART', 'CHANGE_PRODUCT_QUANTITY', 'GET_NUMBER_OF_PRODUCTS', 'CHECKOUT']),

    async checkout() {
      console.log('checkout')
      const res = await this.CHECKOUT(this.getTotal);
      console.log(res);
    },

    increment(product) {
      if (this.quantity.length) {
        const {quantity} = this.quantity.find(el => {
          return el.productId === product.productId
        });

        return product.quantity < quantity;
      }
    },

    async changeQuantity(product, value) {
      this.isLoading = true;
      await this.CHANGE_PRODUCT_QUANTITY({product, value});

      setTimeout(() => {
        this.isLoading = false;
      },700)
    },

    async getCart() {
      await this.GET_CART();
      const ids = this.cart.reduce((acc, el) => {
        acc.push(el.productId);
        return acc;
      }, [])
      const res = await this.GET_NUMBER_OF_PRODUCTS(ids);
      this.quantity = res?.data?.quantity
    },

    async removeFromCart(product) {
      this.isLoading = true;
      await this.REMOVE_FROM_CART(product);

      setTimeout(() => {
        this.isLoading = false;
      },700)
    },
  },

  async mounted() {
    this.isLoading = true;
    await this.getCart();

    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }
};
</script>

<style lang="scss">
  @import './styles.scss';
</style>
