<template>
  <div class="account" v-if="user">
    <div class="account__content">
      <div class="container">
        <div class="account__header">
          <h2 class="account__header-title">личный кабинет</h2>
        </div>
        <div class="account-info profile">
          <div class="account-info__row">
            <div class="account-info__col profile__col">
              <div class="account-info__name">
                {{ user.profile.name }}
                <br />{{ user.profile.surname }}
              </div>
              <button
                class="btn btn--secondary btn--lg account-info__btn"
                @click="
                  user.badUser === 1
                    ? badUserPopup()
                    : $modal.show('change_password')
                "
              >
                <span>сменить пароль</span>
              </button>
            </div>
            <div class="account-info__col profile__col">
              <div class="account__row" v-if="user.profile.email">
                <div class="account-info__text">{{ user.profile.email }}</div>
              </div>
              <div class="account__row" v-if="user.profile.phone">
                <div class="account-info__text">
                  <input
                    class="account-info__input"
                    type="tel"
                    disabled
                    v-mask="'+7(###) ###-##-##'"
                    :value="user.profile.phone"
                  />
                </div>
              </div>
              <button
                class="btn btn--primary btn--lg account-info__btn"
                @click="toCheckUpload()"
              >
                Зарегистрировать код
              </button>
            </div>
            <div class="account-info__col profile-power">
              <div class="profile-power__total">
                <strong>{{ user.profile.balance }}</strong>
                <span> {{ wordVariant(user.profile.balance || 0) }}</span>
              </div>
              <a
                href="#prizes"
                class="
                  btn btn--secondary btn--lg
                  account-info__btn
                  only-desktop
                "
                v-smooth-scroll
              >
                <span>обменять силы на подарок</span>
              </a>
              <router-link
                class="btn btn--secondary btn--lg account-info__btn only-mobile"
                :to="{ path: '/profile', hash: '#prizes' }"
              >
                <span>обменять на подарок</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- prizes -->
        <div class="prizes" id="prizes">
          <div class="account__header">
            <h2 class="account__header-title">Подарки</h2>
          </div>
          <div class="only-desktop">
            <div class="prizes-list" v-if="prizes.length">
              <div
                v-for="(prize, i) in prizes"
                :key="i"
                class="prizes-list__item"
                :class="{
                  _big: prize.big,
                }"
              >
                <div class="prizes-list__img-wrapper">
                  <img
                    :src="
                      require(`../../assets/images/prizes/user_prizes/${prize.type}.svg`)
                    "
                    class="prizes-list__img"
                    :alt="prize.text"
                  />
                </div>
                <div
                  class="btn btn--secondary btn--lg"
                  @click="
                    gtmEvent('points_exch', 'click', 'internal'),
                      user.badUser === 1
                        ? badUserPopup()
                        : $modal.show('buy_garant', {
                            title: prize.text,
                            type: prize.type,
                          })
                  "
                  v-html="prize.text"
                ></div>
                <svg
                  class="prizes-list__shadow"
                  width="533"
                  height="72"
                  viewBox="0 0 533 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="266.5"
                    cy="36"
                    rx="266.5"
                    ry="36"
                    fill="url(#paint0_radial_2616_565)"
                    fill-opacity="0.5"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_2616_565"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(266.5 36) rotate(90) scale(36 266.5)"
                    >
                      <stop stop-color="#175A33" />
                      <stop
                        offset="1"
                        stop-color="#8EB51F"
                        stop-opacity="0.08"
                      />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div class="prizes-list-message" v-else>У вас пока нет призов</div>
          </div>

          <div class="prizes__slider only-mobile">
            <VueSlickCarousel v-bind="settings" class="prizes__list">
              <div
                v-for="(prize, i) in prizes"
                :key="i"
                class="prizes-list__item"
                :class="prize.color"
              >
                <div class="prizes-list__img-wrapper">
                  <img
                    :src="
                      require(`../../assets/images/prizes/user_prizes/${prize.type}.svg`)
                    "
                    class="prizes-list__img"
                    :alt="prize.text"
                  />
                </div>
                <div
                  class="btn btn--secondary btn--lg"
                  @click="
                    $modal.show('buy_garant', {
                      title: prize.text,
                      type: prize.type,
                    })
                  "
                  v-html="prize.text"
                ></div>
                <svg
                  class="prizes-list__shadow"
                  width="533"
                  height="72"
                  viewBox="0 0 533 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="266.5"
                    cy="36"
                    rx="266.5"
                    ry="36"
                    fill="url(#paint0_radial_2616_565)"
                    fill-opacity="0.5"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_2616_565"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(266.5 36) rotate(90) scale(36 266.5)"
                    >
                      <stop stop-color="#175A33" />
                      <stop
                        offset="1"
                        stop-color="#8EB51F"
                        stop-opacity="0.08"
                      />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <!-- checks -->
        {{ codesIndex }}
        <div class="checks" :key="codesIndex">
          <div v-if="checksItems">
            <ul class="checks__tabs">
              <li
                v-for="(tab, i) in tabs"
                :key="i"
                class="checks__tabs-nav"
                :class="{ _active: activeTab === tab.value }"
                @click="activeTab = tab.value"
              >
                {{ tab.label }}
              </li>
            </ul>
            <div v-if="activeTab === 'codes'">
              <div class="checks-table">
                <Table
                  :thead="['код', 'дата регистрации', 'силы']"
                  v-if="checksItems && checksItems.length"
                >
                  <template v-slot:tbody>
                    <tr v-for="(item, index) in checksItems" :key="index">
                      <td>
                        {{ item.code }}
                      </td>

                      <td>
                        {{ item.date_create }}
                      </td>
                      <td>
                        {{ item.points }} {{ wordVariant(item.points || 0) }}
                      </td>
                    </tr>
                  </template>
                  <template v-slot:mobile>
                    <div class="checks-table__wrapper w-100">
                      <table>
                        <tr
                          v-for="(item, mobIndexIn) in checksItems"
                          :key="mobIndexIn"
                        >
                          <td>
                            <table class="table-mobile__inner">
                              <tbody>
                                <tr>
                                  <td>№:</td>
                                  <td>{{ item.code }}</td>
                                </tr>
                                <tr>
                                  <td>дата регистрации:</td>
                                  <td>
                                    {{ item.date_create }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>силы:</td>
                                  <td>
                                    {{ item.points }}
                                    {{ wordVariant(item.points || 0) }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </template>
                </Table>
                <div class="checks__message d-flex fxdc aic" v-else>
                  <span>{{
                    "Вы пока не зарегистрировали ни одного кода" | typograf
                  }}</span>
                  <button
                    class="btn btn--primary btn--lg"
                    @click.prevent="toCheckUpload()"
                  >
                    зарегистрировать код
                  </button>
                </div>
                <div v-if="loading" class="checks__preloader">
                  <img src="../../assets/images/loader.svg" alt="" />
                </div>
              </div>
            </div>
            <div v-else-if="activeTab === 'orders'" :key="prizesIndex">
              <div class="checks-table">
                <Table
                  :thead="['id', 'дата регистрации', 'призы']"
                  v-if="garantItems && garantItems.length"
                >
                  <template v-slot:tbody>
                    <tr v-for="(item, index) in garantItems" :key="index">
                      <td>
                        {{ item.id }}
                      </td>

                      <td>
                        {{ item.date_create }}
                      </td>
                      <td>
                        {{ item.prize }}
                      </td>
                    </tr>
                  </template>
                  <template v-slot:mobile>
                    <div class="checks-table__wrapper w-100">
                      <table>
                        <tr
                          v-for="(item, mobIndexIn) in garantItems"
                          :key="mobIndexIn"
                        >
                          <td>
                            <table class="table-mobile__inner">
                              <tbody>
                                <tr>
                                  <td>ID:</td>
                                  <td>{{ item.id }}</td>
                                </tr>
                                <tr>
                                  <td>дата регистрации:</td>
                                  <td>
                                    {{ item.date_create }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>приз:</td>
                                  <td>{{ item.prize }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </template>
                </Table>
                <div class="checks__message d-flex fxdc aic" v-else>
                  <span>{{
                    "У Вас пока нет ни одного заказа" | typograf
                  }}</span>
                  <button
                    class="btn btn--primary btn--lg"
                    @click.prevent="toCheckUpload()"
                  >
                    зарегистрировать код
                  </button>
                </div>
                <div v-if="loading" class="checks__preloader">
                  <img src="../../assets/images/loader.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../../components/Table.vue";
import VueSlickCarousel from "vue-slick-carousel";
import store from "@/store";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  components: { Table, VueSlickCarousel },
  data: function () {
    return {
      userInfo: null,
      dragging: false,
      photo: null,
      loading: false,
      codesIndex: 0,
      prizesIndex: 0,
      currentPage: 1,
      checksItems: [],
      garantItems: [],
      activeTab: "codes",
      settings: {
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "30px",
      },
      tabs: [
        {
          label: "зарегистрированные коды",
          value: "codes",
        },
        {
          label: "мои заказы",
          value: "orders",
        },
      ],
      // checks: [],
      prizes: [
        {
          type: 1,
          text: "50 рублей на&nbsp;телефон",
          color: "light",
        },
        {
          type: 3,
          text: "1000 рублей на&nbsp;телефон",
          big: true,
          color: "red",
        },
        {
          type: 2,
          text: "300 рублей на&nbsp;телефон",
          color: "green",
        },
      ],
      errorMessage: {
        email: null,
        phone: null,
      },
    };
  },
  validations: {
    email: { required, email },
    phone: { required, minLength: minLength(6) },
  },
  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        phone: null,
      };
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    startDrag() {
      this.dragging = true;
    },
    stopDrag() {
      this.dragging = false;
    },
    toCheckUpload() {
      if (this.user.badUser === 1) {
        this.$modal.show("common_error", {
          size: "lg",
          title: "Внимание!",
          text: `<p>Действие учётной записи приостановлено вследствие подозрительной активности.</p> <p>Чтобы восстановить учетную запись, предоставьте, пожалуйста, фото или видео купленного акционного товара, с&nbsp;которого были зарегистрированы коды.</p> <p>Данные материалы отправьте на&nbsp;электронный адрес <a href='mailto:support@chaban-promo.ru' class='_undeline-link'>support@chaban&nbsp;-&nbsp;promo.ru</a> с&nbsp;почты, указанной при регистрации аккаунта.</p>`,
        });
      } else {
        this.$modal.show("code_registration");
      }
    },

    showModal(name) {
      this.$modal.show(name);
    },

    closeModal(name) {
      this.$modal.hide(name);
    },

    getUserData() {
      this.$store.dispatch("GetProfile").then(() => {
        const prizes = [];
        // this.prizes = prizes;
      });
      this.$store.dispatch("GetChecks", { page: this.currentPage }).then(() => {
        this.checksItems = this.checks.rows;
      });
      this.$store.dispatch("GetGarant", { page: this.currentPage }).then(() => {
        this.garantItems = this.garant.rows;
      });
    },
    showMoreChecks() {
      this.currentPage++;
      this.loading = true;
      this.$store.dispatch("GetChecks", { page: this.currentPage }).then(() => {
        this.$store.getters.checks.rows.forEach((element) => {
          this.checksItems.push(element);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
      });
    },
    showLessChecks() {
      this.currentPage = 1;
      this.loading = true;
      this.$store.dispatch("GetChecks", { page: this.currentPage }).then(() => {
        this.checksItems = this.$store.getters.checks.rows;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    updateProfile() {
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("UpdateProfile", {
            email: this.email,
            phone: this.phone,
          })
          .then((r) => {
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.email) {
                [this.errorMessage.email] = r.error.email;
                fieldsError = true;
              } else if (r.error && r.error.login) {
                [this.errorMessage.email] = r.error.login;
                fieldsError = true;
              }

              if (r.error && r.error.phone) {
                [this.errorMessage.phone] = r.error.phone;
                fieldsError = true;
              }

              if (r.error && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.error,
                });
              }
            } else {
              this.submitStatus = null;
              this.$modal.show("common_success", {
                text: "Профиль успешно обновлен.",
              });
              this.getUserData();
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },

    logout() {
      store.commit("SET_USER", null);
      this.$router.push("/");
    },

    wordVariant(items) {
      return items === 1 ? "сила" : items > 1 && 4 > items ? "силы" : "сил";
    },
    badUserPopup() {
      if (this.user.badUser === 1) {
        this.$modal.show("common_error", {
          size: "lg",
          title: "Внимание!",
          text: `<p>Действие учётной записи приостановлено вследствие подозрительной активности.</p> <p>Чтобы восстановить учетную запись, предоставьте, пожалуйста, фото или видео купленного акционного товара, с&nbsp;которого были зарегистрированы коды.</p> <p>Данные материалы отправьте на&nbsp;электронный адрес <a href='mailto:support@chaban-promo.ru' class='_undeline-link'>support@chaban&nbsp;-&nbsp;promo.ru</a> с&nbsp;почты, указанной при регистрации аккаунта.</p>`,
        });
      }
    },
  },
  mounted() {
    this.getUserData();
    this.badUserPopup();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    checks() {
      return this.$store.getters.checks;
    },
    garant() {
      return this.$store.getters.garant;
    },
  },
  watch: {
    checks() {
      this.codesIndex += 1;
      this.checksItems = this.$store.getters.checks.rows;
    },
    garant() {
      this.prizesIndex += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  color: #fff;
  &__header {
    display: flex;
    justify-content: center;
    &-title {
      position: relative;
      margin-bottom: rem(50px);
      font-size: rem(35px);
      line-height: 1;
      text-align: left;
      text-transform: uppercase;
      color: #fff;
      span {
        display: block;
        margin-left: rem(50px);
      }
    }
    &-logout {
      position: absolute;
      top: rem(-2px);
      left: 102%;
      font-size: rem(13px);
      line-height: rem(16px);
      z-index: 10;
      cursor: pointer;
      &:hover {
        &::before {
          opacity: 0;
        }
      }
    }
  }
  &-tabs {
    flex: auto;
    &-tab {
      &__inner {
        margin-bottom: rem(10px);
        padding: rem(30px) rem(20px) rem(23px);
        background: rgba(255, 255, 255, 0.15);
        border-radius: rem(20px);
        &:first-of-type {
          border-radius: 0px 0px rem(20px) rem(20px);
        }
        .checks & {
          padding: rem(30px) rem(10px) rem(10px);
        }
      }
    }
  }
  &__content {
    position: relative;
    padding-top: rem(130px);
    padding-bottom: rem(30px);
    z-index: 2;
    &:before {
      content: "";
      position: absolute;
      display: none;
      top: 80%;
      right: 4%;
      width: rem(280px);
      height: rem(280px);

      background-size: contain;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
    color: $green_dark;
    &__title {
      margin-bottom: rem(22px);
      font-size: rem(22px);
      text-align: center;
      line-height: 1;
      .account-info__text {
        margin-top: rem(10px);
      }
    }
    &__text {
      font-size: rem(16px);
      font-weight: 400;
      line-height: 1.6;
    }
    &__input {
      background: none;
      border: none;
      outline: none;
    }
    &__img {
      margin: 0 auto rem(14px);
      display: block;
    }
    &__name {
      margin-bottom: rem(20px);
      font-size: rem(20px);
      color: $green_dark;
      word-spacing: 9999px;
    }
    &__btn {
      margin-top: rem(30px);
    }
  }
  &__row {
    display: flex;
    flex-direction: column;
    font-size: rem(18px);
    line-height: 1;
    span {
      margin-right: rem(13px);
      &:nth-child(2) {
        text-transform: none;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: rem(50px);
    margin-bottom: rem(60px);
  }
  &__delete {
    &._outside-prizes {
      display: inline-block;
      margin-top: rem(30px);
      color: #fff;
      border-bottom: 1px solid currentColor;
      &:hover {
        border-block-color: transparent;
      }
    }
  }
  @media (min-width: $sm) {
    &__header-title {
      margin-bottom: rem(72px);
      font-size: rem(64px);
      letter-spacing: rem(10px);
      span {
        display: inline;
        margin-left: 0;
      }
    }
    &__row {
      flex-direction: row;
    }
    &__content {
      min-height: auto;

      padding-bottom: rem(0px);

      background-size: 123%;
      &:before {
        display: block;
      }
    }

    &__footer {
      flex-direction: row;
      margin-bottom: rem(70px);
      padding: 0;
    }
  }

  @media (min-width: $md) {
    padding-top: 0;
    &-tabs {
      &-tab {
        &__inner,
        .checks & {
          padding: rem(35px) rem(50px) rem(45px) !important;
        }
      }
    }
    &__left-column {
      flex: 0 0 33%;
    }
    &__content {
      padding-top: rem(330px);
      padding-bottom: rem(0px);
    }
    &-info {
      &__row {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      &__name {
        font-size: rem(24px);
      }
      &__title {
        margin-bottom: rem(30px);
        text-align: left;
        &._small {
          font-size: rem(16px);
        }
        span {
          display: block;
          margin-bottom: rem(10px);
        }
      }
      &__text {
        font-size: rem(24px);
        line-height: 1.6;
      }
      &__btn {
        margin-top: auto;
      }
      &__col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: auto;
      }
      &__block {
        flex: 0 0 40%;
        padding: rem(30px);
        margin-right: rem(50px);
        border-radius: rem(20px);
      }
      &-checks {
        margin-bottom: rem(20px);
      }
    }
  }
}
.profile {
  position: relative;
  margin-bottom: rem(100px);
  padding: rem(35px) rem(20px) rem(36px);
  background: #fff;
  border-radius: rem(20px);
  box-shadow: 0px 0px rem(27px) rgba(0, 0, 0, 0.25);
  &__col {
    margin-bottom: rem(40px);
  }
  &-power {
    flex: 0;
    margin-top: rem(100px);
    align-items: flex-end;
    &__total {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: rem(18px);
      padding-bottom: rem(25px);
      font-weight: 700;
      text-align: center;
      font-size: rem(42px);
      z-index: 1;
      strong {
        font-size: rem(84px);
        line-height: 1;
      }
    }
  }
  @media (min-width: $md) {
    margin-bottom: rem(240px);
    padding: rem(65px) rem(50px) rem(46px) rem(77px);
    &::before {
      display: block;
      height: 320%;
      background-position: center right;
      transform: translate(-50%, -50%);
    }
    &__col {
      padding-top: rem(30px);
      margin-bottom: 0;
    }
    &-power {
      margin-top: 0;
      &__total {
        &::before {
          width: rem(450px);
          height: rem(450px);
        }
      }
    }
  }
}
.prizes {
  position: relative;
  &-list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    &__item {
      position: relative;
      flex: 0 0 27%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: rem(110px);
      &._big {
        flex: 0 0 37%;
      }
      &:first-of-type,
      &.light {
        .prizes-list__img-wrapper {
          background: #d2f68c;
        }
      }
      &:nth-of-type(2),
      &.red {
        .prizes-list__img-wrapper {
          background: #ff2011;
        }
      }
      &:nth-of-type(3),
      &.green {
        .prizes-list__img-wrapper {
          background: #00582e;
        }
      }
    }
    &__img {
      height: 60%;
      &-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: rem(285px);
        margin-bottom: rem(45px);
        box-shadow: 0px 7px 33px rgba(0, 0, 0, 0.65);
        border-radius: rem(20px);
        ._big & {
          height: rem(407px);
        }
      }
    }
    &__shadow {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 120%;
      transform: translateX(-50%);
    }
  }
}
.checks {
  position: relative;
  padding-top: rem(50px);
  &-table {
    position: relative;
    width: 100%;
    padding: rem(30px) rem(17px) rem(30px);
    text-align: left;
    background: #fff;
    box-shadow: 0px 0px rem(27px) rgba(0, 0, 0, 0.25);
    border-radius: rem(20px);
    z-index: 1;
  }
  &__tabs {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 2;
    &-nav {
      position: relative;
      height: rem(56px);
      padding: 0 rem(37px);
      margin-bottom: rem(10px);
      background: $green;
      color: #fff;
      text-transform: uppercase;
      line-height: rem(56px);
      text-align: center;
      font-weight: 700;
      font-size: rem(18px);
      border-radius: rem(30px);
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-50%);
        background: #fff;
        border-radius: rem(30px);
        opacity: 0;
        z-index: -1;
      }
      &._active {
        color: $green_dark;
        background: #fff;
        &::before {
          opacity: 1;
        }
      }
    }
  }
  &__message {
    color: $green_dark;
    span {
      display: block;
      margin-bottom: rem(20px);
    }
  }
  &__show-more {
    margin: rem(30px) auto 0;
  }
  &__preloader {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: rem(20px);
  }
  @media (min-width: $md) {
    padding-top: rem(200px);
    &-table {
      padding: rem(130px) rem(90px) rem(82px);
    }
    &__tabs {
      margin-bottom: rem(22px);
      flex-direction: row;
      &-nav {
        margin-right: rem(40px);
        margin-bottom: 0;
        margin-left: 1px;
        &::before {
          top: rem(-20px);
          width: calc(100% + 2px);
          height: 300%;
        }
      }
    }
  }
}
</style>
