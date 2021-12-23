<template>
  <div class="product">
    <Loader :isLoading="isLoading" v-if="isLoading" />

    <div class="product__main-block" v-show="!isLoading">
      <div style="display:flex;" class="swiper-block">
        <div class="product__main-block-mini-images" v-if="images.length > 1">
          <img
            :src="img"
            class="product__main-block-mini-images-img"
            :class="{
            'product__main-block-mini-images-img_selected':
              index === activeSlide
          }"
            v-for="(img, index) in images"
            :key="`img-${index}`"
            @click="changeActiveSlide(index)"
          />
        </div>

        <Swiper ref="swiper" :options="swiperOptions" class="swiper" v-show="images.length">
          <SwiperSlide v-for="img in images" :key="img" class="swiper-slide"
          ><img :src="img" class="swiper-img"
          /></SwiperSlide>

          <div class="swiper-pagination" slot="pagination" />

          <img
            slot="button-prev"
            src="@/assets/icons/chevron-down.svg"
            class="swiper-button-prev swiper-button"
            :class="{ 'swiper-button_not': activeSlide === 0 }"
          />

          <img
            slot="button-next"
            src="@/assets/icons/chevron-down.svg"
            class="swiper-button-next swiper-button"
            :class="{
            'swiper-button_not': activeSlide === images.length - 1
          }"
          />
        </Swiper>
      </div>

      <div class="product__main-block-info">
        <h2 class="product__main-block-info-title">
          {{ product.name }}
        </h2>
        <p
          v-if="product.description"
          class="product__main-block-info-description"
        >
          описание: {{ product.description }}
        </p>
        <p
          v-if="product.materials"
          class="product__main-block-info-material"
        >
          материал: {{ product.materials }}
        </p>
        <div v-if="isProductSizes">
          <p
            v-for="size in product.sizes"
            :key="size.sizeId"
            class="product__main-block-info-size"
          >
            размер: {{ size.size }}
          </p>
        </div>
        <p
          class="product__main-block-info-price"
          style="margin-right:20px"
          v-if="product.discount"
        >
          {{ product.discount }} &#x20bd;
        </p>
        <p
          class="product__main-block-info-price"
          :class="{
            'product__main-block-info-price_line-through': product.discount
          }"
        >
          {{ product.price }} &#x20bd;
        </p>

        <p v-if="!product.quantity" class="product__main-block-info-quantity">
          Нет в наличии
        </p>

        <AppButton
          v-if="getAuth && product.quantity && !checkProduct"
          @buttonClick="addToCart"
          class="product__main-block-info-cart-button"
        >
          <template #text>
            В корзину
          </template>
        </AppButton>

        <AppButton
          v-if="getAuth && product.quantity && checkProduct"
          @buttonClick="removeFromCart"
          class="product__main-block-info-cart-button"
        >
          <template #text>
            Убрать из корзины
          </template>
        </AppButton>

        <ColorModelSelect
          v-if="isColorModel"
          :color-models="product.colorModels"
          :selected-color-model="selectedColorModel"
          @setSelectedColorModel="setSelectedColorModel"
        />

        <div v-if="!getAuth" class="info">
          Чтобы добавить товар в корзину - авторизуйтесь
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorModelSelect from 'Components/color-model-select';
import { mapActions, mapState } from 'vuex';
import Loader from 'Components/loader';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import AppButton from 'Components/app-button/app-button';
const SWIPER_SPACE = 20;

export default {
  name: 'product',

  components: {
    AppButton,
    Loader,
    Swiper,
    SwiperSlide,
    ColorModelSelect,
  },

  data() {
    return {
      isLoading: false,
      product: {},
      swiper: undefined,
      mainImage: undefined,
      selectedColorModel: undefined
    };
  },

  methods: {
    ...mapActions(['GET_PRODUCT', 'ADD_TO_CART', 'REMOVE_FROM_CART']),

    async addToCart() {
      const product = {
        productId: this.product.productId,
        price: this.product.price,
        discount: this.product.discount,
        name: this.product.name,
        mainImage: this.mainImage
      }

      if (this.selectedColorModel) {
        product.colorModel = {
          colorModelId: this.selectedColorModel.colorModelId,
          colorName: this.selectedColorModel.colorName
        };
      }

      const res = await this.ADD_TO_CART({product, userId: this.user.id});
      console.log(res);
    },

    async removeFromCart() {
      const product = this.cart.find(el => {
        if(this.product.productId === el.productId) {
          if(el.colorModel && this.selectedColorModel) {
            return this.selectedColorModel.colorModelId === el.colorModel.colorModelId
          } else {
            return this.product.productId === el.productId;
          }
        }
      });

      await this.REMOVE_FROM_CART(product);
    },

    setSelectedColorModel(model) {
      this.selectedColorModel = model;
      this.mainImage = model.image;
    },

    async getProduct() {
      const res = await this.GET_PRODUCT(this.$route.params.id);
      if (res.status === 200) {
        this.product = res.data;
        this.mainImage = res.data?.mainImage;
      }
    },

    changeActiveSlide(index) {
      if (this.swiper) {

        this.swiper.slideTo(index);
      }
    },
  },

  computed: {
    ...mapState(['isAuth', 'cart', 'user']),

    checkProduct() {
      const res = this.cart.find(el => {
        if(this.product.productId === el.productId) {
          if(el.colorModel && this.selectedColorModel) {

            return this.selectedColorModel.colorModelId === el.colorModel.colorModelId
          } else {
            return this.product.productId === el.productId;
          }
        }
      });

      return !!res;
    },

    getAuth() {
      return this.isAuth
    },

    isColorModel() {
      return !!this.product?.colorModels?.length;
    },

    isProductSizes() {
      return this.product?.sizes?.length
    },

    swiperOptions() {
      return {
        spaceBetween: SWIPER_SPACE,
        threshold: 20,
        observer: true,
        observeParents: true,
        slidePerView: 1,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      };
    },

    activeSlide() {
      if (this.swiper) {
        return this.swiper.activeIndex;
      }
      return 0;
    },

    images() {
      let images = [];

      if(this.product?.commonImages?.length) {
        images = this.product.commonImages.reduce((acc, image) => {
          acc.push(image.url);
          return acc;
        },[]);
      }
      return [this.mainImage, ...images];
    }
  },

  async mounted() {
    this.isLoading = true;
    await this.getProduct();
    setTimeout(() => {
      this.isLoading = false;
    }, 700);

    this.$nextTick(() => {
      this.swiper = this.$refs?.swiper?.$swiper;
    });

    if (this.isColorModel) {
      this.selectedColorModel = this.product.colorModels[0];
    }
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
