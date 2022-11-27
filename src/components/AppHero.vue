<template>
  <div class="hero section" id="home">
    <img
      src="../assets/images/hero/hero_desktop.jpg"
      srcset="../assets/images/hero/hero_desktop@2x.jpg"
      alt=""
      class="hero__img only-desktop"
    />
    <img
      src="../assets/images/hero/hero_mobile.png"
      srcset="../assets/images/hero/hero_mobile@2x.png"
      alt=""
      class="hero__img only-mobile"
    />
    <img src="../assets/images/logo.svg" alt="" class="hero__logo">
  </div>
</template>

<script>
export default {
  components: {
    // Feedback,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    showModal(name) {
      this.$modal.show(name);
    },
  },
  mounted() {
    // this.toCheckUpload()

    this.showModal("receipt_question");
  },
};
</script>
<style lang="scss">
.hero {
  position: relative;
  display: flex;
  height: rem(428px);
  align-items: center;
  flex-direction: column;
  color: #fff;
  z-index: 3 !important;
  .container {
    position: relative;
    display: flex;
    height: 100%;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  &__logo {
    position: absolute;
    left: 50%;
    top: 100%;
    display: block;
    width: rem(163px);
    transform: translate(-50%,-50%);
    z-index: 10;
  }
  @media (min-width: $sm) {
    .container {
      position: relative;
    }
    &__img-mobile {
    }
  }
  @media (min-width: $md) {
    position: relative;
    flex-direction: column;
    height: rem(673px);
    padding-top: rem(70px);
    &__img {
      max-width: none;
      height: 100%;
      display: block;
      object-position: center;
      &-mobile {
        display: none;
      }
    }
    &__logo {
      width: rem(376px);
    }
  }
  @media (min-width: $md) and (max-height: 750px) {
  }

  @media (max-width: $xlg) {
  }
}
</style>
