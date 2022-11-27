<template>
  <div class="signup">
    <div class="modal__subtitle">для участия в акции</div>
    <div class="signup__fields">
      <inputText
        placeholder="Имя"
        :field="first_name"
        size="lg"
        :class="{
          error:
            validationStatus($v.first_name) || this.errorMessage.first_name,
        }"
        :error="
          (!$v.first_name.required && $v.first_name.$error
            ? 'Обязательное поле'
            : !$v.first_name.rus && $v.first_name.$error
            ? 'Введите текст на русском языке'
            : '') || this.errorMessage.first_name
        "
        @input="first_name = $event"
      />
      <inputText
        placeholder="Фамилия"
        :field="last_name"
        size="lg"
        :class="{
          error: validationStatus($v.last_name) || this.errorMessage.last_name,
        }"
        :error="
          (!$v.last_name.required && $v.last_name.$error
            ? 'Обязательное поле'
            : !$v.last_name.rus && $v.last_name.$error
            ? 'Введите текст на русском языке'
            : '') || this.errorMessage.last_name
        "
        @input="last_name = $event"
      />

      <inputText
        placeholder="e-mail"
        :field="email"
        size="lg"
        type="email"
        :class="{
          error: validationStatus($v.email) || this.errorMessage.email,
        }"
        :error="
          (!$v.email.required && $v.email.$error
            ? 'Обязательное поле'
            : !$v.email.email && $v.email.$error
            ? 'Некорректный e-mail'
            : '') || this.errorMessage.email
        "
        @input="email = $event"
      />
      <inputText
        placeholder="номер телефона"
        :field="phone"
        size="lg"
        @input="phone = $event"
        type="tel"
        :mask="'+7(###) ###-##-##'"
        :class="{
          error: validationStatus($v.phone) || this.errorMessage.phone,
        }"
        :error="
          (!$v.phone.required && $v.phone.$error
            ? 'Обязательное поле'
            : !$v.phone.minLength && $v.phone.$error) || this.errorMessage.phone
        "
      />
      <label
        class="form__field form__field--white"
        :class="{
          error: validationStatus($v.city) || this.errorMessage.city,
        }"
      >
        <dadata-suggestions
          id="city"
          placeholder="Город"
          class="form__field-input form__field-input--lg"
          field-value="value"
          :options="dadataOptionsCity"
          v-model="city"
        />
        <div class="error-hint" v-if="errorMessage.city || $v.city.$error">
          {{
            (!$v.city.required && $v.city.$error ? "Обязательное поле" : "") ||
            errorMessage.city
          }}
        </div>
      </label>
    </div>

    <div class="signup__checkbox_list">
      <checkBox
        color="_center"
        :label="`Я согласен с <a href='${publicPath}docs/rules.pdf' class='_undeline-link _bold' target='_blank'>правилами акции</a>`"
        :field="checkbox"
        :class="{
          error: validationStatus($v.checkbox) || this.errorMessage.checkbox,
        }"
        :error="this.errorMessage.checkbox"
        @input="checkbox = $event"
      />
      <checkBox
        color="white"
        :label="`Я&nbsp;даю согласие на&nbsp;обработку <a href='${publicPath}docs/terms-of-use.pdf' class='_undeline-link _bold' target='_blank'>персональных данных</a>`"
        :field="checkbox2"
        :class="{
          error: validationStatus($v.checkbox2) || this.errorMessage.checkbox2,
        }"
        :error="this.errorMessage.checkbox2"
        @input="checkbox2 = $event"
      />
    </div>
    <div class="signup__footer">
      <button
        type="button"
        class="btn btn--primary"
        @click="submit()"
        :class="{ loading: submitStatus == 'PENDING' }"
      >
        Зарегистрироваться<img
          src="../../assets/img/spinner.svg"
          class="loader"
          alt=""
        />
      </button>
      <!-- <div class="modal__another-option">
        <p>Уже есть аккаунт? <a href="#" @click="showLogInModal()">Войти</a></p>
      </div> -->
    </div>
  </div>
</template>

<script>
import inputText from "@/components/form/inputText.vue";
import checkBox from "@/components/form/checkBox.vue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

export default {
  name: "SignupForm",
  props: ["network"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      ready: false,
      email: null,
      first_name: null,
      last_name: null,
      phone: null,
      city: null,
      checkbox: false,
      checkbox2: false,
      dadataOptionsCity: {
        bounds: "city-city",
        type: "ADDRESS",
        geoLocation: false,
      },
      errorMessage: {
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        city: null,
        checkbox: null,
        checkbox2: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    email: { required, email },
    first_name: { required, rus },
    last_name: { required, rus },
    phone: { required },
    city: { required },
    checkbox: {
      required,
      sameAs: sameAs(() => true),
    },
    checkbox2: {
      required,
      sameAs: sameAs(() => true),
    },
  },
  watch: {
    checkbox(newVal) {
      if (!newVal) {
        this.$store.commit("SET_AGREE", false);
      }
    },
  },
  methods: {
    selectSuggestion(suggestion) {
      this.city = suggestion.data.city;
    },
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        city: null,
        checkbox: null,
        checkbox2: null,
      };
    },
    showRules() {
      if (!this.$store.getters.agree) {
        this.$modal.show("document_popup", {
          src: this.publicPath + "docs/rules.pdf",
        });
      }
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    submit() {
      this.$v.$touch();
      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";
        const formData = {
          login: this.email,
          name: this.first_name,
          surname: this.last_name,
          phone: this.phone,
          city: this.city,
          rules1: this.checkbox,
          rules2: this.checkbox2,
        };
        this.$store
          .dispatch("CheckRegisterByEmail", formData)
          .then((r) => {
            console.log(r);
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.email) {
                [this.errorMessage.email] = r.error.email || "";
                fieldsError = true;
              } else if (r.error && r.error.login) {
                [this.errorMessage.email] = r.error.login;
                fieldsError = true;
              }
              if (r.error && r.error.phone) {
                [this.errorMessage.phone] = r.error.phone;
                fieldsError = true;
              }
              if (r.error && r.error.city) {
                [this.errorMessage.city] = r.error.city;
                fieldsError = true;
              }
              if (r.error && r.error.name) {
                [this.errorMessage.first_name] = r.error.name;
                fieldsError = true;
              }
              if (r.error && r.error.surname) {
                [this.errorMessage.last_name] = r.error.surname;
                fieldsError = true;
              }

              if (r.error && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.error,
                });
              }
            } else {
              this.$modal.hide("signup");
              this.gtmEvent("signup_success", "do", "internal");
              this.$modal.show("enter_code", {
                phone: this.phone,
                formData,
              });
            }
          })
          .catch((e) => {
            this.submitStatus = null;
            console.log(e);
          });
      }
    },
    showLogInModal() {
      this.$modal.hide("signup");
      this.$modal.show("authorization");
    },
  },
  mounted() {},
  components: {
    inputText,
    checkBox,
  },
};
</script>
<style lang="scss">
.suggestions-hint {
  display: none;
}
.suggestions-wrapper {
  position: absolute !important;
  margin-top: rem(10px) !important;
  width: 100%;
  z-index: 100;
}
.suggestions-suggestions {
  border: none !important;
  border-radius: rem(20px);
  overflow: auto;
  box-shadow: 0 2px 6px rgba(#000, 0.2);
}
.suggestions-suggestion {
  padding: rem(10px) rem(20px) !important;
  &:hover {
    background: rgba($green-light, 0.5) !important;
  }
}
.suggestions-value {
  font-size: rem(16px);
  strong {
    font-weight: bold !important;
    color: $red !important;
  }
}
</style>
<style lang="scss" scoped>
.signup {
  &__row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__checkbox_list {
    margin-top: rem(30px);
    margin-bottom: rem(30px);
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: $sm) {
    &__row {
      flex-direction: row;
    }
    &__checkbox_list {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      & > * {
        flex: 0 0 48%;
      }
    }
  }
}
</style>
