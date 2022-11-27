<template>
  <form class="recover">
    <inputText
      placeholder="e-mail"
      :field="email"
      size="lg"
      @input="email = $event"
      type="email"
      :class="{ error: validationStatus($v.email) || errorMessage.email }"
      :error="
        (!$v.email.required && $v.email.$error
          ? 'Обязательное поле'
          : !$v.email.email && $v.email.$error
            ? 'Некорректный e-mail'
          : '') || errorMessage.email
      "
    />

    <div class="recover__footer">
      <button
        type="button"
        class="btn btn--primary w-100"
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

import { required, email } from "vuelidate/lib/validators";

export default {
  name: "RecoverForm",
  data() {
    return {
      ready: false,
      index: 1,
      email: null,

      errorMessage: {
        email: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    email: { required, email },
  },

  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
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
          .dispatch("Recover", {
            email: this.email,
          })
          .then((r) => {
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.email) {
                [this.errorMessage.email] = r.error.email;
                fieldsError = true;
              }

              if (r.error && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.error,
                });
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("recover");
              this.$modal.show("success_recover", {
                email: this.email,
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

<style lang="scss">
.recover {
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: rem(35px);
    text-align: center;
  }
  .btn {
    margin-bottom: rem(15px);
  }
}
</style>
