<template>
  <label class="form-checkbox" :class="color ? `_${color}` : ''">
    <input
      type="checkbox"
      class="form-checkbox__input"
      @change="onInput()"
      v-model.trim="retValue"
    />
    <div class="form-checkbox__custom"></div>
    <div class="form-checkbox__caption" v-html="label"></div>
  </label>
</template>

<script>
export default {
  data() {
    return {
      retValue: this.field,
    };
  },

  methods: {
    errorReset() {
      this.$parent.errorReset();
    },

    onInput() {
      this.$emit("input", this.retValue);
    },
  },
  props: {
    field: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    color: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-checkbox {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  margin-bottom: rem(20px);
  &._center {
    align-items: center;
  }

  &__input {
    position: absolute;
    left: -9999px;
    opacity: 0;
    visibility: hidden;
  }

  &__input:checked + .form-checkbox__custom {
    background-color: $green;
    background-image: url("../../assets/images/icons/checked.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    ._white & {
      background-color: #fff;
    }
  }

  &__custom {
    min-width: rem(32px);
    width: rem(32px);
    height: rem(32px);
    background-size: rem(20px);
    border: 1px solid $yellow;
    background: $green;
    border-radius: rem(30px);
    background-repeat: no-repeat;
    background-position: center;
    ._white & {
      background: #fff;
    }
    // transition: all 0.3s ease-in-out;
  }

  &__caption {
    margin-left: rem(18px);
    font-size: rem(14px);
    line-height: normal;
    text-transform: none;
    color: $yellow;
    ._white & {
      font-size: rem(14px);
    }
    a {
      color: $yellow;
      font-family: $bold;
      border-bottom: 1px solid $yellow;
    }
  }
}

.error .form-checkbox__custom {
  background: #ff9999;
}
</style>
