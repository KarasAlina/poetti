<template>
  <form class="update-info">
    
    <inputText
      placeholder="ваше имя"
      :field="name"
      size="lg"
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
    <inputText
      placeholder="Фамилия"
      :field="surname"
      size="lg"
      @input="surname = $event"
      :class="{ error: validationStatus($v.surname) || errorMessage.surname }"
      :error="
        (!$v.surname.required && $v.name.$error
          ? 'Обязательное поле'
          : !$v.surname.rus && $v.surname.$error
          ? 'Введите текст на русском языке'
          : '') || errorMessage.surname
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
        :key="indexCity"
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

import { required } from "vuelidate/lib/validators";
const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

export default {
  name: "UpdateInfoForm",
  props: ["user"],
  data() {
    return {
      ready: false,
      index: 1,
      indexCity: 1,
      name: null,
      city: null,
      surname: null,
      dadataOptionsCity: {
        bounds: "city-city",
        type: "ADDRESS",
        geoLocation: false,
      },
      errorMessage: {
        name: null,
        city: null,
        surname: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    name: { required, rus },
    city: { required },
    surname: { required, rus }
  },
  methods: {
    errorReset() {
      console.log('34');
      this.$v.$reset();

      this.errorMessage = {
        name: null,
        city: null,
        surname: null,
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
            name: this.name,
            surname: this.surname,
            city: this.city,
          })
          .then((r) => {
            if (!r.result) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.error && r.error.name) {
                [this.errorMessage.name] = r.error.name;
                fieldsError = true;
              }
              if (r.error && r.error.surname) {
                [this.errorMessage.surname] = r.error.surname;
                fieldsError = true;
              }
              if (r.error && r.error.city) {
                [this.errorMessage.city] = r.error.city;
                fieldsError = true;
              }
              if (r.error && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.error,
                });
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("update_info");
              this.$modal.show("common_success", {
                text: "Данные успешно обновлены!",
              });
              setTimeout(() => {
                // document.location.reload();
              }, 1000);
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
  mounted() {
    document.getElementById('city').addEventListener('focus', (event) => {
      this.errorReset();
    });
    this.name = this.user.name;
    this.city = this.user.city;
    this.surname = this.user.surname;
  },
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
