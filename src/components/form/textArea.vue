<template>
  <label class="form-textarea">
    <div class="form-textarea__caption" v-if="label">{{ label }}</div>
    <textarea
      class="form-textarea__field"
      :placeholder="placeholder"
      v-model.trim="retValue"
      :name="name"
      @focus="errorReset()"
      @input="onInput()"
      @blur="onBlur()"
    ></textarea>

    <div class="error-hint" v-if="error">{{ error }}</div>
  </label>
</template>
<script>
export default {
  data() {
    return {
      retValue: this.field,
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
    name: String,
    label: {
      type: String,
    },
    error: {
      type: String,
    },
    value: [String, Number],
    placeholder: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
$color: $green_dark;
.form-textarea {
  position: relative;
  display: block;
  max-width: 100%;
  margin: 0 auto rem(20px);

  &__field {
    resize: none;
    min-height: rem(210px);
    width: 100%;
    padding: rem(17px) rem(23px) 0;
    max-width: 100%;
    appearance: none;
    font-size: rem(14px);
    background: $green;
    border: 1px solid $yellow;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: rem(0px);
    transition: all 0.3s ease-in-out;
    color: $yellow;
    &::placeholder {
      font-size: rem(14px);
      color: $yellow;
    }
  }
  &__field:focus {
    border-color: $green_light;
    outline: none;
  }
  &__caption {
    margin-bottom: rem(4px);
    font-size: rem(15px);
    line-height: rem(18px);
  }
}
</style>
