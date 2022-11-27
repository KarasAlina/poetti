<template>
  <div class="form-select">
    <div class="form__caption" v-if="labelText">{{ labelText }}</div>
    <v-select
      :searchable="false"
      :options="options"
      v-model.trim="retValue"
      :name="name"
      @focus="errorReset()"
      @change="onInput()"
      @input="onInput()"
      :class="className"
    >
      <span slot="no-options">Ничего не найдено</span>
    </v-select>

    <div class="error-hint" v-if="error">{{ error }}</div>
  </div>
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
  props: [
    "options",
    "field",
    "name",
    "error",
    "labelText",
    "className",
    "reduceVale",
  ],
};
</script>

<style lang="scss">
$height: rem(70px);
$color: $yellow;
$font_size: rem(14px);
$background: $green;
$border: $yellow;
$radius: rem(0px);

.form-select {
  position: relative;
  max-width: 100%;
  margin: 0 auto rem(14px);
  z-index: 10;
  .v-select {
    height: $height;
    z-index: 1;
    &._bordered {
      .vs__open-indicator {
        width: rem(20px);
        height: rem(12px);
        background-image: url("../../assets/images/select_arrow.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }
      .vs__selected {
        position: relative;
        color: #fff;
        padding: 2px 5px 0 0;
      }
      .vs__dropdown-toggle {
        border: 2px solid #912982;
      }
      .vs__dropdown-menu {
        width: 100%;
        min-width: auto;
      }
    }
  }
  &._rounded {
    .v-select {
      .vs__dropdown-toggle,
      .vs__dropdown-menu {
        border-radius: rem(30px);
      }
    }
  }
  &.error {
    .v-select {
      .vs__dropdown-toggle {
        border-color: #ec2a86 !important;
      }
    }
  }
  .vs__dropdown-toggle {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 1;
    height: 100%;
    max-width: 100%;
    z-index: 1001;
    background: $background;
    border-radius: $radius;
    border: 1px solid $border;
    padding: 0px rem(14px) 0 rem(23px);
  }

  .vs__selected-options {
    padding: 0;
    max-width: 90%;
  }

  .vs__search {
    padding: 0;
    margin: 0;
    border: 0;
    height: 0;
    color: #1a1511;
    font-size: 13px;

    &:focus {
      border: 0;
      padding: 0;
      margin: 0;
      font-size: 13px;
    }
  }

  .vs__actions {
    margin-left: auto;
    padding: 0px 0px 0 3px;
  }

  .vs__clear {
    display: none;
  }

  .vs__open-indicator {
    width: rem(30px);
    height: rem(30px);
    background: url("../../assets/images/icons/select-arrow.svg") no-repeat
      center;
    path {
      display: none;
    }
  }

  .vs__selected {
    width: 100%;
    display: block;
    bottom: 0;
    padding: 0;
    margin: 0;
    color: $color;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    font-size: $font_size;
    text-transform: uppercase;
    font-weight: 700;
  }

  .vs--single.vs--open .vs__selected {
    position: relative;
    opacity: 1;
  }

  .vs__dropdown-menu {
    border: 0;
    margin-top: -$height;
    padding-top: $height;
    background: $background;
    box-shadow: 0px 4px 4px rgba(99, 89, 66, 0.25);
    border-radius: $radius;
  }

  .vs__dropdown-option {
    max-width: 100%;
    white-space: normal;
    color: $color;
    font-size: $font_size;
    text-transform: uppercase;
    text-align: center;
    padding: rem(7px) rem(25px) rem(6px);
  }

  .vs__dropdown-option--highlight {
    color: #fff;
    background: $green;
  }
}
</style>
