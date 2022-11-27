<template>
  <form class="recover">
    <inputText
      label="старый пароль"
      type="password"
      placeholder="••••••"
      maxlength="4"
      :field="oldPassword"
      @input="oldPassword = $event"
      :class="{
        error: validationStatus($v.oldPassword) || errorMessage.oldPassword,
      }"
      :error="
        (!$v.oldPassword.required && $v.oldPassword.$error
          ? 'Обязательное поле'
          : !$v.oldPassword.minLength && $v.oldPassword.$error
          ? 'Минимум 4 символа'
          : !$v.oldPassword.maxLength && $v.oldPassword.$error
          ? 'Максимум 4 символа'
          : '') || errorMessage.oldPassword
      "
    />
    <inputText
      label="новый пароль"
      type="password"
      placeholder="••••••"
      :field="newPassword"
      @input="newPassword = $event"
      :class="{
        error: validationStatus($v.newPassword) || errorMessage.newPassword,
      }"
      :error="
        (!$v.newPassword.required && $v.newPassword.$error
          ? 'Обязательное поле'
          : !$v.newPassword.minLength && $v.newPassword.$error
          ? 'Минимум 6 символов'
          : '') || errorMessage.newPassword
      "
    />
    <inputText
      label="повторите пароль"
      type="password"
      placeholder="••••••"
      :field="repPassword"
      @input="repPassword = $event"
      :class="{
        error: validationStatus($v.repPassword) || errorMessage.repPassword,
      }"
      :error="
        (!$v.repPassword.required && $v.repPassword.$error
          ? 'Обязательное поле'
          : !$v.repPassword.minLength && $v.repPassword.$error
          ? 'Минимум 6 символов'
          : '') || errorMessage.repPassword
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

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "RecoverForm",
  data() {
    return {
      ready: false,
      oldPassword: null,
      newPassword: null,
      repPassword: null,
      errorMessage: {
        oldPassword: null,
        newPassword: null,
        repPassword: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    oldPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
    },
    newPassword: { required, minLength: minLength(6) },
    repPassword: { required, minLength: minLength(6) },
  },

  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        oldPassword: null,
        newPassword: null,
        repPassword: null,
      };
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
          .dispatch("UpdateProfile", {
            old_password: this.oldPassword,
            pass: this.newPassword,
            passR: this.repPassword,
          })
          .then((r) => {
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.old_password) {
                [this.errorMessage.oldPassword] = r.error.old_password;
                fieldsError = true;
              }
              if (r.error && r.error.pass) {
                [this.errorMessage.newPassword] = r.error.pass;
                fieldsError = true;
              }
              if (r.error && r.error.passR) {
                [this.errorMessage.repPassword] = r.error.passR;
                fieldsError = true;
              }

              if (r.error && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.error,
                });
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("change_password");
              this.$modal.show("common_success", {
                title: "изменение пароля",
                text: "ваш пароль изменен",
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
