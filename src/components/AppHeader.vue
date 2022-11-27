<template>
  <header class="header" :class="{ _modified: headerModified }">
    <div class="container">
      <div class="header__row">
        <div class="header__inner">
          <div
            class="header__hamburger"
            v-if="$route.name !== 'Taplink'"
            @click="showBurger()"
          >
            <img
              src="../assets/images/icons/hamburger.svg"
              alt=""
              class="header__hamburger-pic"
            />
          </div>
          <button class="header__menu_mob-close" @click="showBurger()"></button>
          <div class="header__nav">
            <ul class="header__nav-list">
              <li
                v-for="nav in navigation"
                :key="nav.name"
                class="header__nav-link"
                :data-menuanchor="nav.anchor"
                @click="
                  nav.gtm
                    ? gtmEvent(nav.anchor || 'rules', 'click', 'internal')
                    : ''
                "
                :class="{ active: $route.hash === `#${nav.anchor}` }"
              >
                <router-link
                  v-if="nav.anchor"
                  :to="{ path: '/', hash: `#${nav.anchor}` }"
                >
                  {{ nav.name }}
                </router-link>
                <a
                  v-else-if="nav.path"
                  :href="publicPath + 'docs/' + nav.path"
                  class="d-flex aic"
                  target="_blank"
                >
                  {{ nav.name }}
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2 1C6.2 0.613401 5.8866 0.3 5.5 0.3C5.1134 0.3 4.8 0.613401 4.8 1L6.2 1ZM5.00503 10.945C5.27839 11.2183 5.72161 11.2183 5.99498 10.945L10.4497 6.4902C10.7231 6.21684 10.7231 5.77362 10.4497 5.50025C10.1764 5.22689 9.73316 5.22689 9.4598 5.50025L5.5 9.46005L1.5402 5.50025C1.26684 5.22689 0.82362 5.22689 0.550253 5.50025C0.276886 5.77362 0.276886 6.21684 0.550253 6.4902L5.00503 10.945ZM4.8 1L4.8 10.45L6.2 10.45L6.2 1L4.8 1Z" fill="#F1C27A"/>
                    <line x1="0.7" y1="11.95" x2="10.3" y2="11.95" stroke="#F1C27A" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </a>
                <router-link v-else :to="{ path: '/' }">
                  {{ nav.name }}
                </router-link>
              </li>
              <li class="header__nav-link" v-if="user">
                <router-link to="/profile">
                  <span
                    >{{ user.profile.name || "Личный кабинет" }}
                    <span v-if="user.profile.surname">
                      {{
                        user.profile.surname.length > 7
                          ? `${user.profile.surname.substring(0, 1)}.`
                          : user.profile.surname
                      }}
                    </span>
                  </span>
                </router-link>
              </li>
              <li v-else class="header__nav-link">
                <a
                  href="#"
                  @click.prevent="showModal('authorization')"
                  >
                  <span>вход/регистрация</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="header__menu_mob">
          <ul class="header__nav">
            <li
              v-for="nav in navigation"
              :key="nav.name"
              class="header__nav-link"
            >
              <router-link
                v-if="nav.anchor"
                :to="{ path: '/', hash: `#${nav.anchor}` }"
                @click.native="
                  showBurger(),
                    nav.gtm ? gtmEvent(nav.anchor, 'click', 'internal') : ''
                "
              >
                {{ nav.name }}
              </router-link>
              <a
                v-else-if="nav.path"
                :href="publicPath + 'docs/' + nav.path"
                @click="nav.gtm ? gtmEvent('rules', 'click', 'internal') : ''"
                target="_blank"
                class="d-flex aic jcc"
              >
                {{ nav.name }}
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.2 1C6.2 0.613401 5.8866 0.3 5.5 0.3C5.1134 0.3 4.8 0.613401 4.8 1L6.2 1ZM5.00503 10.945C5.27839 11.2183 5.72161 11.2183 5.99498 10.945L10.4497 6.4902C10.7231 6.21684 10.7231 5.77362 10.4497 5.50025C10.1764 5.22689 9.73316 5.22689 9.4598 5.50025L5.5 9.46005L1.5402 5.50025C1.26684 5.22689 0.82362 5.22689 0.550253 5.50025C0.276886 5.77362 0.276886 6.21684 0.550253 6.4902L5.00503 10.945ZM4.8 1L4.8 10.45L6.2 10.45L6.2 1L4.8 1Z" fill="#F1C27A"/>
                  <line x1="0.7" y1="11.95" x2="10.3" y2="11.95" stroke="#F1C27A" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </a>
              <router-link v-else :to="{ path: '/' }">
                {{ nav.name }}
              </router-link>
            </li>
            <router-link
              tag="li"
              class="header__nav-link header__login _profile"
              active-class="header__nav-link--active"
              to="/profile"
              v-if="user"
              @click.native="showBurger()"
            >
              <img src="../assets/images/icons/user.svg" class="icon" alt="" />
              <span>{{ user.profile.email || 'личный кабинет'}}</span>
            </router-link>
            <li
              @click.prevent="showModal('authorization'), showBurger()"
              v-else
              class="header__nav-link header__login _profile"
            >
              <img src="../assets/images/icons/user.svg" alt="" />
              <span>вход/регистрация</span>
            </li>
          </ul>
          <ul class="header__nav-info" v-if="user">
            <li
              class="header__nav-info-item"
              v-if="user"
              @click="showModal('change_password')"
            >
              <img src="../assets/images/icons/lock.svg" alt="">
              <span>сменить пароль</span>
            </li>
            <li class="header__nav-info-item" v-if="user" @click="logout()">
              <img src="../assets/images/icons/exit.svg" alt="">
              <span>выход</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["headerModified"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      phone: "7 951 376-98-787",
      email: "Ivanov_ivan@mail.ru",
      navigation: [
        {
          name: "как участвовать",
          anchor: "steps",
          gtm: false,
        },
        {
          name: "голосование за фото",
          anchor: "voting",
          gtm: false,
        },
        {
          name: "призы",
          anchor: "prizes",
          gtm: true,
        },
        // {
        //   name: "победители",
        //   anchor: "winners",
        //   gtm: true,
        // },
        {
          name: "вопросы и ответы",
          anchor: "faq",
          gtm: true,
        },
        {
          name: "правила",
          path: "docs/rules.pdf",
          gtm: true,
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    toUploadCheck() {
      if (this.user.badUser === 1) {
        this.$modal.show("common_error", {
          size: "lg",
          title: "Внимание!",
          text: `<p>Действие учётной записи приостановлено вследствие подозрительной активности.</p> <p>Чтобы восстановить учетную запись, предоставьте, пожалуйста, фото или видео купленного акционного товара, с&nbsp;которого были зарегистрированы коды.</p> <p>Данные материалы отправьте на&nbsp;электронный адрес <a href='mailto:support@chaban-promo.ru' class='_undeline-link'>support@chaban&nbsp;-&nbsp;promo.ru</a> с&nbsp;почты, указанной при регистрации аккаунта.</p>`,
        });
      } else {
        if (this.$store.getters.user) {
          this.$modal.show("code_registration");
        } else {
          this.$modal.show("authorization");
        }
      }

      // this.$modal.show("temporarily_unavailable");
    },

    showModal(name) {
      this.$modal.show(name);
    },
    logout() {
      this.$store.dispatch("LogOut");
      document.location.reload();
    },
    showBurger() {
      let header = document.querySelector(".header");
      if (!header.classList.contains("header--mob_active"))
        header.classList.add("header--mob_active");
      else header.classList.remove("header--mob_active");
    },
    toFeedback() {
      this.$modal.show("feedback");
    },
    wordVariant(items) {
      return items === 1 ? "сила" : items > 1 && 4 > items ? "силы" : "сил";
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 100;
  pointer-events: none;
  * {
    pointer-events: none;
  }
  .container {
    position: relative;
    padding-top: 0;
    padding-bottom: rem(15px);
    .header--mob_active & {
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    }
  }
  &__row {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &.header--mob_active {
    .header__hamburger {
      opacity: 0;
      visibility: hidden;
    }

    .header__menu_mob {
      display: flex;
    }
    .header__menu_mob-close {
      opacity: 1;
    }
  }

  &__inner {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  &__nav {
    position: relative;
    display: none;
    width: 100%;
    align-items: center;
    flex-direction: column;
    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: auto;
      &-item {
        display: flex;
        align-items: center;
        font-size: rem(16px);
        text-transform: uppercase;
        &:not(:last-of-type) {
          margin-bottom: rem(21px);
        }
        svg,img {
          width: rem(24px);
          margin-right: rem(15px);
        }
      }
    }
  }

  &__nav-link {
    margin-bottom: 0;
    font-size: rem(20px);
    line-height: normal;
    text-align: center;
    white-space: nowrap;
    color: $yellow;
    transition: all 0.3s ease-in-out;
    pointer-events: all;
    a {
      pointer-events: all;
    }
  }

  &__nav-retail {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  &__nav-retail-img {
    max-height: rem(35px);
    margin-bottom: rem(30px);
  }
  &__hamburger {
    position: absolute;
    top: rem(21px);
    right: 0;
    display: block;
    width: rem(30px);
    margin: 0;
    pointer-events: all;
    img {
      width: 100%;
    }
  }
  &__menu-logos {
    display: flex;
    align-items: center;
    margin: auto;
  }
  &__menu_mob {
    display: none;
    position: absolute;
    width: 100%;
    top: 0px;
    right: 0;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background: $green;
    padding: rem(73px) rem(23px) rem(60px);
    pointer-events: all;
    z-index: 9;
    * {
      pointer-events: all !important;
    }
    .btn {
      margin: auto auto 0;
    }
    .header__nav {
      display: flex;
      height: 100%  ;
      &-item {
        width: auto
      }
      &-link {
        margin-bottom: rem(25px);
        font-size: rem(16px);
        text-align: center;
        white-space: nowrap;
        text-transform: uppercase;
        color: $yellow;
        transition: all 0.3s ease-in-out;
        pointer-events: all;
        svg,img {
          width: rem(24px);
          margin-right: rem(10px);
        }
        &._profile {
          display: flex;
          align-items: center;
          margin-top: auto;
          justify-content: center;
          padding: rem(6px) rem(13px);
          border: 1px solid $yellow;
        }
      }
    }
  }
  &__logo {
    flex-grow: 0;
    flex-shrink: 0;
    &-img {
      height: rem(125px);
    }
  }
  &__menu_mob-close {
    position: absolute;
    top: rem(21px);
    right: rem(0px);
    cursor: pointer;
    align-self: flex-end;
    width: rem(24px);
    height: rem(24px);
    flex-shrink: 0;
    margin-bottom: rem(30px);
    background: url("../assets/images/icons/close.svg") no-repeat center;
    background-size: 100%;
    opacity: 0;
    pointer-events: all;
    z-index: 10;
  }
  @media (min-width: $sm) {
    &__menu_mob {
      max-width: 55%;
      box-shadow: -5px 4px 10px rgba(0, 0, 0, 0.15);
    }
  }
  @media (max-width: $sm) {
    &__logo {
      transform: scale(0.55);
      transform-origin: top center;
      transition: 0.4s;
      ._modified & {
        transform: scale(1);
      }
    }
  }
  @media (min-width: $md) {
    background: $brown;
    .container {
      padding-top: 0;
      padding-bottom: 0;
    }
    &__inner {
      pointer-events: none;
    }
    &__login {
      position: relative;
      height: rem(40px);
      margin-top: 0;
      font-size: rem(12px);
      text-transform: uppercase;
      transition: 0.4s;
      img {
        height: 70%;
        transition: 0.4s;
        &:nth-of-type(2) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
        }
      }
      &:hover {
        color: $green_dark;
        background: #fff;
        img {
          opacity: 0;
          &:nth-of-type(2) {
            opacity: 1;
          }
        }
      }
    }
    &__row {
      align-items: flex-start;
    }
    &__menu-logos {
      display: none;
    }
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;
      flex-shrink: 0;
      height: rem(244px);
      margin-right: rem(50px);
      transition: 0.4s;

      &-img {
        height: 100%;
      }
    }
    &__nav-list {
      transform: translateY(-150%);
      transition: 0.4s;
      ._modified & {
        transform: translateY(0%);
      }
    }
    &__nav,
    &__nav-list {
      display: flex;
      flex: auto;
      height: rem(70px);
      justify-content: center;
      flex-direction: row;
      align-items: center;
      pointer-events: none;
      * {
        pointer-events: all;
      }
    }
    &__nav-link {
      position: relative;
      font-size: rem(14px);
      margin: 0;
      padding: rem(2px) rem(15px);
      line-height: 1;
      padding-bottom: rem(2px);
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      letter-spacing: rem(1.7px);
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      &:not(:last-of-type) {
        border-right: 1px solid $yellow;
      }
      &.active,
      &.router-link-exact-active {
        color: $green_dark;
        cursor: default;
        path {
          fill: $green_dark;
        }
      }
      svg {
        margin-left: rem(5px);
      }
    }
    ._profile {
      position: relative;
      margin-left: rem(15px);
    }
    .container {
      display: flex;
    }
    &__dropdown {
      position: absolute;
      top: calc(100% + #{rem(16px)});
      right: 0;
      min-width: rem(250px);
      display: flex;
      padding: rem(15px) rem(25px);
      flex-direction: column;
      align-items: center;
      color: $green_dark;
      background: #fff;
      font-size: rem(16px);
      box-shadow: 0px 0px rem(22px) rgba(23, 90, 51, 0.69);
      border-radius: rem(10px);
      transition: 0.4s;
      opacity: 0;
      pointer-events: none;
      cursor: default;
      & > * {
        pointer-events: none !important;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 100%;
        height: rem(16px);
      }
      &::before {
        content: "";
        display: block;
        width: rem(15px);
        height: rem(15px);
        position: absolute;
        top: rem(-7px);
        right: rem(15px);
        transform: rotate(50deg) skew(15deg, 0deg);
        background: #fff;
      }
      &-item {
        &:not(:last-of-type) {
          margin-bottom: rem(10px);
        }
        strong {
          font-size: rem(22px);
          font-weight: 900;
        }
        input {
          border: none;
          background: none;
          outline: none;
          padding: 0;
          text-align: center;
          font-size: rem(16px);
          pointer-events: none;
          font-weight: 700;
        }
      }
      &-wrapper {
        position: relative;
        &:hover {
          & > .header__dropdown {
            opacity: 1;
            pointer-events: all;
            & > * {
              pointer-events: all !important;
            }
          }
        }
      }
    }
    &__nav_mob {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__hamburger,
    &__menu_mob {
      display: none;
    }
  }
}

.header__menu_mob {
  display: none;
  input {
    background: none;
    border: none;
    outline: none;
    color: #fff;
    margin-right: rem(-30px);
    font-weight: 700;
    font-size: rem(14px);
    opacity: 1;
    &::placeholder {
      opacity: 1;
      color: #fff;
    }
  }
}

.header__menu_mob.active {
  display: flex !important;
}
</style>
