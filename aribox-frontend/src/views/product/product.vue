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

          <Swiper ref="swiper" :options="swiperOptions" class="swiper">
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
              {{ product.title }}
            </h2>
            <p
              v-if="product.description"
              class="product__main-block-info-description"
            >
              {{ product.description }}
            </p>
            <p
              v-if="product.materials"
              class="product__main-block-info-material"
            >
              материал: {{ product.materials }}
            </p>
            <div v-if="product.size">
              <p
                v-for="size in product.size"
                :key="size"
                class="product__main-block-info-size"
              >
                размер: {{ size }}
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
          </div>
        </div>
      </template></TransitionComponent
    >
  </div>
</template>

<script>
import TransitionComponent from 'Components/transition-component';
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
    TransitionComponent
  },

  data() {
    return {
      isLoading: false,
      product: {},
      swiper: undefined,
      selectedColorModel: undefined
    };
  },

  methods: {
    ...mapActions(['GET_PRODUCT']),

    async getProduct() {
      const res = await this.GET_PRODUCT(this.$route.params.id);
      if (res) {
        this.product = res;
        this.selectedColorModel = res.mainImage;
      }
    },

    changeActiveSlide(index) {
      if (this.swiper) {
        this.swiper.slideTo(index);
      }
    }
  },

  computed: {
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
      return [this.selectedColorModel, ...this.product.commonImages];
    }
  },

  async mounted() {
    this.isLoading = true;
    await this.getProduct();
    this.isLoading = false;

    this.$nextTick(() => {
      this.swiper = this.$refs?.swiper?.$swiper;
    });
  }
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
