<template>
  <modal
    :name="name"
    :adaptive="true"
    :scrollable="true"
    height="auto"
    @before-open="beforeOpen"
    :clickToClose="!withoutClosing"
  >
    <div
      class="modal"
      :class="[
        'modal-' + name,
        size ? 'modal--' + size : 'modal--md',
        success ? 'modal-success' : '',
        withoutClosing ? '_withoutClosing' : '',
      ]"
    >
      <div
        class="modal__close"
        v-if="!withoutClosing"
        @click="closeModal(name)"
      ></div>
      <div class="modal__header">
        <h2
          class="modal__title"
          :class="success ? 'modal-success__title' : ''"
          v-html="title"
        ></h2>
      </div>
      <slot name="content"></slot>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    success: {
      type: Boolean,
    },
    withoutClosing: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal(name) {
      this.$emit("closeModal", name);
    },
    beforeOpen(event) {
      this.$parent.beforeOpen(event);
    },
  },
  mounted() {
    // this.$modal.show("success_modal");
  },
};
</script>

<style lang="scss">
.vm--container {
  overflow: auto;
  z-index: 999999 !important;
  .vm--overlay {
    background: rgba(26, 21, 17, 0.85);
  }
}
.vm--modal {
  padding-bottom: 15vh;
  justify-content: center;
  overflow: visible !important;
  display: flex;
  align-items: center;
  box-shadow: none !important;
  background-color: transparent !important;

  @media (min-width: $md) {
    padding: 0;
  }
}

.modal {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10vh;
  max-width: 100vw;
  padding: rem(66px) rem(34px) rem(44px);
  background: $green;
  color: $yellow;
  border: 1px solid $yellow;
  box-shadow: 0px rem(10px) rem(30px) rgba(0, 0, 0, 0.5);
  &-check_photo {
    min-height: auto;
  }
  &__close {
    cursor: pointer;
    position: absolute;
    top: rem(40px);
    right: rem(40px);
    width: rem(30px);
    height: rem(30px);
    background-image: url("../assets/images/icons/close.svg");
    background-repeat: no-repeat;
    background-size: rem(23px);
    background-position: center;
    transition: 0.4s;
  }

  &__title {
    margin-bottom: rem(30px);
    font-size: rem(30px);
    text-transform: uppercase;
    line-height: 1.3;
    font-family: $bold;
    text-align: center;
    & + .modal__text {
      margin-top: rem(-7px);
    }
  }
  &__subtitle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: rem(10px);
    font-size: rem(14px);
    text-transform: uppercase;
    text-align: center;
    span {
      display: block;
      flex: 1 0 auto;
      height: 1px;
      background: #000;
      &:first-of-type {
        margin-right: rem(10px);
      }
      &:last-of-type {
        margin-left: rem(10px);
      }
    }
  }
  &__text {
    margin-top: rem(0px);
    margin-bottom: rem(16px);
    text-align: center;
    font-size: rem(14px);
    line-height: 1.6;
    font-weight: 400;
    text-transform: uppercase;
  }
  &-signup {
    width: rem(758px);
  }
  &-pdf {
    max-height: 50vh;
    margin-bottom: rem(30px);
    padding-right: rem(30px);
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 3px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba(#fff, 0.2);
      border-radius: 0px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: #fff;
      transition: all 0.3s ease-in-out;
    }
    &__page {
      width: 100%;
      display: inline-block;
      margin-bottom: rem(5px);
      box-shadow: 1px 1px 3px #000;
    }
  }
  &__another-option {
    margin: rem(20px) 0 rem(27px);
    text-align: center;
    a {
      border-bottom: 1px solid currentColor;
      &:hover {
        border-color: transparent;
      }
    }
  }
  &__footer {
    margin-top: rem(52px);
    text-align: center;
  }
  .success_modal {
    &__text {
      margin-top: 0;
      font-size: rem(14px);
      font-weight: 400;
      text-transform: uppercase;
    }
    &-back {
      font-size: rem(12px);
      text-align: center;
    }
    &-image {
      margin: auto;
    }
  }
  .error_modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #d21e19;
    img {
      margin-bottom: rem(24px);
    }
    &-text {
      margin-bottom: rem(36px);
    }
  }
  .btn {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  &__image {
    position: relative;
    overflow: hidden;
    margin: 0 auto rem(30px);
    img {
      min-height: rem(400px);
      object-fit: cover;
    }
  }
  &__popover-text {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: rem(20px);
    background: rgba($green_light, .6);
    color: $green_dark;
    transform: translateY(-40px);
    transition: .6s ease-in-out;
    &:hover {
      transform: translateY(-100%);
    }
  }
  &-image {
    padding-top: rem(30px);
    padding-bottom: rem(55px);
  }
  &__iframe {
    position: relative;
    width: 100%;
    height: 70vh;
    overflow: hidden;
    margin-bottom: rem(30px);
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  @media (min-width: $sm) {
    min-height: auto;
    margin-top: 25vh;
    justify-content: flex-start;
    &--md {
      width: rem(500px);
    }
    &--lg {
      width: rem(758px);
      padding: rem(40px) rem(25px) rem(46px);
    }
  }
  @media (min-width: $md) {
    min-height: auto;
    justify-content: flex-start;
    &--md {
      width: rem(375px);
    }
    &--lg {
      width: rem(800px);
      padding: rem(66px) rem(75px) rem(45px);
      .modal__subtitle {
        margin-bottom: rem(38px);
      }
      &.modal-image {
        margin-top: 10vh;
      }
      &.modal-video {
        width: 70vw;
      }
    }
    &-temporarily_unavailable {
      .modal__title {
        font-size: rem(40px);
      }
      .modal__text {
        font-size: rem(26px);
        line-height: 1.5;
        b {
          font-size: rem(26px);
          text-transform: uppercase;
        }
      }
    }
    &__title {
      margin-bottom: rem(45px);
      font-size: rem(30px);
      line-height: rem(30px);
    }
    &__text {
      // margin-top: rem(27px);
    }
    &-pdf {
      max-height: 60vh;
    }
    &__list {
      width: 70%;
    }
    &__subtitle {
      margin-top: rem(-30px);
      margin-bottom: rem(20px);
      font-size: rem(14px);
    }
    &__another-option {
      margin: 0 0 0;
    }
  }
}
</style>
