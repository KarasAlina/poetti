<template>
  <div class="prizes section" id="prizes">
    <div class="container fxdc">
      <h2 class="section-title">
        <span>призы</span>
      </h2>
      <div class="prizes__content only-desktop fxdc">
        <div class="prizes__list">
          <div class="prizes-item" v-for="(item, idx) in prizes" :key="idx">
            <div class="prizes-item__content">
              <div class="prizes-item__title" v-html="item.title"></div>
              <div class="prizes-item-img-wrapper">
                <img
                  :src="require('../assets/images/prizes/' + item.img)"
                  :srcset="require('../assets/images/prizes/' + item.img2x)"
                  :alt="item.title"
                  class="prizes-item-img"
                />
              </div>
              <div class="prizes-item__text" v-html="item.text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prizes__slider only-mobile">
      <VueSlickCarousel v-bind="settings" class="prizes__list">
        <div class="prizes-item" v-for="(item, idx) in prizes" :key="idx">
          <div class="prizes-item__content" @click="item.showPopup = true">
            <div class="prizes-item__title" v-html="item.title"></div>
              <div class="prizes-item-img-wrapper">
                <img
                  :src="require('../assets/images/prizes/' + item.img)"
                  :srcset="require('../assets/images/prizes/' + item.img2x)"
                  :alt="item.title"
                  class="prizes-item-img"
                  :class="item.class"
                />
              </div>
              <div class="prizes-item__text" v-html="item.text"></div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  props: {},
  components: { VueSlickCarousel },
  data: function () {
    return {
      settings: {
        arrows: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
      },
      prizes: [
        {
          title: "Пачка кофе <br>Poetti",
          img: "prize_1.png",
          img2x: "prize_1@2x.png",
          text: "С&nbsp;теми, кто делится своей работой, мы&nbsp;делимся своим кофе"
        },
        {
          title: "Годовой запас <br>кофе Poetti",
          img: "prize_2.png",
          img2x: "prize_2@2x.png",
          text: "Тем, кто собрал больше всех лайков&nbsp;&mdash; большой подарок"
        },
        {
          title: "Кофемашина <br>DeLonghi",
          img: "prize_3.png",
          img2x: "prize_3@2x.png",
          text: "Тем, кто верил в&nbsp;свою победу среди всех участников конкурса"
        },
        {
          title: "Главный <br>приз",
          img: "prize_4.png",
          img2x: "prize_4@2x.png",
          text: "Тем, чье творчество оценил Андрей Бурковский",
          class: "_alsfe"
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.prizes {
  position: relative;
  align-items: center;
  padding-top: rem(50px);
  padding-bottom: rem(75px);
  flex-direction: column;
  background: url('../assets/images/prizes/background.png') no-repeat center;
  background-size: cover;
  z-index: 2;
  &__content {

  }
  .container {
    position: relative;
  }
  &__background {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 120%;
  }
  &__list.slick-slider {
    width: 100%;
    margin: rem(20px) 0 rem(30px);
  }
  &__slider {
    width: 100%;
  }
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: rem(22px) rem(10px);
    cursor: pointer;
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &:nth-of-type(2),
    &:nth-of-type(3) {
      .prizes-item-img-wrapper::before {
        left: 60%;
      }
    }
    &:nth-of-type(4) {
      .prizes-item-img-wrapper {
        padding-right: rem(20px);
        align-items: flex-end;
      }
    }
    &__title { 
      margin-bottom: rem(31px);
      font-size: rem(24px);
    }
    &-img {
      height: 80%;
      max-width: 80%;
      &._alsfe {
        align-self: flex-end;
      }
      &-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: rem(248px);
        margin-bottom: rem(17px);
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 40%;
          transform: translate(-50%, -50%);
          display: block;
          width: rem(300px);
          height: rem(300px);
          background: url('../assets/images/shadow.svg') no-repeat center;
          background-size: contain;
          z-index: -2;
        }
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          width: rem(248px);
          height: rem(248px);
          border: 1px solid $yellow;
          border-radius: 50%;
          z-index: -1 ;
        }
      }
    }
  }
  @media (min-width: $md) {
    padding-top: rem(97px);
    padding-bottom: rem(75px);
    overflow: visible;
    z-index: 1;
    .container {
      display: flex;
      padding-top: rem(0px);
      z-index: 1;
    }
    .section-title {
      margin-bottom: rem(55px);
    }
    &__content {
      flex-direction: column;
      align-items: center;
      padding-bottom: 0;
      padding-top: 0;
    }
    &__text {
      font-size: rem(18px);
      line-height: rem(25px);
      text-align: center;
    }
    &__slider {
      flex: 0 0 70%;
      width: 70%;
    }
    &__list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0 auto rem(10px);
    }
    &-item {
      flex-direction: row;
      flex: 0 1 28%;
      margin-top: 0;
      padding: rem(22px) rem(10px) 0;
      max-height: 100%;
      &:not(:last-of-type) {
        margin-right: rem(42px);
        margin-bottom: 0;
      }
      &__content {
        width: 100%;
        height: 100%;
        display: block;
      }
      &__title {
        margin-bottom: rem(33px);
        font-size: rem(24px);
        line-height: 1.3;
      }
      &-img {
        width: auto;
        height: 80%;
        &-wrapper {
          width: 100%;
          height: rem(248px);
          margin: 0 auto rem(45px);
          &::after {
            width: rem(248px);
            height: rem(248px);
            border-width: rem(2px);
          }
          ._small & {
            height: auto;
          }
        }
      }
      &__text {
        margin-bottom: rem(6px);
        font-size: rem(16px);
        line-height: 1.2;
        text-align: center;
      }
      &-title {
        font-size: rem(20px);
        line-height: rem(28px);
        small {
          font-size: rem(18px);
          line-height: 1;
        }
      }
    }
  }
}
</style>

