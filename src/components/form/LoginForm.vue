<template>
  <form class="authorization__signin">
    <div class="modal__subtitle">в личный кабинет</div>
    <div class="authorization__signin-fields">
      <inputText
        placeholder="номер телефона"
        size="lg"
        type="tel"
        :mask="'+7(###) ###-##-##'"
        :field="phone"
        @input="phone = $event"
        :class="{
          error: validationStatus($v.phone) || this.errorMessage.phone,
        }"
        :error="
          (!$v.phone.required && $v.phone.$error ? 'Обязательное поле' : '') ||
          this.errorMessage.phone
        "
      />
      <inputText
        placeholder="пароль"
        size="lg"
        type="password"
        :field="password"
        :class="{
          error: validationStatus($v.password) || this.errorMessage.password,
        }"
        :error="
          (!$v.password.required && $v.password.$error
            ? 'Обязательное поле'
            : !$v.password.minLength && $v.password.$error
            ? 'Минимум ' + $v.password.$params.minLength.min + ' символов'
            : '') || this.errorMessage.password
        "
        @input="password = $event"
      />
      <div class="authorization__row">
        <checkBox
          label="Запомнить меня"
          :field="checkbox"
          class="authorization__checkbox _center"
          :class="{
            error: validationStatus($v.checkbox) || this.errorMessage.checkbox,
          }"
          :error="this.errorMessage.checkbox"
          @input="checkbox = $event"
        />
        <a
          href="javascript:void(0)"
          class="forget-link"
          @click.prevent="switchToRecover()"
          >Забыли пароль?</a
        >
      </div>

      <div class="authorization__signin-footer">
        <button
          type="button"
          class="btn btn--primary btn--lg"
          @click="submit()"
          :class="{ loading: submitStatus == 'PENDING' }"
        >
          Войти<img src="../../assets/img/spinner.svg" class="loader" alt="" />
        </button>
        <button
          type="button"
          class="btn btn--bordered btn--lg modal__another-option"
          @click="showSignUpModal()"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import CheckBox from "./checkBox.vue";
import inputText from "@/components/form/inputText.vue";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  props: ["userPhone"],
  data() {
    return {
      domain: "https://national.emlsdr.ru/",
      ready: false,
      phone: null,
      password: null,
      checkbox: null,
      errorMessage: {
        phone: null,
        password: null,
        checkbox: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    phone: { required },
    password: { required, minLength: minLength(4) },
  },

  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        phone: null,
        password: null,
      };
    },

    close() {
      this.$store.commit("SHOW_POPUP_CONTENT", false);
    },
    switchToRecover() {
      this.$modal.hide("authorization");
      this.$modal.show("recover");
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    submit() {
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("SignIn", {
            login: this.phone,
            password: this.password,
          })
          .then((r) => {
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.email) {
                [this.errorMessage.phone] = r.error.email;
                fieldsError = true;
              } else if (r.error && r.error.login) {
                [this.errorMessage.phone] = r.error.login;
                fieldsError = true;
              }

              if (r.error && r.error.password) {
                [this.errorMessage.password] = r.error.password;
                fieldsError = true;
              }

              if (r.message && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.message,
                });
              }
            } else {
              this.submitStatus = null;

              this.$store.commit("SET_TOKEN", r.data.auth_key);
              this.gtmEvent("auth_success", "do", "internal");
              this.$store.dispatch("GetProfile").then((res) => {
                if (!res.result) {
                  this.$router.push("/");
                } else {
                  if (
                    !res.data.profile.name || res.data.profile.name === null ||
                    !res.data.profile.city || res.data.profile.city === null
                  ) {
                    this.$modal.hide("authorization");
                    this.$modal.show("update_info", {
                      user: res.data.profile,
                    });
                  } else {
                    this.$root.$emit("onLogined");
                    this.$router.push("/profile");
                    this.$modal.hide("authorization");
                  }
                }
              });
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
    showSignUpModal() {
      this.$modal.hide("authorization");
      this.$modal.show("signup");
    },
  },

  mounted() {
    this.phone = this.userPhone || null;
  },
  components: {
    inputText,
    CheckBox
  },
};
</script>

<style lang="scss" scoped>
.authorization {
  h3 {
    text-align: center;
    margin-top: 8px;
  }

  &__signin {
    width: 100%;
    margin: 0 auto;
    &-fields {
      display: flex;
      width: 100%;
      margin: rem(20px) auto 0;
      flex-direction: column;
      align-items: center;
    }

    &-footer {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .forget-link {
      margin: auto;
      white-space: nowrap;
      text-transform: uppercase;
      font-size: rem(14px);
      margin-bottom: rem(15px);
      text-decoration-line: underline;
      text-align: right;
    }

    .forget-link:hover {
      text-decoration: none;
    }
  }
  &__checkbox {
    white-space: nowrap;
  }
  &__row {
    width: 100%;
    display: flex;
    margin-top: rem(10px);
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: rem(20px);
    * {
      flex: 0 0 45%;
    }
  }
  @media (min-width: $md) {
    &__checkbox {
      margin-bottom: rem(15px);
    }
    &__signin {
      .forget-link {
        margin: rem(4px) 0 rem(20px) auto;
        font-size: rem(14px);
        line-height: rem(19px);
      }
      &-footer {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        .btn {
          min-width: auto;
          width: 47%;
          padding: 0;
          margin: 0;
        }
      }
    }
    &__row {
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: rem(5px);
      margin-top: rem(10px);
    }
  }
}
</style>
