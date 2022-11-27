<template>
  <div class="faq section" id="faq">
    <div class="container">
      <img src="../assets/images/logo.svg" alt="" class="faq__logo">
      <div class="faq__wrapper">
        <div class="faq__row">
          <div class="faq__content">
            <div class="faq__list">
              <div
                class="faq__list-item"
                v-for="(item, index) in items"
                :key="index"
                :class="item.isActive ? '_active' : ''"
              >
                <div
                  class="faq__list-item-header"
                  @click="item.isActive = !item.isActive"
                >
                  <svg
                    class="faq__list-item-arrow"
                    width="29"
                    height="16"
                    viewBox="0 0 29 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.1516 8.70711C28.5421 8.31658 28.5421 7.68342 28.1516 7.29289L21.7876 0.928933C21.3971 0.538409 20.7639 0.538409 20.3734 0.928933C19.9829 1.31946 19.9829 1.95262 20.3734 2.34315L26.0302 8L20.3734 13.6569C19.9829 14.0474 19.9829 14.6805 20.3734 15.0711C20.7639 15.4616 21.3971 15.4616 21.7876 15.0711L28.1516 8.70711ZM-5.56363e-08 9L27.4444 9L27.4444 7L5.56363e-08 7L-5.56363e-08 9Z"
                      fill="#EAE7E2"
                    />
                  </svg>
                  <h2 class="faq__list-item-title">
                    <span v-html="item.title"></span>
                  </h2>
                </div>
                <div class="faq__answer" v-if="item.isActive">
                  <div class="faq__answer-text" v-html="item.text"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="faq-feedback only-desktop">
            <div class="faq-feedback__title">
              <span>Не нашли ответ на свой <br>вопрос?</span>
              мы обязательно ответим
            </div>
            <button class="btn btn--bordered btn--lg" @click="$modal.show('feedback')">задать вопрос</button>
          </div>
        </div>
      </div>
    </div>
    <div class="faq-feedback only-mobile">
      <div class="faq-feedback__title">
        <span>Не нашли ответ <br />на свой вопрос?</span>
        мы обязательно<br />ответим
      </div>
      <button class="btn btn--bordered btn--lg" @click="$modal.show('feedback')">задать вопрос</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styleType: String,
    items: Array,
  },
  data: function () {
    return {
      activeItem: "faq-0",
    };
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
  mounted() {},
  components: {},
};
</script>

<style lang="scss" scoped>
.faq {
  position: relative;
  flex-direction: column;
  padding-bottom: 0;
  background: $brown_light;
  z-index: 10;
  .container {
    position: relative;
    padding-bottom: rem(30px);
    z-index: 2;
  }
  &__wrapper {
    padding: rem(87px) rem(24px) rem(40px);
  }
  &__logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%);
    width: rem(163px);
    z-index: 3;
  }
  &__list {
    height: 100%;
    overflow-y: auto;
    flex: 0 0 45%;
    max-height: rem(480px);
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: rem(3px);
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba($yellow,.6);
      border-radius: 0px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: $yellow;
      transition: all 0.3s ease-in-out;
    }
    &-wrapper {
      position: relative;
      height: 100%;
      &::before {
        content: "";
        width: 100%;
        height: 10%;
        position: absolute;
        display: block;
        bottom: 0;
        left: 0;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          #040404 97.37%
        );
        pointer-events: none;
      }
    }
    &-item {
      display: flex;
      flex-direction: column;
      margin-bottom: rem(8px);
      align-items: flex-start;
      border-bottom: 1px solid #ffffff;
      color: $grey;
      direction: ltr;
      cursor: pointer;
      &-header {
        display: flex;
        padding: 0 0 rem(7px);
        font-size: rem(14px);
      }
      &-arrow {
        width: rem(26px);
        margin-top: rem(6px);
        margin-right: rem(10px);
        flex-shrink: 0;
        transform: translateX(-100%);
        opacity: 0;
        transition: 0.4s;
        ._active & {
          opacity: 1;
          transform: translateX(0%);
        }
      }
      &-title {
        transform: translateX(#{rem(-18px)});
        font-size: rem(18px);
        font-weight: 400;
        transition: 0.4s;
        ._active & {
          transform: translateX(0%);
        }
      }
    }
  }
  &__row {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  &__answers {
    height: 80%;
    padding: rem(30px) rem(15px) rem(45px) rem(30px);
  }
  &__answer {
    width: 100%;
    height: 100%;
    padding: rem(10px) rem(20px) rem(10px);
    border: 1px solid $yellow;
    color: $yellow;
    &-title {
      display: flex;
      font-size: rem(24px);
      line-height: 1;
      font-weight: 400;
    }
    p {
      margin-bottom: rem(10px);
    }
    &-text {
      font-size: rem(18px);
      font-weight: 700;
    }
    ._active & {
      display: block;
    }
  }
  &__show-more {
    display: flex;
    margin-top: rem(38px);
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: rem(14px);
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    img {
      width: rem(10px);
      margin-top: rem(10px);
    }
  }
  &-feedback {
    display: flex;
    max-width: 100%;
    align-items: center;
    flex-direction: column;
    padding: rem(50px) rem(20px) rem(32px);
    background: $green;
    color: #FFF;
    &__title {
      margin-bottom: rem(36px);
      font-size: rem(24px);
      text-align: center;
      text-transform: uppercase;
      span {
        display: block;
        font-family: $bold;
      }
    }
    .btn {
      margin-top: rem(20px);
    }
  }
  @media (min-width: $sm) {
    &__wrapper {
      height: 100%;
      padding: rem(40px) rem(60px) rem(40px);
    }
    &__logo {
      width: rem(282px);
    }
  }
  @media (min-width: $md) {
    height: rem(600px);
    padding-top: 0;
    background-size: 100%;
    &::after {
      content: "";
      position: absolute;
      top: 0%;
      right: 50%;
      width: 60%;
      height: 100%;
      background: $brown_light;
      display: block;
      pointer-events: none;
      z-index: 1;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0%;
      left: 50%;
      width: 60%;
      height: 100%;
      background: $green;
      display: block;
      pointer-events: none;
      z-index: -1;
    }
    .container {
      padding-top: 0;
      padding-bottom: rem(0px);
      height: 100%;
    }
    &__row {
      flex: auto;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    &__title {
      margin-bottom: rem(80px) !important;
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
      padding: rem(45px) 0;
    }
    &-feedback {
      position: relative;
      justify-content: center;
      flex: 0 0 50%;
      max-width: 100%;
      padding: 0;
      padding-left: rem(100px);
      background: none;
      flex-shrink: 0;
      &__title {
        font-size: rem(24px);
        line-height: 1.5;
      }
    }
    &__content {
      flex: 0 0 50%;
      height: 100%;
      padding-top: rem(30px);
    }
    &__header {
      margin-bottom: 0;
      justify-content: flex-start;
    }
    &__list {
      height: 100%;
      max-height: 100%;
      padding-right: rem(40px);
      margin-right: rem(40px);
      &-item {
        &-header {
          padding-top: 0;
          font-size: rem(16px);
        }
        &-title {
          font-size: rem(24px);
          transform: translateX(#{rem(-34px)});
        }
      }
    }
    &__answers {
      padding: rem(46px) rem(25px) rem(60px) rem(50px);
    }
    &__answer {
      display: none;
      padding: rem(19px) rem(40px);
      &-wrapper {
        height: 100%;
        overflow-y: auto;
        padding-right: rem(25px);
        &::-webkit-scrollbar {
          width: rem(3px);
        }
        /* Track */
        &::-webkit-scrollbar-track {
          background: rgba($yellow, 0.2);
          border-radius: 0;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          border-radius: 0px;
          background: $yellow;
          transition: all 0.3s ease-in-out;
        }
      }
      &-text {
        font-size: rem(24px);
        line-height: rem(32px);
      }
      td {
        font-weight: 400;
      }
    }

    &__content {
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
.link {
  color: $red;
  text-decoration: underline;
  ._pink & {
    color: #fff;
  }
}
</style>
