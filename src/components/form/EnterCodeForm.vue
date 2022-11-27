<template>
  <div>
    <form @submit.prevent="submitSendCode()">
      <input type="hidden" name="phone" v-model="phoneNumber" />
      <inputText
        :field="code"
        size="lg"
        @input="code = $event"
        :class="{
          error:
            validationStatus($v.code) ||
            errorMessage.phoneNumber ||
            errorMessage.code,
        }"
        :error="
          (!$v.code.required && $v.code.$error
            ? 'Обязательное поле'
            : !$v.code.minLength && $v.code.$error
            ? 'Минимум ' + $v.code.$params.minLength.min + ' символов'
            : !$v.code.maxLength && $v.code.$error
            ? 'Максимум ' + $v.code.$params.maxLength.max + ' символов'
            : errorMessage.code) || errorMessage.phoneNumber
        "
      />
      <div class="recover__footer">
        <button
          class="btn btn--primary"
          type="submit"
          :class="{ loading: submitStatus == 'PENDING' }"
        >
          Отправить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import inputText from "@/components/form/inputText.vue";

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  props: ["phone", "formData"],
  components: {
    inputText,
  },
  data() {
    return {
      ready: false,
      code: null,
      phoneNumber: this.phone,
      errorMessage: {
        phoneNumber: null,
        code: null,
      },

      submitStatus: null,
    };
  },
  validations: {
    phoneNumber: {
      required,
    },
    code: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
    },
  },
  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        phoneNumber: null,
        code: null,
      };
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    submitSendCode() {
      console.log("submit");
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";
        const formData = this.formData;
        this.$store
          .dispatch("SignUp", {
            login: formData.login,
            name: formData.name,
            surname: formData.surname,
            phone: this.phoneNumber,
            code: this.code,
            city: formData.city,
            rules1: formData.rules1,
            rules2: formData.rules2,
          })
          .then((r) => {
            console.log(r);
            if (!r.result) {
              this.submitStatus = null;
              let fieldsError = null;
              if (r.error && r.error.phone) {
                [this.errorMessage.phoneNumber] = r.error.phone;
                fieldsError = true;
              }
              if (r.error && r.error.code) {
                [this.errorMessage.code] = r.error.code;
                fieldsError = true;
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("enter_code");
              this.$modal.show("success_signup");
              this.$store
                .dispatch("SignIn", {
                  login: this.phoneNumber,
                  password: this.code,
                })
                .then((r) => {
                  if (!r.result) {
                    this.$modal.show("common_error", {
                      list: Object.values(r.error),
                    });
                  } else {
                    this.$store.commit("SET_TOKEN", r.data.auth_key);
                    this.$store.dispatch("GetProfile").then((res) => {
                      if (!res.result) {
                        this.$router.push("/");
                      } else {
                        this.$root.$emit("onLogined");
                        this.$router.push("/profile");
                        this.$modal.hide("authorization");
                      }
                    });
                  }
                });
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
