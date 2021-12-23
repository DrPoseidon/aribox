<template>
  <div class="orders">

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <h4 v-if="!orders.length && !isLoading" class="orders__empty">
      У вас еще нет заказов
    </h4>

    <div v-if="orders.length && !isLoading">
      <div v-for="order in orders" :key="order.id">

        <div class="orders__body-products" style="margin-bottom: 20px; border: 1px solid black; padding: 10px">

          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 20px; margin-bottom: 10px">
            <span>
              {{order.date}}
            </span>

            <span>
              Итого: {{order.total}}&#x20bd;
            </span>
          </div>

          <div v-for="(product, index) in order.cart" :key="`${index}-${product.productId}`" class="orders__body-products-product">
            <img :src="product.mainImage" alt="" class="orders__body-products-product-image">

            <div class="orders__body-products-product-titles">
          <span class="orders__body-products-product-titles-name">
            {{product.name}}
          </span>

              <span v-if="product.colorModel" class="orders__body-products-product-titles-colorName">
            цвет: {{product.colorModel.colorName}}
          </span>
            </div>

            <div class="orders__body-products-product-right">
              <div class="orders__body-products-product-right-quantity">
                <div class="orders__body-products-product-right-quantity-value">
                  <span >{{product.quantity}}</span>
                </div>
              </div>

              <span class="orders__body-products-product-right-price">
            {{product.price * product.quantity}} &#x20bd;
          </span>
            </div>
          </div>
        </div>
      </div>
    </div>




  </div>
</template>

<script>
import Loader from 'Components/loader';

import {mapActions} from 'vuex';

export default {
  name: "orders",

  components: {
    Loader
  },

  data() {
    return {
      isLoading: false,
      quantity: [],
      orders: [],
    }
  },

  computed:{

    userCart() {
      return this.orders;
    },

    getTotal() {
      return this.orders.reduce((acc ,el) => {
        acc+= el.quantity * el.price;
        return acc;
      },0)
    }
  },

  methods:{
    ...mapActions(['GET_ORDERS']),

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

    async getOrders() {
      this.orders = await this.GET_ORDERS();
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
    await this.getOrders();

    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }
};
</script>

<style lang="scss">
  @import './styles.scss';
</style>
