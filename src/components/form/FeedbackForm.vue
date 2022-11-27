<template>
  <div class="feedback">
    <form class="feedback__form" :key="indexForm">
      <inputText
        placeholder="e-mail"
        :field="email"
        @input="email = $event"
        :class="{
          error: validationStatus($v.email) || errorMessage.email,
        }"
        :error="
          (!$v.email.required && $v.email.$error
            ? 'Обязательное поле'
            : !$v.email.email && $v.email.$error
            ? 'Некорректный e-mail'
            : '') || errorMessage.email
        "
      />
      <inputText
        placeholder="имя"
        :field="name"
        @input="name = $event"
        :class="{ error: validationStatus($v.name) || errorMessage.name }"
        :error="
          (!$v.name.required && $v.name.$error
            ? 'Обязательное поле'
            : !$v.name.rus && $v.name.$error
            ? 'Введите текст на русском языке'
            : '') || errorMessage.name
        "
      />
      <Select
        color="grey"
        :options="[
          { id: 1, label: 'Регистрация в акции' },
          { id: 2, label: 'Регистрация кода' },
          { id: 3, label: 'Призовой фонд' },
          { id: 4, label: 'Вопросы по правилам' },
          { id: 5, label: 'Технические вопросы' },
          { id: 6, label: 'Другое' },
        ]"
        field="тема"
        @input="subject = $event.id"
        :class="{
          error: validationStatus($v.subject) || errorMessage.subject,
        }"
        :error="
          (!$v.subject.required && $v.subject.$error
            ? 'Обязательное поле'
            : '') || errorMessage.subject
        "
      />
      <textArea
        placeholder="текст обращения"
        :field="message"
        :key="indexForm2"
        @input="message = $event"
        :class="{
          error: validationStatus($v.message) || errorMessage.message,
        }"
        :error="
          (!$v.message.required && $v.message.$error
            ? 'Обязательное поле'
            : '') || errorMessage.message
        "
      />
      <div class="feedback__checkbox_list">
        <checkBox
          :label="`Я даю согласие на&nbsp;обработку <br><a href='${publicPath}docs/terms-of-use.pdf' target='_blank' class='_undeline-link _bold'>персональных данных</a>`"
          :field="checkbox"
          :class="{
            error: validationStatus($v.checkbox) || this.errorMessage.checkbox,
          }"
          :error="this.errorMessage.checkbox"
          @input="checkbox = $event"
        />
      </div>
      <div class="feedback__footer">
        <button
          type="button"
          class="btn btn--primary w-100"
          @click="submit()"
          :class="{ loading: submitStatus == 'PENDING' }"
        >
          задать вопрос<img
            src="../../assets/img/spinner.svg"
            class="loader"
            alt=""
          />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import inputText from "@/components/form/inputText.vue";
import checkBox from "@/components/form/checkBox.vue";
import textArea from "@/components/form/textArea.vue";
import Select from "@/components/form/inputSelect.vue";

import { required, email, sameAs } from "vuelidate/lib/validators";
const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: "FeedbackForm",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      indexForm: 1,
      indexForm2: 1,
      ready: false,
      name: null,
      email: null,
      message: null,
      subject: null,
      checkbox: false,
      attach: "",
      errorMessage: {
        email: null,
        name: null,
        message: null,
        subject: null,
        checkBox: null,
      },

      submitStatus: null,

      chosenFileName: {},
    };
  },

  validations: {
    message: { required },
    email: { required, email },
    subject: { required },
    name: { required, rus },
    checkbox: {
      required,
      sameAs: sameAs(() => true),
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    message(newVal) {
      if (newVal === null) {
        this.indexForm2++;
      }
    },
  },
  methods: {
    submitMedia(e) {
      let t = this;

      this.chosenFileName = e;

      if (this.chosenFileName.length) {
        getBase64(this.chosenFileName[0]).then(function (data) {
          t.attach = data;
        });
      }
    },
    deleteFile() {
      this.chosenFileName = {};
      this.attach = "";
    },

    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        name: null,
        message: null,
        subject: null,
        checkBox: null,
      };
    },

    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    submit() {
      console.log("submit");
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("SendFeedback", {
            name: this.name,
            email: this.email,
            subject_id: this.subject,
            text: this.message,
            accept1: 1,
          })
          .then((r) => {
            console.log(r);
            if (!r.result) {
              this.submitStatus = null;

              this.captcha = null;
              let fieldsError;
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

              if (r.error && r.error.text) {
                [this.errorMessage.message] = r.error.text;
                fieldsError = true;
              }
              if (r.error && r.error.subject_id) {
                [this.errorMessage.subject] = r.error.subject_id;
                fieldsError = true;
              }
              if (r.error && r.error.accept1) {
                [this.errorMessage.checkBox] = r.error.accept1;
                fieldsError = true;
              }
            } else {
              this.indexForm++;
              this.indexForm2++;
              setTimeout(() => {
                this.$v.$reset();
                this.message = null;
              }, 0);
              this.submitStatus = null;
              this.$modal.show("common_success", {
                text: "Спасибо за обращение! Мы скоро Вам ответим!",
              });
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.user) {
        this.indexForm++;
        this.name = this.user.profile.name;
        this.email = this.user.profile.email;
      }
    }, 1000);
  },
  components: {
    inputText,
    textArea,
    checkBox,
    Select,
  },
};
</script>

<style lang="scss">
.feedback {
  width: 100%;
  .form-checkbox__caption {
    margin-left: rem(18px);
  }
  &__text {
    margin-bottom: rem(8px);
    font-size: rem(12px);
    text-transform: none;
  }
  &__checkbox_list {
    margin-bottom: rem(50px);
  }
  @media (min-width: $sm) {
    &__text {
      font-size: rem(16px);
    }
  }
  @media (min-width: $md) {
    &__text {
      font-size: rem(15px);
    }
  }
}
</style>
