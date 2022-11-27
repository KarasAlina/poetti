<template>
  <section class="steps section" id="steps">
    <div class="container">
      <div class="steps__content">
        <h2 class="section-title _white">
          <span>станьте лицом кофе Poetti <br>с Андреем Бурковским</span>
        </h2>
        <div class="steps__list">
          <div class="steps__item" v-for="(item, idx) in steps" :key="idx">
            <div class="steps__item-img-wrapper">
              <img
                :src="require('../assets/images/steps/' + item.img)"
                :srcset="require('../assets/images/steps/' + item.img2x)"
                alt=""
                class="steps__item-img"
              />
            </div>
            <div class="steps__item-content">
              <div class="steps__item-title" v-html="item.title"></div>
              <div class="steps__item-descr" v-html="item.text"></div>
              <button
                v-if="item.button === true"
                class="btn btn--primary"
                @click="toCheckUpload()"
              >
                <span class="shadow"></span>
                зарегистрировать код
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  components: { },
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
      steps: [
        {
          img: "step_1.png",
          img2x: "step_1@2x.png",
          title: "Загрузите",
          text: "фото с&nbsp;пачкой или <br>чашкой poetti",
        },
        {
          img: "step_2.png",
          img2x: "step_2@2x.png",
          title: "УкажиТЕ",
          text: "мастер какого вы&nbsp;дела",
        },
        {
          img: "step_3.png",
          img2x: "step_3@2x.png",
          title: "Участвуйте",
          text: "В&nbsp;розыгрыше призов",
        },
        {
          img: "step_4.png",
          img2x: "step_4@2x.png",
          title: "Поделитесь",
          text: "в&nbsp;VK с&nbsp;хештегом <br>#мастервкуса",
        },
        {
          img: "step_5.png",
          img2x: "step_5@2x.png",
          title: "Получите",
          text: "упаковку кофе в&nbsp;подарок",
        },
      ],
    };
  },
  methods: {
    showModal(name) {
      this.$modal.show(name);
    },

    toCheckUpload() {
      // if (this.$store.getters.user) {
      //   let apmButton = document.querySelector(
      //     "#apm-scan-qr .apm-action-button"
      //   );
      //   if (apmButton) apmButton.click();
      // } else {
      //   this.$modal.show("authorization");
      // }
      this.$modal.show("temporarily_unavailable");
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.steps {
  position: relative;
  display: flex;
  background: $brown_light;
  .container {
    position: relative;
    z-index: 99;
  }
  &__content {
    position: relative;
    display: flex;
    width: 100%;
    padding-top: rem(76px);
    flex-direction: column;
    z-index: 9;
  }
  .section-title {
    margin-bottom: rem(20px);
  }
  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    max-width: 100vw;
    width: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-bottom: rem(30px);
    &:not(:last-of-type) {
      margin-bottom: rem(0px);
      .steps__item-img {
        max-height: 50%;
        max-width: 80%;
      }
      &::after {
        content: '';
        position: absolute;
        right: calc(50% - #{rem(32px)});
        top: 100%;
        width: rem(64px);
        height: 1px;
        background: $yellow;
      }
    }
    &:last-of-type {
      margin-top: rem(30px);
      .steps__item-img {
        margin-left: rem(-50px);
      }
    }
    &-content {
      width: 100%;
      text-align: center;
    }
    &-img {
      max-height: 100%;
      object-fit: contain;
      &-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        height: rem(170px);
      }
    }
    &-title {
      font-size: rem(32px);
      text-transform: uppercase;
    }
    &-descr {
      margin: 0 auto;
      font-size: rem(14px);
      line-height: normal;
      text-transform: uppercase;
      a,
      span {
        font-weight: 700;
        text-decoration: none;
      }
      img {
        display: inline;
      }
    }
    .btn {
      margin-top: rem(10px);
    }
  }
  @media (min-width: $sm) {
    padding-bottom: rem(73px);
    .section-title {
      margin-bottom: rem(0px);
    }
    &__content {
      padding-top: rem(150px);
    }
    &__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__item {
      flex: 0 0 20%;
      margin-bottom: 0;
      padding-bottom: 0;
      margin-top: 0 !important;
      &:first-of-type {
        .steps__item-img {
          width: rem(200px);
        }
      }
      &:last-of-type {
        .steps__item-img {
          min-width: 150%;
          margin-left: rem(-50px);
        }
      }
      &:not(:last-of-type) {

        margin-bottom: 0;
        &::after {
          display: none;
        }
        .steps__item-title {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            display: block;
            right: 0;
            top: 0;
            width: 1px;
            height: 160%;
            background: $yellow;
          }
        }
      }
      &-img {
        &-wrapper {
          max-width: 100%;
          height: rem(180px);
        }
      }
      .btn {
        margin-top: 0;
        font-size: rem(16px);
      }
      &-small {
        min-height: rem(18px);
        margin-bottom: rem(5px);
        margin-left: rem(45px);
        text-align: left;
        font-size: rem(15px);
        line-height: rem(18px);
      }
      &-title {
        margin-bottom: rem(3px);
        font-size: rem(32px);
        line-height: 1.2;
      }
      &-descr {
        max-width: 90%;
        margin: auto;
        font-size: rem(14px);
        line-height: rem(27px);
      }
    }
  }
  @media (min-width: $md) {
    .container {
      display: flex;
      align-items: center;
    }
    &__list {
      margin: auto;
      margin-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
