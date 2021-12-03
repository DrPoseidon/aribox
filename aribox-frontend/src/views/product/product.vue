<template>
  <div class="product">
    <TransitionComponent
      ><template>
        <Loader :isLoading="isLoading" v-if="isLoading" />

        <div class="product__main-block" v-else>
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

          <Swiper ref="swiper" :options="swiperOptions" class="swiper" v-if="images.length">
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

            <ColorModelSelect
              v-if="isColorModel"
              :color-models="product.colorModels"
              :selected-color-model="selectedColorModel"
              @setSelectedColorModel="setSelectedColorModel"
            />
          </div>
        </div>
      </template></TransitionComponent
    >
  </div>
</template>

<script>
import TransitionComponent from 'Components/transition-component';
import ColorModelSelect from 'Components/color-model-select';
import { mapActions } from 'vuex';
import Loader from 'Components/loader';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
const SWIPER_SPACE = 20;

export default {
  name: 'product',

  components: {
    Loader,
    Swiper,
    SwiperSlide,
    TransitionComponent,
    ColorModelSelect
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
    ...mapActions(['GET_PRODUCT']),

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
    }
  },

  computed: {
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
    this.isLoading = false;

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
