<template>
  <div class="winners section" id="winners">
    <div class="container">
      <div class="winners__header">
        <h2 class="winners__title section-title">
          <span>Победители</span>
        </h2>
      </div>
      <div class="winners__top">
        <ul class="winners__tabs">
          <li
            v-for="(tab, i) in tabs"
            :key="i"
            class="winners__tabs-nav"
            :class="{ _active: activeItem === tab.value }"
            @click="(activeItem = tab.value), getWinnersResult(tab.value)"
          >
            {{ tab.label }}
          </li>
        </ul>
        <div class="only-desktop">
          <div class="winners__search">
            <form
              class="winners__search-form"
              v-on:submit.prevent="searchForm"
              :class="{
                error:
                  validationStatus($v.searchQuery) ||
                  this.errorMessage.searchQuery,
              }"
            >
              <input
                class="winners__search-field"
                type="tel"
                v-mask="'+7(###) ###-##-##'"
                name="term"
                v-model="searchQuery"
                @focus="errorReset()"
                placeholder="поиск по номеру телефона"
              />
              <button type="submit" class="winners__search-button"></button>
              <div
                v-if="searchQuery"
                @click="formReset()"
                class="winners__search-clear"
              ></div>
              <div
                class="error-hint"
                v-if="
                  validationStatus($v.searchQuery) ||
                  this.errorMessage.searchQuery
                "
                v-html="
                  (!$v.searchQuery.required && $v.searchQuery.$error
                    ? 'Обязательное поле'
                    : !$v.searchQuery.email && $v.searchQuery.$error
                    ? 'Некорректный e-mail'
                    : '') || this.errorMessage.searchQuery
                "
              ></div>
            </form>
          </div>
        </div>
      </div>

      <div class="winners__content">
        <div class="winners__search only-mobile">
          <form
            class="winners__search-form"
            v-on:submit.prevent="searchForm"
            :class="{
              error:
                validationStatus($v.searchQuery) ||
                this.errorMessage.searchQuery,
            }"
          >
            <input
              class="winners__search-field"
              type="tel"
              v-mask="'+7(###) ###-##-##'"
              name="term"
              v-model="searchQuery"
              @focus="errorReset()"
              placeholder="поиск по телефону"
            />
            <button type="submit" class="winners__search-button"></button>
            <div
              v-if="searchQuery"
              @click="formReset()"
              class="winners__search-clear"
            ></div>
            <div
              class="error-hint"
              v-if="
                validationStatus($v.searchQuery) ||
                this.errorMessage.searchQuery
              "
              v-html="
                (!$v.searchQuery.required && $v.searchQuery.$error
                  ? 'Обязательное поле'
                  : !$v.searchQuery.email && $v.searchQuery.$error
                  ? 'Некорректный e-mail'
                  : '') || this.errorMessage.searchQuery
              "
            ></div>
          </form>
        </div>
        <div class="winners__result">
          <Table
            :thead="['иМЯ', 'телефон', 'Дата', 'Приз']"
            v-if="winners && winners.length"
          >
            <template v-slot:tbody>
              <tr v-for="(item, index) in winners" :key="index">
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>
                  {{ item.date }}
                </td>
                <td>
                  {{ item.prize }}
                </td>
              </tr>
            </template>
            <template v-slot:mobile>
              <table class="winners-tab-mobile">
                <tr v-for="(item, index) in winners" :key="index">
                  <td>
                    <table class="table-mobile__inner">
                      <tr>
                        <td>иМЯ</td>
                        <td>
                          {{ item.name }}
                        </td>
                      </tr>
                      <tr>
                        <td>телефон</td>
                        <td>
                          {{ item.phone }}
                        </td>
                      </tr>
                      <tr>
                        <td>Дата</td>
                        <td>
                          {{ item.date }}
                        </td>
                      </tr>
                      <tr>
                        <td>Приз</td>
                        <td>
                          {{ item.prize }}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </template>
          </Table>
          <div class="no-results" v-if="noResults">
            <div v-if="activeItem === 'main'">
              Розыгрыш главного приза состоится 21&nbsp;января 2023 года
              в&nbsp;12:00 по&nbsp;московскому времени в&nbsp;прямом эфире
              на&nbsp;YouTube канале Нальчинского&nbsp;МК -
              <a
                href="https://www.youtube.com/channel/UCQ1IbTYrcgbqfmXAcqb_9Cg"
                class="_undeline-link"
                target="_blank"
                >ссылка</a
              >
            </div>
            <div v-else-if="activeItem === 'special'">
              Определение обладателей специальных призов состоится
              21&nbsp;января 2023 года в&nbsp;12:00 по&nbsp;московскому времени
              в&nbsp;прямом эфире на&nbsp;YouTube канале Нальчинского МК&nbsp; -
              <a
                href="https://www.youtube.com/channel/UCQ1IbTYrcgbqfmXAcqb_9Cg"
                class="_undeline-link"
                target="_blank"
                >ссылка</a
              >
            </div>
            <div v-else>Розыгрыш еще не проводился</div>
          </div>
          <div class="no-results" v-else-if="noSearchResults">
            Ничего не найдено
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Table,
  },
  data: function () {
    return {
      tabs: [
        {
          label: "еженедельные призы",
          value: "week",
        },
        {
          label: "главный приз",
          value: "main",
        },
        {
          label: "специальные призы",
          value: "special",
        },
      ],
      page: 1,
      perPage: 1,
      pages: [],
      currentWeek: "03.10.2022-09.10.2022",
      searchQuery: null,
      date: null,
      total: 0,
      noResults: false,
      noSearchResults: false,
      errorMessage: {
        date: null,
        searchQuery: null,
      },

      winners: [
        {
          name: "Андрей Р.",
          phone: "+7 921 322-**-**",
          date: "01.09.2022",
          prize: "Сертификат м.видео",
        },
        {
          name: "Андрей Р.",
          phone: "+7 921 322-**-**",
          date: "01.09.2022",
          prize: "Сертификат м.видео",
        },
        {
          name: "Андрей Р.",
          phone: "+7 921 322-**-**",
          date: "01.09.2022",
          prize: "Сертификат м.видео",
        },
        {
          name: "Андрей Р.",
          phone: "+7 921 322-**-**",
          date: "01.09.2022",
          prize: "Сертификат м.видео",
        },
        {
          name: "Андрей Р.",
          phone: "+7 921 322-**-**",
          date: "01.09.2022",
          prize: "Сертификат м.видео",
        },
        {
          name: "Андрей Р.",
          phone: "+7 921 322-**-**",
          date: "01.09.2022",
          prize: "Сертификат м.видео",
        },
      ],
      showPaginate: true,
      activeItem: "week",
    };
  },
  validations: {
    searchQuery: { required },
  },
  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        searchQuery: null,
      };
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    setPages(total) {
      this.pages = [];
      if (total) {
        for (let index = 1; index <= total.length; index++) {
          this.pages.push(index);
        }
      }
    },
    paginate() {
      let page = this.page;
      this.$store
        .dispatch("GetWinners", { page: page, type: this.activeItem })
        .then((response) => {
          this.winners = response.data.rows;
        });
    },
    getWinnersResult(val) {
      this.noSearchResults = false;
      this.$store
        .dispatch("GetWinners", { type: val, page: this.page })
        .then((response) => {
          this.winners = response.data.rows;
          if (this.winners.length < 1) {
            this.noResults = true;
          } else {
            this.noResults = false;
          }
        });
    },
    searchForm() {
      this.$v.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      this.page = 1;
      this.$store
        .dispatch("SearchWinners", {
          term: this.searchQuery,
          type: this.activeItem,
          page: this.page,
        })
        .then((response) => {
          this.winners = response.data;
          if (!this.winners.length) {
            this.noSearchResults = true;
          } else {
            this.noSearchResults = false;
          }
        });
    },
    formReset() {
      this.$v.$reset();
      this.searchQuery = null;
      this.noSearchResults = false;
      this.$store
        .dispatch("GetWinners", {
          type: this.activeItem,
          page: this.page,
        })
        .then((response) => {
          this.winners = response.data.rows;
        });
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
  mounted() {},
  created() {
    this.$store
      .dispatch("GetWinners", {
        type: this.activeItem,
        page: this.page,
      })
      .then((response) => {
        this.total = response.data.paging.total;
        this.winners = response.data.rows;
        if (!this.winners.length) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      });
  },
  watch: {
    winners() {
      this.setPages(this.winners);
    },
  },
  computed: {
    // displayedWinners() {
    //   return this.paginate(this.winners);
    // },
  },
};
</script>

<style lang="scss">
.winners {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  background-size: cover;
  &::before {
    content: "";
    display: none;
    position: absolute;
    top: 75%;
    left: 0;
    width: 100%;
    height: rem(300px);
    background: url("../assets/images/waves.svg") no-repeat center top;
    background-size: auto 100%;
    z-index: -2;
  }
  &::after {
    content: "";
    position: absolute;
    top: rem(100px);
    left: 23%;
    width: rem(375px);
    height: rem(375px);
    display: block;
    background: url("../assets/images/hand-2.png") no-repeat center;
    background-size: contain;
    z-index: -1;
  }
  &__top {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: rem(100px);
    z-index: 10;
  }
  &__tabs {
    display: flex;
    flex-direction: column-reverse;
    &-nav {
      position: relative;
      height: rem(56px);
      padding: 0 rem(37px);
      margin-bottom: rem(11px);
      background: $green_dark;
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
  &__select {
    margin: 0;
    width: 100%;
  }
  &__header {
    display: flex;
    justify-content: center;
  }
  &__title {
    margin-bottom: rem(20px);
  }
  .container {
    position: relative;
  }
  &__search-field {
    width: 100%;
    padding: 2px rem(20px) 0 rem(14px);
    height: rem(58px);
    border-radius: rem(50px);
    font-size: rem(18px);
    background: none;
    border: 2px solid $green_dark;
    font-weight: 700;
    text-transform: uppercase;
    box-shadow: none;
    color: $green_dark;
    outline: none;
    &::placeholder {
      color: $green_dark;
    }
  }
  &__search {
    width: 100%;
  }
  &__search-form {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: rem(30px) auto rem(31px);
  }
  &__search-button {
    position: absolute;
    top: 50%;
    right: rem(8px);
    transform: translateY(-50%);
    width: rem(43px);
    height: rem(43px);
    z-index: 1;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: $green_dark;
      border-radius: 28px;
      z-index: -1;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("../assets/images/icons/search.svg") no-repeat center;
      background-size: rem(18px);
    }
  }
  &__search-clear {
    position: absolute;
    top: 0;
    right: rem(64px);
    width: rem(28px);
    height: 100%;
    background: url("../assets/images/icons/close.svg") no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: rem(20px) rem(17px) rem(30px);
    background: #fff;
    border-radius: rem(30px);
    box-shadow: 0px 0px rem(27px) rgba(0, 0, 0, 0.25);
  }
  &__result {
    flex: auto;
  }

  .no-results {
    padding: rem(50px) 0;
    text-align: center;
    color: $green_dark;
  }
  @media (min-width: $md) {
    &::before {
      display: block;
      top: 59%;
      height: 150%;
      background-size: 100%;
    }
    &::after {
      top: rem(-20px);
      left: 60%;
      width: rem(545px);
      height: rem(545px);
    }
    .container {
      padding-bottom: 0 !important;
    }
    &__content {
      flex-direction: row;
      padding: rem(120px) rem(90px) rem(80px);
    }
    &__top {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: rem(22px);
      padding-top: 0;
    }
    &__title {
      margin-bottom: rem(105px) !important;
    }
    &__search-field {
      width: 100%;
      padding: 2px rem(20px) 0 rem(24px);
    }
    &__tabs {
      flex-direction: row;
      &-nav {
        margin-bottom: 0;
        margin-right: rem(40px);
        margin-left: 1px;
        &::before {
          top: rem(-25px);
          width: calc(100% + 2px);
          height: 320%;
          transform: translateX(-50%);
        }
      }
    }
    &__select {
      flex: 0 0 40%;
    }
    &__search {
      width: auto;
      min-width: rem(474px);
      margin-left: auto;
      &-form {
        margin: 0;
      }
    }
    &-tab-desktop {
      display: block;
    }
    &-tab-mobile {
      display: none;
    }
    .no-results {
      max-width: 70%;
      margin: auto;
      font-size: rem(22px);
    }
  }
}
</style>
