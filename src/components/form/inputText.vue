<template>
  <label
    class="form__field"
    :class="
      color === 'white'
        ? 'form__field--white'
        : '' || color === 'green'
        ? 'form__field--green'
        : ''
    "
  >
    <div class="form__caption" v-if="label">{{ label }}</div>
    <input
      v-if="maskValue != ''"
      :disabled="isDisabled"
      :type="type"
      :value="value"
      :id="fieldId"
      :maxlength="maxlength"
      :placeholder="placeholder"
      class="form__field-input"
      :class="size ? 'form__field-input--' + size : ''"
      v-model.trim="retValue"
      v-mask="maskValue"
      :name="name"
      @focus="errorReset()"
      @input="onInput()"
      @blur="onBlur()"
    />
    <input
      v-else
      :disabled="isDisabled"
      :type="type"
      :id="fieldId"
      :value="value"
      :maxlength="maxlength"
      :placeholder="placeholder"
      class="form__field-input"
      :class="size ? 'form__field-input--' + size : ''"
      v-model.trim="retValue"
      :name="name"
      @focus="errorReset()"
      @input="onInput()"
      @blur="onBlur()"
    />
    <div class="error-hint" v-if="error">{{ error }}</div>
  </label>
</template>
<script>
export default {
  data() {
    return {
      retValue: this.field,
      maskValue: this.mask || "",
      nameValue: this.name || "",
    };
  },

  methods: {
    errorReset() {
      this.$parent.errorReset();
    },

    onInput() {
      this.$emit("input", this.retValue);
    },

    onBlur() {
      this.$emit("input", this.retValue);
    },
  },
  props: {
    field: String,
    fieldId: String,
    mask: String,
    name: String,
    maxlength: {
      type: [String, Number],
    },
    label: {
      type: String,
    },
    error: {
      type: [String, Boolean],
    },
    value: [String, Number],
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: () => {
        return "text";
      },
    },
    isDisabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    size: {
      type: String,
      default: () => {
        return "sm";
      },
    },
    color: {
      type: String,
      default: () => {
        return "white";
      },
    },
  },

  components: {},
};
</script>
<style lang="scss">
.form__field--white {
  width: 100%;
  margin-bottom: rem(14px) !important;
}

.form__field-input,
.dadata-input.form__field-input {
  width: 100%;
  height: rem(70px);
  padding: 0 rem(23px) 0;
  max-width: 100%;
  appearance: none;
  font-size: rem(14px);
  background: $green;
  border: 1px solid $yellow;
  border-radius: rem(0px);
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  color: $yellow;
  ._centered-text & {
    text-align: center;
  }
  &::placeholder {
    color: $yellow;
  }
  &:focus {
    outline: none;
  }
  &--lg {
    height: rem(70px);
    padding: 0 rem(20px);
    font-weight: 400;
    font-size: rem(14px);
    text-transform: uppercase;
    &::placeholder {
      font-weight: 400;
      font-size: rem(14px);
    }
  }
}
</style>
