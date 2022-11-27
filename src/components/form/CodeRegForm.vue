<template>
  <form class="recover">
    <inputText
      placeholder="введите код с упаковки"
      :field="code"
      class="_centered-text"
      @input="code = $event"
      :class="{ error: validationStatus($v.code) || errorMessage.code }"
      :error="
        (!$v.code.required && $v.code.$error ? 'Обязательное поле' : '') ||
        errorMessage.code
      "
    />

    <div class="recover__footer">
      <button
        type="button"
        class="btn btn--secondary"
        @click="submit()"
        :class="{ loading: submitStatus == 'PENDING' }"
      >
        Отправить<img
          src="../../assets/img/spinner.svg"
          class="loader"
          alt=""
        />
      </button>
    </div>
  </form>
</template>

<script>
import inputText from "@/components/form/inputText.vue";

import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CodeRegForm",
  data() {
    return {
      ready: false,

      code: null,

      errorMessage: {
        code: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    code: { required, minLength: minLength(6) },
  },

  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        code: null,
      };
    },

    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    showAuthorization() {
      this.$modal.hide("recover");
      this.$modal.show("authorization");
    },
    submit() {
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("RegisterCode", {
            code: this.code,
            lobg: 0,
          })
          .then((r) => {
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.code) {
                [this.errorMessage.code] = r.error.code;
                fieldsError = true;
              }

              if (r.error && !fieldsError) {
                this.$modal.show("error_code", {
                  text: r.error,
                });
              }
            } else {
              this.submitStatus = null;
              this.gtmEvent("cod_success", "do", "internal");
              this.$store.dispatch("GetProfile");
              this.$store.dispatch("GetChecks", { page: 1 });
              this.$modal.hide("code_registration");
              this.$modal.show("common_success", {
                title: "регистрация кода",
                text: "спасибо, ваш код <br>успешно <br>зарегистрирован",
              });
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
  mounted() {},
  components: {
    inputText,
  },
};
</script>
