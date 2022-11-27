<template>
  <div class="production section" id="products">
    <div class="container">
      <div class="production__header">
        <h2 class="section-title">
          продукты,<br />
          участвующие в&nbsp;акции
        </h2>
      </div>
      <ul class="production-tabs">
        <li v-for="(tab, i) in types" :key="i" class="production-tabs__tab">
          <button
            class="btn btn--secondary btn--lg"
            :class="{ _active: activeTab === tab.value }"
            @click="setActive(tab)"
          >
            {{ tab.title }}
          </button>
        </li>
      </ul>
      <div
        v-for="(itm, i) in types"
        :key="i"
        class="production__content"
        :class="{ _active: activeTab === itm.value }"
      >
        <div class="production__slider">
          <VueSlickCarousel
            :ref="itm.value"
            v-bind="settings"
            class="production__list"
          >
            <template #default>
              <div
                class="production__item"
                v-for="(item, index) in itm.list"
                :key="index"
              >
                <div class="production__item-inner">
                  <div class="production__item-img-wrapper">
                    <img
                      :src="
                        require(`../assets/images/production/${itm.value}/${item.img}`)
                      "
                      alt=""
                      class="production__item-img"
                    />
                  </div>

                  <div class="production__item-title">{{ item.title }}</div>
                  <div class="production__item-text">
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </template>
          </VueSlickCarousel>

          <button
            @click="showPrev"
            v-if="itm.list.length > 4"
            class="slider-arrows _prev"
          >
            <svg
              width="42"
              height="41"
              viewBox="0 0 42 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2004 21.7129L24.8695 31.365C25.0283 31.5251 25.2173 31.6522 25.4255 31.739C25.6336 31.8257 25.8569 31.8703 26.0824 31.8703C26.308 31.8703 26.5312 31.8257 26.7394 31.739C26.9476 31.6522 27.1365 31.5251 27.2954 31.365C27.6135 31.0449 27.7921 30.612 27.7921 30.1606C27.7921 29.7093 27.6135 29.2764 27.2954 28.9563L18.8391 20.4146L27.2954 11.9584C27.6135 11.6383 27.7921 11.2053 27.7921 10.754C27.7921 10.3027 27.6135 9.86969 27.2954 9.54961C27.1371 9.38819 26.9485 9.25977 26.7403 9.1718C26.5321 9.08383 26.3085 9.03805 26.0824 9.03711C25.8564 9.03805 25.6328 9.08383 25.4246 9.1718C25.2164 9.25977 25.0277 9.38819 24.8695 9.54961L15.2004 19.2017C15.027 19.3617 14.8886 19.5558 14.7939 19.7719C14.6993 19.988 14.6504 20.2214 14.6504 20.4573C14.6504 20.6932 14.6993 20.9266 14.7939 21.1427C14.8886 21.3588 15.027 21.553 15.2004 21.7129V21.7129Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            @click="showNext"
            v-if="itm.list.length > 4"
            class="slider-arrows _next"
          >
            <svg
              width="42"
              height="41"
              viewBox="0 0 42 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.9237 19.2871L17.2546 9.63506C17.0957 9.47494 16.9068 9.34785 16.6986 9.26112C16.4904 9.17439 16.2672 9.12974 16.0416 9.12974C15.8161 9.12974 15.5928 9.17439 15.3847 9.26112C15.1765 9.34785 14.9875 9.47494 14.8287 9.63506C14.5105 9.95514 14.3319 10.3881 14.3319 10.8394C14.3319 11.2908 14.5105 11.7237 14.8287 12.0438L23.285 20.5855L14.8287 29.0417C14.5105 29.3618 14.3319 29.7948 14.3319 30.2461C14.3319 30.6974 14.5105 31.1304 14.8287 31.4505C14.9869 31.6119 15.1756 31.7403 15.3838 31.8283C15.592 31.9163 15.8156 31.962 16.0416 31.963C16.2677 31.962 16.4913 31.9163 16.6995 31.8283C16.9077 31.7403 17.0963 31.6119 17.2546 31.4505L26.9237 21.7984C27.0971 21.6384 27.2355 21.4443 27.3302 21.2282C27.4248 21.0121 27.4737 20.7787 27.4737 20.5428C27.4737 20.3068 27.4248 20.0735 27.3302 19.8574C27.2355 19.6413 27.0971 19.4471 26.9237 19.2871Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  components: { VueSlickCarousel },
  props: {
    text: String,
  },
  data: function () {
    return {
      isMobile: false,
      activeTab: "butter",
      c1: undefined,
      c2: undefined,
      settings: {
        arrows: true,
        dots: true,
        slidesToShow: 4,
        centerMode: true,
        centerPadding: "0px",
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              fade: true,
              dots: true,
            },
          },
        ],
      },
      types: [
        {
          title: "масло",
          value: "butter",
          desktopOrder: 1,
          mobileOrder: 1,
          list: [
            {
              img: "product_1.png",
              title: "Масло шоколадное 62%",
              text: "180г",
            },
            {
              img: "product_2.png",
              title: "Масло крестьянское 72.5%",
              text: "180г",
            },
            {
              img: "product_3.png",
              title: "Масло крестьянское 72.5%",
              text: "380г",
            },
            {
              img: "product_5.png",
              title: "Масло сливочное 82.5%",
              text: "100г",
            },
            {
              img: "product_6.png",
              title: "Масло сливочное 82.5%",
              text: "180г",
            },
            {
              img: "product_4.png",
              title: "Масло сливочное 82.5%",
              text: "380г",
            },
          ],
        },
        {
          title: "сметана",
          value: "sour_cream",
          desktopOrder: 2,
          mobileOrder: 2,
          list: [
            {
              img: "product_1.png",
              title: "Сметана 15%",
              text: "200г",
            },
            {
              img: "product_2.png",
              title: "Сметана 15%",
              text: "400г",
            },
            {
              img: "product_3.png",
              title: "Сметана 25%",
              text: "200г",
            },
            {
              img: "product_4.png",
              title: "Сметана 25%",
              text: "400г",
            },
            {
              img: "product_5.png",
              title: "Сметана 40%",
              text: "200г",
            },
            {
              img: "product_6.png",
              title: "Сметана 40%",
              text: "400г",
            },
          ],
        },
        {
          title: "Сыр плавленый",
          value: "processed_cheese",
          desktopOrder: 4,
          mobileOrder: 3,
          list: [
            {
              img: "product_1.png",
              title: "Сливочный плавленый сыр",
              text: "200г",
            },
            {
              img: "product_2.png",
              title: "Сливочный плавленый сыр",
              text: "400г",
            },
          ],
        },
        {
          title: "сыр",
          value: "cheese",
          desktopOrder: 3,
          mobileOrder: 5,
          list: [
            {
              img: "product_1.png",
              title: "Сыр голландский",
              text: "180г",
            },
            {
              img: "product_2.png",
              title: "Сыр российский",
              text: "180г",
            },
          ],
        },
        {
          title: "творог",
          value: "curd",
          desktopOrder: 5,
          mobileOrder: 4,
          list: [
            {
              img: "product_1.png",
              title: "Творог 2%",
              text: "180г",
            },
            {
              img: "product_2.png",
              title: "Творог 5%",
              text: "180г",
            },
            {
              img: "product_3.png",
              title: "Творог 9%",
              text: "180г",
            },
          ],
        },
      ],
    };
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
      if (this.isMobile) {
        this.types = this.types.sort(
          (a, b) => parseFloat(a.mobileOrder) - parseFloat(b.mobileOrder)
        );
        // this.activeTab = "sour_cream";
      } else {
        this.types = this.types.sort(
          (a, b) => parseFloat(a.desktopOrder) - parseFloat(b.desktopOrder)
        );
      }
    },
    setActive(item) {
      this.activeTab = item.value;
    },
    showNext() {
      this.$refs[this.activeTab][0].next();
    },
    showPrev() {
      this.$refs[this.activeTab][0].prev();
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    this.c1 = this.$refs.c1;
    this.c2 = this.$refs.c2;
  },
};
</script>

<style lang="scss">
.production {
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: rem(50px);
  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }
  &::after {
    width: 100%;
    height: 85%;
    background: url("data:image/svg+xml,%3Csvg width='1286' height='1286' viewBox='0 0 1286 1286' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_f_2591_584)'%3E%3Ccircle cx='643' cy='643' r='375' fill='%23D7FF64'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_2591_584' x='0' y='0' width='1286' height='1286' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='134' result='effect1_foregroundBlur_2591_584'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A")
      no-repeat center;
    background-size: contain;
    z-index: -1;
  }
  &::before {
    top: 65%;
    width: 100%;
    height: 95%;
    background: url("../assets/images/milk-2.png") no-repeat center;
    transform: translate(-50%, -50%);
    background-size: auto 100%;
  }
  .container {
    position: relative;
    z-index: 1;
  }
  &__header {
    display: flex;
    justify-content: center;
  }
  &__content {
    position: relative;
    display: none;
    align-items: flex-start;
    justify-content: space-between;
    opacity: 0;
    transition: 0.4s;
    &._active {
      display: flex;
      opacity: 1;
      transition-delay: 1s;
    }
  }
  &-tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: rem(37px) 0 rem(20px);
    &__tab {
      width: 49%;
      margin-bottom: rem(8px);
      &:nth-of-type(3) {
        width: 100%;
      }
      .btn {
        width: 100%;
        &._active,
        &:hover {
          border-color: #fff;
        }
      }
    }
  }
  &__list {
    position: relative;
    margin: auto;
    &.slick-slider {
      .slick-prev,
      .slick-next {
        top: 45%;
      }
      .slick-prev {
        right: 85%;
      }
      .slick-next {
        left: 85%;
      }
    }
  }
  &__slider {
    width: 100%;
    padding: rem(42px) rem(12px) rem(30px);
    background: #fff;
    border-radius: rem(10px);
    color: $green_dark;
    .slick-dots {
      top: calc(100% + #{rem(120px)}) !important;
      li {
        &.slick-active {
          button {
            &:before {
              border-color: $green_dark;
            }
          }
        }
      }
    }
    .slick-track {
      display: flex !important;
      align-items: center;
    }
  }

  &__item-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
    z-index: 1;
    &::before {
      content: "";
      position: absolute;
      top: 40%;
      left: 50%;
      display: block;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      background-size: contain;
      opacity: 0.6;
      z-index: -1;
    }
  }

  &__item-img {
    max-width: 60%;
    object-fit: contain;
    margin: auto;
    max-height: 100%;
    &-wrapper {
      position: relative;
      display: flex;
      width: 100%;
      margin-bottom: rem(23px);
      height: rem(230px);
    }
  }
  &__item-title {
    margin-bottom: rem(4px);
    font-size: rem(24px);
    font-weight: 700;
    color: $green_dark;
  }
  &__item-text {
    font-size: rem(24px);
    color: $green;
  }

  @media (min-width: $md) {
    padding-bottom: rem(85px);
    &::before {
      top: 68%;
      width: 100%;
      height: 110%;
      background: url("../assets/images/milk.png") no-repeat center;
      background-size: contain;
    }
    &::after {
      height: 100%;
      top: 65%;
    }
    .container {
      padding-top: rem(125px) !important;
    }
    &-tabs {
      margin-top: rem(40px);
      margin-bottom: rem(60px);
      flex-direction: row;
      justify-content: center;
      &__tab {
        margin: 0 rem(18px);
        width: auto;
        margin-bottom: 0;
        &:nth-of-type(3) {
          width: auto;
        }
        .btn {
          width: auto;
        }
      }
    }
    &__title {
      width: 45%;
    }
    &__content {
      align-items: center;
    }
    &__slider {
      width: 100%;
      min-height: rem(396px);
      padding: rem(100px) rem(72px) rem(30px);
      margin-bottom: rem(10px);
      .slick-dots {
        top: calc(100% + #{rem(130px)}) !important;
      }
      .slick-track {
        display: flex;
        align-items: flex-start;
      }
    }
    &__list {
      width: 100%;
      margin-bottom: rem(45px);
      &.slick-slider {
        .slick-prev,
        .slick-next {
          top: 38%;
          bottom: auto;
        }
        .slick-prev {
          right: 96%;
        }
        .slick-next {
          left: 96%;
        }
      }
    }
    &__item {
      padding: 0 rem(10px);
      line-height: 1.4;
      &-inner {
        height: 100%;
      }
      &-img {
        width: auto;
        max-width: 60%;
        max-height: 100%;
        &-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          flex-shrink: 0;
          height: rem(230px);
        }
      }
      &-text {
        font-size: rem(24px);
      }
      &-title {
        max-width: 90%;
        margin: auto;
        font-size: rem(24px);
      }
    }
  }
}
</style>
