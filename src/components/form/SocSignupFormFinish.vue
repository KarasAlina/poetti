<template>
  <form class="signup email_form">
    <inputText
      size="md"
      color="grey"
      placeholder="Фамилия, имя, отчество *"
      type="text"
      fieldId="name"
      :field="name"
      @input="name = $event"
      :class="{
        error: validationStatus($v.name) || errorMessage.name,
      }"
      :error="
        (!$v.name.required && $v.name.$error
          ? 'Обязательное поле'
          : !$v.name.rus && $v.name.$error
          ? 'Введите текст на русском языке'
          : '') || this.errorMessage.name
      "
    />
    <div class="signup__checkbox_list">
      <checkBox
        :label="`Я согласен (-на) с <a href='${publicPath}docs/rules.pdf' class='_undeline-link' target='_blank'>правилами акции</a> и <a href='${publicPath}docs/rules.pdf' class='_undeline-link' target='_blank'>пользовательским соглашением</a>`"
        :field="checkbox"
        :class="{
          error: validationStatus($v.checkbox) || errorMessage.checkbox,
        }"
        :error="errorMessage.checkbox"
        @input="(checkbox = $event), showRules()"
      />
      <checkBox
        label="Я&nbsp;согласен на&nbsp;получение рекламных материалов"
        :field="checkbox2"
        :class="{
          error: validationStatus($v.checkbox2) || errorMessage.checkbox2,
        }"
        :error="errorMessage.checkbox2"
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
        Зарегистрироваться
        <img src="../../assets/img/spinner.svg" class="loader" alt="" />
      </button>
    </div>
  </form>
</template>

<script>
import CheckBox from "./checkBox.vue";
import inputText from "@/components/form/inputText.vue";
import { required, sameAs } from "vuelidate/lib/validators";
const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

export default {
  name: "EmailForm",
  props: ["userName"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      ready: false,
      name: null,
      socName: null,
      checkbox: false,
      checkbox2: false,
      errorMessage: {
        name: null,
        checkbox: null,
        checkbox2: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    name: { required, rus },
    checkbox: {
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
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        name: null,
        checkbox: null,
        checkbox2: null,
      };
    },

    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    showRules() {
      if (!this.$store.getters.agree) {
        this.$modal.show("document_popup", {
          src: this.publicPath + "docs/rules.pdf",
        });
      }
    },
    submit() {
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        let params = {
          name: this.name,
          rules1: 1,
          rules2: this.checkbox2 ? 1 : 0,
        };
        let childrenArr = [];
        childrenArr = this.childrenList;

        this.$store
          .dispatch("UpdateProfile", params)
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
              if (r.error && r.error.name) {
                [this.errorMessage.name] = r.error.name;
                fieldsError = true;
              }
              if (r.message && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.error,
                });
              }
            } else {
              this.submitStatus = null;
              // this.gtmEvent(this.socName, "success", "registration");
              this.$modal.hide("soc_signup-finish");
              this.$modal.show("success_signup");
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
  mounted() {
    this.socId = this.$store.getters.signupSocId;
    this.$store.commit("SIGNUP_SOC_ID", null);
    this.name = this.userName || null;
    setTimeout(() => {
      document.getElementById("name").value = this.name;
    }, 500);
  },
  components: {
    inputText,
    CheckBox,
  },
};
</script>

<style lang="scss" scoped>
.authorization__signin-footer {
  display: flex;
  .btn {
    margin: 0 auto;
  }
}
.email_form {
  margin-top: rem(25px);
}
</style>
