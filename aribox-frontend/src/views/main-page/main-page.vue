<template>
  <div class="main-page">
    <div class="main-page__swiper-block">
      <div class="main-page__swiper-block-text">
        <span class="main-page__swiper-block-text-item">
          Рады приветствовать в магазине товаров для дома
        </span>

        <h3 class="main-page__swiper-block-text-name">
          Aribox!
        </h3>
        <br>
        <br>
        <span class="main-page__swiper-block-text-item">
          Здесь вы сможете найти самые красивые, тщательно отобранные товары для дома
        </span>
      </div>

      <div class="main-page__swiper-block-filter"/>

      <Swiper ref="swiper" :options="swiperOptions" class="main-page__swiper-block-swiper">
        <SwiperSlide v-for="image in getImages" :key="image" class="main-page__swiper-block-swiper-slide">
          <div class="main-page__swiper-block-swiper-slide-img" :style="inlineStyle(image)"/>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="main-page__about-me" >
      <div class="main-page__about-me-text">
        <span>
          Давайте знакомиться?
        </span>

        <span>
          Меня зовут Арина и я создатель лавки aribox.<br><br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam beatae commodi consequuntur doloribus dolorum iure laborum, obcaecati pariatur perferendis saepe soluta voluptas? Ab ad aliquid animi asperiores cum earum eius enim esse explicabo, facilis harum illum ipsa maxime natus nostrum optio praesentium repellat, suscipit ullam voluptatum. Amet, aspernatur assumenda aut blanditiis commodi cupiditate, deleniti dolores doloribus ducimus eum harum ipsum itaque magni molestias mollitia qui quos sed veniam! Doloremque fugit impedit recusandae totam. Ad at beatae, consequatur dolorem doloremque, doloribus ea et, expedita facilis illo impedit magnam modi nam nesciunt nihil placeat porro quae recusandae reiciendis sequi tempora voluptate.
        </span>
      </div>

      <img src="~@/assets/img/about-me.png" class="main-page__about-me-img">
    </div>

    <div class="main-page__instagram-feed">
      <PulseLoader
        color="#4d4e54"
        :loading="imagesAreLoading"
        v-if="imagesAreLoading"
        class="main-page__instagram-feed-loader"
      />

      <div v-if="!imagesAreLoading" class="main-page__instagram-feed-subscribe-button">
        <AppButton class="main-page__instagram-feed-subscribe-button-button" @buttonClick="goToInstagram">
          Подписаться
        </AppButton>

        <span class="main-page__instagram-feed-subscribe-button-text">
          Мы в instagram
        </span>
      </div>

      <div v-if="!imagesAreLoading" class="grid-block">
        <a v-for="img in instaImages" :key="img.id" class="main-page__instagram-feed-item" target="_blank" :href="img.permalink" @mouseenter="hoverId = img.id" @mouseleave="hoverId = ''">
          <img :src="img.mediaUrl" class="main-page__instagram-feed-item-img">

          <TransitionComponent>
            <div v-if="img.id === hoverId" class="main-page__instagram-feed-item-hover-block">
              <div class="main-page__instagram-feed-item-hover-block-filter"/>

              <div class="main-page__instagram-feed-item-hover-block-text">
                {{ img.caption }}
              </div>
            </div>
          </TransitionComponent>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { getImages } from '../../api/InstagramAPI';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import TransitionComponent from 'Components/transition-component/transition-component';
import AppButton from '../../components/app-button/app-button';
const SWIPER_SPACE = 20;
const instaUrl = 'https://www.instagram.com/aribox.lip/';

export default {
  name: 'main-page',

  components: {
    AppButton,
    TransitionComponent,
    Swiper,
    SwiperSlide,
    PulseLoader
  },

  data() {
    return {
      instaImages: [],
      hoverId: '',
      imagesAreLoading: false
    };
  },

  computed: {
    getImages() {
      /**
       * TODO: Нужно будет заменить
       */
      return ['img-1.jpg', 'img-2.webp'];
    },

    swiperOptions() {
      return {
        loop: true,
        spaceBetween: SWIPER_SPACE,
        threshold: 20,
        observer: true,
        observeParents: true,
        slidePerView: 1,
        watchOverflow: true,
        speed: 1000,
        autoplay: {
          delay: 5000
        }
      };
    },
  },

  methods: {
    goToInstagram() {
      window.open(instaUrl, '_blank');
    },

    bgImage (img) {
      return require(`@/assets/img/main-banner/${img}`)
    },
    inlineStyle (img) {
      return {
        backgroundImage: `url(${this.bgImage(img)})`
      }
    },
  },

  async mounted() {
    this.imagesAreLoading = true;
    this.instaImages = await getImages();
    this.imagesAreLoading = false;
  }
};
</script>
<style lang="scss">
@import './styles.scss';
</style>
